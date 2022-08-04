import React, { useCallback, useEffect, useRef, useState } from "react"
import { useParams } from "umi"
import { Select, Pagination, Row, Col, Button, Space, Card, Tag, Modal } from "antd"

import t from "@/utils/t"
import { evaluationTags } from '@/constants/dataset'
import useFetch from '@/hooks/useFetch'
import { randomBetween, percent } from '@/utils/number'

import Breadcrumbs from "@/components/common/breadcrumb"
import Asset from "./components/asset"
import styles from "./assets.less"
import GtSelector from "@/components/form/gtSelector"
import ImageAnnotation from "@/components/dataset/imageAnnotation"
import useWindowResize from "@/hooks/useWindowResize"

const { Option } = Select

const Dataset = () => {
  const { did: id } = useParams()
  const initQuery = {
    id,
    keyword: null,
    offset: 0,
    limit: 20,
  }
  const [filterParams, setFilterParams] = useState(initQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const [assetVisible, setAssetVisible] = useState(false)
  const [currentAsset, setCurrentAsset] = useState({
    hash: null,
    index: 0,
  })
  const [evaluated, setEvaluated] = useState(false)
  const initEvaluation = Object.keys(evaluationTags).reduce((prev, tag) => ({ ...prev, [tag]: true }), {})
  const [evaluation, setEvaluation] = useState(initEvaluation)
  const listRef = useRef(null)
  const windowWidth = useWindowResize()
  const [dataset, getDataset] = useFetch('dataset/getDataset', {})
  const [{ items: assets, total }, getAssets, setAssets] = useFetch('dataset/getAssetsOfDataset', { items: [], total: 0 })

  useEffect(() => {
    getDataset({ id })
  }, [id])

  useEffect(() => {
    const evaluated = assets.some(asset => asset.evaluated)
    setEvaluated(evaluated)
  }, [assets])

  useEffect(() => {
    setCurrentPage((filterParams.offset / filterParams.limit) + 1)
    dataset.id && filter(filterParams)
  }, [dataset, filterParams])

  const filterKw = (kw) => {
    const keyword = kw ? kw : undefined
    setFilterParams((params) => ({
      ...params,
      keyword,
      offset: initQuery.offset,
    }))
  }
  const filterPage = (page, pageSize) => {
    setCurrentPage(page)
    const limit = pageSize
    const offset = limit * (page - 1)
    setFilterParams((params) => ({ ...params, offset, limit }))
  }
  const filter = (param) => {
    setAssets({ items: [], total: 0 })
    getAssets({ ...param, datasetKeywords: dataset?.keywords })
  }
  const goAsset = (asset, hash, index) => {
    setCurrentAsset({ asset, hash, index: filterParams.offset + index })
    setAssetVisible(true)
  }

  const randomPage = () => {
    const { limit, offset } = filterParams
    setCurrentPage(offset / limit + 1)
    const page = randomBetween(Math.ceil(total / limit), 1, currentPage)
    filterPage(page, limit)
  }

  const getRate = (count) => {
    return percent(count / dataset.assetCount)
  }

  const filterAnnotations = annotations => {
    return annotations.filter(annotation => !annotation.cm || evaluation[annotation.cm])
  }

  const randomPageButton = (
    <Button type="primary" onClick={randomPage}>
      {t("dataset.detail.randompage.label")}
    </Button>
  )

  const renderList = useCallback((list, row = 5) => {
    let r = 0, result = []
    while (r < list.length) {
      result.push(list.slice(r, r + row))
      r += row
    }

    return result.map((rows, index) => {
      const h = listRef.current?.clientWidth / rows.reduce((prev, row) => {
        return (prev + row.metadata.width / row.metadata.height)
      }, 0)

      return (
        <Row gutter={4} wrap={false} key={index} className={styles.dataset_container}>
          {rows.map((asset, rowIndex) => (
            <Col style={{ height: h }} key={asset.hash} className={styles.dataset_item}>
              <div
                className={styles.dataset_img}
                onClick={() => goAsset(asset, asset.hash, index * row + rowIndex)}
              >
                <ImageAnnotation url={asset.url} data={asset.annotations} filters={filterAnnotations} />
                <span
                  className={styles.item_keywords_count}
                  title={asset?.keywords.join(",")}
                >
                  {t("dataset.detail.assets.keywords.total", {
                    total: asset?.keywords?.length,
                  })}
                </span>
                <span className={styles.item_keywords}>
                  {asset.keywords.slice(0, 4).map(key => <Tag className={styles.item_keyword} key={key} title={key}>{key}</Tag>)}
                  {asset.keywords.length > 4 ? <Tag className={styles.item_keyword} style={{ width: '10px' }}>...</Tag> : null}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      )
    }
    )
  }, [windowWidth, evaluation])

  const renderTitle = <Row className={styles.labels}>
    <Col flex={1}>
      <Space>
        <strong>{dataset.name} {dataset.versionName}</strong>
        <span>{t("dataset.detail.pager.total", { total: total + '/' + dataset.assetCount })}</span>
      </Space>
    </Col>
    {evaluated ? <Col>
      <GtSelector layout='inline' onChange={setEvaluation} />
    </Col> : null}
    <Col>
      <span>{t("dataset.detail.keyword.label")}</span>
      <Select
        showSearch
        defaultValue={0}
        style={{ width: 160 }}
        onChange={filterKw}
        filterOption={(input, option) => option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value={0} key="all">
          {t("common.all")}
        </Option>

        {dataset?.keywords?.map((key) => (
          <Option value={key} key={key} title={`${key} (${dataset.keywordsCount[key]})`}>
            {key} ({dataset.keywordsCount[key]}, {getRate(dataset.keywordsCount[key])})
          </Option>
        ))}
      </Select>
    </Col>
  </Row>

  const assetDetail = <Modal className={styles.assetDetail} destroyOnClose
    title={t('dataset.asset.title')} visible={assetVisible} onCancel={() => setAssetVisible(false)}
    width={null} footer={null}>
    <Asset id={id} asset={currentAsset.asset} datasetKeywords={dataset.keywords} filterKeyword={assetVisible ? filterParams.keyword : null} index={currentAsset.index} total={total} />
  </Modal>

  return (
    <div className={styles.datasetDetail}>
      <Breadcrumbs />
      {assetDetail}
      <Card className='list' title={renderTitle}>
        <div className={styles.listContainer} ref={listRef}>
          {renderList(assets)}
        </div>
        <Space className={styles.pagi}>
          <Pagination
            key={'pager'}
            className={`pager ${styles.pager}`}
            showQuickJumper
            showSizeChanger
            defaultCurrent={1}
            current={currentPage}
            defaultPageSize={20}
            total={total}
            showTotal={(total, range) =>
              t("dataset.detail.pager.total", { total })
            }
            onChange={filterPage}
          />
          {randomPageButton}
        </Space>
      </Card>
    </div>
  )
}

export default Dataset
