import enum
import json
from datetime import datetime
from typing import Any, Dict, List, Optional, Union

from pydantic import BaseModel, EmailStr, Field, validator

from app.constants.state import TaskState, TaskType, ResultType
from app.schemas.common import (
    Common,
    DateTimeModelMixin,
    IdModelMixin,
    IsDeletedModelMixin,
)


class MergeStrategy(enum.IntEnum):
    stop_upon_conflict = 1
    prefer_newest = 2
    prefer_oldest = 3


class TaskBase(BaseModel):
    name: str
    type: TaskType
    project_id: int


# all the parameter will be packed into Task.parmeters
class TaskParameter(BaseModel):
    dataset_id: int
    keywords: Optional[List[str]]

    # label
    extra_url: Optional[str]
    labellers: Optional[List[EmailStr]]
    keep_annotations: Optional[bool]

    # training
    network: Optional[str]
    backbone: Optional[str]
    hyperparameter: Optional[str]

    # mining
    model_id: Optional[int]
    mining_algorithm: Optional[str]
    top_k: Optional[int]
    generate_annotations: Optional[bool]

    # training & mining & infer
    docker_image: Optional[str]
    # todo replace docker_image with docker_image_id
    docker_image_id: Optional[int]


class TaskCreate(TaskBase):
    dest_group_id: Optional[int] = Field(
        None, description="dataset group id or model group id to put task result"
    )
    parameters: Optional[TaskParameter] = Field(description="task specific parameters")
    config: Optional[Union[str, Dict]] = Field(
        description="docker runtime configuration"
    )

    @validator("config")
    def dumps_config(
        cls, v: Optional[Union[str, Dict]], values: Dict[str, Any]
    ) -> Optional[str]:
        # we don't care what's inside of config
        # just dumps it as string and save to db
        if isinstance(v, dict):
            return json.dumps(v)
        else:
            return v


class TaskUpdate(BaseModel):
    name: str


class TaskInDBBase(IdModelMixin, DateTimeModelMixin, IsDeletedModelMixin, TaskBase):
    hash: str
    state: Optional[TaskState] = TaskState.pending
    error_code: Optional[str]
    duration: Optional[int] = Field(0, description="task process time in seconds")
    percent: Optional[float] = Field(0, description="from 0 to 1")
    parameters: Optional[str] = Field(
        description="json dumped input parameters when creating task"
    )
    config: Optional[str] = Field(
        description="json dumped docker runtime configuration"
    )
    user_id: int = Field(description="task owner's user_id")

    last_message_datetime: datetime = None  # type: ignore

    @validator("last_message_datetime", pre=True)
    def default_datetime(
        cls,
        value: datetime,  # noqa: N805, WPS110
    ) -> datetime:
        return value or datetime.now()

    @validator("error_code")
    def remove_zero_error_code(cls, value: Optional[str]) -> Optional[str]:
        if value == "0":
            return None
        else:
            return value

    class Config:
        orm_mode = True


class TaskInternal(TaskInDBBase):
    parameters: Optional[str]
    config: Optional[str]
    state: TaskState
    result_type: Optional[ResultType] = None

    @validator("parameters")
    def loads_parameters(cls, v: str) -> Dict[str, Any]:
        if not v:
            return {}
        return json.loads(v)

    @validator("config")
    def loads_config(cls, v: str) -> Dict[str, Any]:
        if not v:
            return {}
        return json.loads(v)

    @validator("result_type", pre=True)
    def gen_result_type(cls, v: Any, values: Any) -> Optional[ResultType]:
        task_type = values["type"]
        if task_type in [TaskType.training]:
            return ResultType.model
        elif task_type in [TaskType.mining, TaskType.label, TaskType.filter]:
            return ResultType.dataset
        else:
            return None


class Task(TaskInternal):
    @validator("state")
    def merge_state(cls, v: TaskState) -> TaskState:
        """
        Frontend doesn't differentiate premature and terminated
        """
        if v is TaskState.premature:
            v = TaskState.terminate
        return v


class TaskTerminate(BaseModel):
    fetch_result: bool = True


class TaskUpdateStatus(BaseModel):
    hash: str
    timestamp: float
    percent: Optional[float] = 0
    state: TaskState
    state_code: Optional[str]
    state_message: Optional[str]


class TaskOut(Common):
    result: Task


class TaskPagination(BaseModel):
    total: int
    items: List[Task]


class TaskPaginationOut(Common):
    result: TaskPagination


class CreateDatasetType(enum.IntEnum):
    continued_dataset_group = 0
    new_dataset_group = 1


class TrainDataSet(BaseModel):
    training_dataset_name: str
    training_dataset_group: int
    training_dataset_version: int


class MergeDataSet(BaseModel):
    include_datasets: List[str]
    include_strategy: Optional[MergeStrategy] = Field(
        MergeStrategy.prefer_newest, description="strategy to merge multiple datasets"
    )
    exclude_datasets: List[str]


class FiterLabel(BaseModel):
    include_labels: List[str]
    exclude_labels: List[str]


class DatasetsFusionParameter(BaseModel):
    dataset_type: CreateDatasetType
    training_dataset_group_name: Optional[str]
    training_dataset_version: int
    training_dataset_name: str

    merge_dataset: Optional[MergeDataSet]
    fiter_label: Optional[FiterLabel]
    sampling_count: Optional[int]
