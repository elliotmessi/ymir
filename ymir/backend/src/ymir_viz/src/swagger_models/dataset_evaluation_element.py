# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from src.swagger_models.base_model_ import Model
from src.swagger_models.dataset_evaluation_element_tuple3f import DatasetEvaluationElementTuple3f  # noqa: F401,E501
from src import util


class DatasetEvaluationElement(Model):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    def __init__(self, ap: float=None, ar: float=None, tp: int=None, fp: int=None, fn: int=None, pr_curve: List[DatasetEvaluationElementTuple3f]=None):  # noqa: E501
        """DatasetEvaluationElement - a model defined in Swagger

        :param ap: The ap of this DatasetEvaluationElement.  # noqa: E501
        :type ap: float
        :param ar: The ar of this DatasetEvaluationElement.  # noqa: E501
        :type ar: float
        :param tp: The tp of this DatasetEvaluationElement.  # noqa: E501
        :type tp: int
        :param fp: The fp of this DatasetEvaluationElement.  # noqa: E501
        :type fp: int
        :param fn: The fn of this DatasetEvaluationElement.  # noqa: E501
        :type fn: int
        :param pr_curve: The pr_curve of this DatasetEvaluationElement.  # noqa: E501
        :type pr_curve: List[DatasetEvaluationElementTuple3f]
        """
        self.swagger_types = {
            'ap': float,
            'ar': float,
            'tp': int,
            'fp': int,
            'fn': int,
            'pr_curve': List[DatasetEvaluationElementTuple3f]
        }

        self.attribute_map = {
            'ap': 'ap',
            'ar': 'ar',
            'tp': 'tp',
            'fp': 'fp',
            'fn': 'fn',
            'pr_curve': 'pr_curve'
        }
        self._ap = ap
        self._ar = ar
        self._tp = tp
        self._fp = fp
        self._fn = fn
        self._pr_curve = pr_curve

    @classmethod
    def from_dict(cls, dikt) -> 'DatasetEvaluationElement':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The DatasetEvaluationElement of this DatasetEvaluationElement.  # noqa: E501
        :rtype: DatasetEvaluationElement
        """
        return util.deserialize_model(dikt, cls)

    @property
    def ap(self) -> float:
        """Gets the ap of this DatasetEvaluationElement.


        :return: The ap of this DatasetEvaluationElement.
        :rtype: float
        """
        return self._ap

    @ap.setter
    def ap(self, ap: float):
        """Sets the ap of this DatasetEvaluationElement.


        :param ap: The ap of this DatasetEvaluationElement.
        :type ap: float
        """

        self._ap = ap

    @property
    def ar(self) -> float:
        """Gets the ar of this DatasetEvaluationElement.


        :return: The ar of this DatasetEvaluationElement.
        :rtype: float
        """
        return self._ar

    @ar.setter
    def ar(self, ar: float):
        """Sets the ar of this DatasetEvaluationElement.


        :param ar: The ar of this DatasetEvaluationElement.
        :type ar: float
        """

        self._ar = ar

    @property
    def tp(self) -> int:
        """Gets the tp of this DatasetEvaluationElement.


        :return: The tp of this DatasetEvaluationElement.
        :rtype: int
        """
        return self._tp

    @tp.setter
    def tp(self, tp: int):
        """Sets the tp of this DatasetEvaluationElement.


        :param tp: The tp of this DatasetEvaluationElement.
        :type tp: int
        """

        self._tp = tp

    @property
    def fp(self) -> int:
        """Gets the fp of this DatasetEvaluationElement.


        :return: The fp of this DatasetEvaluationElement.
        :rtype: int
        """
        return self._fp

    @fp.setter
    def fp(self, fp: int):
        """Sets the fp of this DatasetEvaluationElement.


        :param fp: The fp of this DatasetEvaluationElement.
        :type fp: int
        """

        self._fp = fp

    @property
    def fn(self) -> int:
        """Gets the fn of this DatasetEvaluationElement.


        :return: The fn of this DatasetEvaluationElement.
        :rtype: int
        """
        return self._fn

    @fn.setter
    def fn(self, fn: int):
        """Sets the fn of this DatasetEvaluationElement.


        :param fn: The fn of this DatasetEvaluationElement.
        :type fn: int
        """

        self._fn = fn

    @property
    def pr_curve(self) -> List[DatasetEvaluationElementTuple3f]:
        """Gets the pr_curve of this DatasetEvaluationElement.


        :return: The pr_curve of this DatasetEvaluationElement.
        :rtype: List[DatasetEvaluationElementTuple3f]
        """
        return self._pr_curve

    @pr_curve.setter
    def pr_curve(self, pr_curve: List[DatasetEvaluationElementTuple3f]):
        """Sets the pr_curve of this DatasetEvaluationElement.


        :param pr_curve: The pr_curve of this DatasetEvaluationElement.
        :type pr_curve: List[DatasetEvaluationElementTuple3f]
        """

        self._pr_curve = pr_curve
