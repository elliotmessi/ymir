import React, { useEffect, useRef } from 'react'
import { Descriptions, Space, Card, Button, Row, Col } from 'antd'
import { useParams, Link, useHistory, useSelector } from 'umi'

import t from '@/utils/t'
import { TYPES, STATES, getImageTypeLabel, isSampleImage } from '@/constants/image'
import { getProjectTypeLabel } from '@/constants/project'
import { ROLES } from '@/constants/user'
import useFetch from '@/hooks/useFetch'

import Breadcrumbs from '@/components/common/breadcrumb'
import LinkModal from './components/relate'
import Del from './components/del'
import ImagesLink from './components/imagesLink'
import StateTag from '@/components/image/StateTag'
import Configs from './components/Configs'
import OfficialTag from '@/components/image/OfficialTag'

import styles from './detail.less'
import { EditIcon, PublishIcon, DeleteIcon, LinkIcon } from '@/components/common/Icons'

const { Item } = Descriptions

function ImageDetail() {
  const { id } = useParams()
  const history = useHistory()
  const linkModalRef = useRef(null)
  const delRef = useRef(null)
  const image = useSelector(({ image }) => image.image[id] || {})
  const [_, getImage] = useFetch('image/getImage', { id })
  const role = useSelector(({ user }) => user.role)

  useEffect(() => id && getImage({ id }), [id])
  function relateImage() {
    const { name, related } = image
    linkModalRef.current.show({ id, name, related })
  }
  const publish = ({ name = '', url = '', description = '' }) =>
    history.push(`/home/public_image/publish?name=${name}&image_addr=${url}&description=${description}`)

  const del = () => {
    delRef.current.del(id, image.name)
  }

  const delOk = () => {
    history.push('/home/image')
  }

  function isAdmin() {
    return role > ROLES.USER
  }

  function isTrain(type) {
    return type === TYPES.TRAINING
  }

  function isDone() {
    return image.state === STATES.VALID
  }

  function isError() {
    return image.state === STATES.INVALID
  }

  function renderTitle() {
    return (
      <Row>
        <Col flex={1}>
          <span>{image.name} </span>
          <OfficialTag official={image.official} />
          {isAdmin() ? (
            <Link to={`/home/image/add/${id}`}>
              <EditIcon />
            </Link>
          ) : null}
        </Col>
        <Col>
          <Button type="link" onClick={() => history.goBack()}>
            {t('common.back')}&gt;
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <div className={styles.imageDetail}>
      <Breadcrumbs />
      <Card title={renderTitle()}>
        <div className="infoTable">
          <Descriptions bordered column={2} labelStyle={{ width: '200px' }} title={t('image.detail.title')}>
            <Item label={t('image.detail.label.name')}>{image.name}</Item>
            <Item label={t('common.object.type')}>{image?.objectTypes?.map((type) => t(getProjectTypeLabel(type, true))).join(',')}</Item>
            <Item label={t('image.detail.label.type')}>
              {getImageTypeLabel(image.functions)
                .map((label) => t(label))
                .join(',')}
            </Item>
            <Item label={t('image.detail.label.url')}>{image.url}</Item>
            <Item label={t('image.detail.label.related')} span={2}>
              <Row>
                <Col flex={1}>
                  <ImagesLink images={image.related} />
                </Col>
                {isAdmin() && isDone() ? (
                  <Col>
                    <Button type="primary" onClick={() => relateImage()} icon={<LinkIcon />}>
                      {t('image.detail.relate')}
                    </Button>
                  </Col>
                ) : null}
              </Row>
            </Item>
            <Item label={t('image.list.item.desc')} span={2}>
              {image.description}
            </Item>
            <Item label={t('image.detail.label.config')} span={2}>
              <Configs configs={image.configs} />
            </Item>
            <Item label={t('image.detail.label.state')} span={2}>
              <StateTag label={true} state={image.state} code={image.errorCode} />
            </Item>

            <Item label={''} span={2}>
              <Space>
                <Button hidden={!isAdmin() || !isDone()} onClick={() => publish(image)} icon={<PublishIcon />}>
                  {t('image.action.publish')}
                </Button>
                <Button hidden={!isAdmin() || isSampleImage(image)} onClick={del} icon={<DeleteIcon />}>
                  {t('common.del')}
                </Button>
              </Space>
            </Item>
          </Descriptions>
        </div>
      </Card>
      <LinkModal ref={linkModalRef} />
      <Del ref={delRef} ok={delOk} />
    </div>
  )
}

export default ImageDetail
