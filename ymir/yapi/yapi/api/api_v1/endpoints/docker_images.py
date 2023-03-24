from typing import Any

from fastapi import APIRouter, Depends, Query, Path
from fastapi.logger import logger

from yapi import schemas
from yapi.api import deps
from yapi.config import settings
from yapi.constants.state import DockerImageState, DockerImageType
from yapi.utils.ymir_app import AppClient
from yapi.utils.data import exclude_nones

router = APIRouter()


@router.get("/", response_model=schemas.docker_image.DockerImagePaginationOut)
def list_docker_images(
    app: AppClient = Depends(deps.get_app_client),
    current_user: schemas.user.UserInfo = Depends(deps.get_current_active_user),
    name: str = Query(None),
    docker_url: str = Query(None, alias="url"),
    state: DockerImageState = Query(None),
    type_: DockerImageType = Query(None, alias="type"),
) -> Any:
    url = f"{settings.APP_URL_PREFIX}/images"
    params = {"name": name, "url": docker_url, "state": state, "type": type_}
    resp = app.get(url, params=exclude_nones(params))
    docker_images = resp.json()
    logger.info("url: %s, params: %s, resp: %s", url, params, docker_images)
    return docker_images


@router.get("/{docker_image_id}", response_model=schemas.docker_image.DockerImageOut)
def get_docker_image(
    app: AppClient = Depends(deps.get_app_client),
    current_user: schemas.user.UserInfo = Depends(deps.get_current_active_user),
    docker_image_id: int = Path(...),
) -> Any:
    url = f"{settings.APP_URL_PREFIX}/images/{docker_image_id}"
    logger.info("url: %s, params: %s", url, None)
    resp = app.get(url)
    docker_images = resp.json()
    return docker_images
