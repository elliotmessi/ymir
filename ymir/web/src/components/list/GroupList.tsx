import { FC, useEffect, useState } from 'react'
import { Col, Pagination, Row, Space, Table } from 'antd'
import t from '@/utils/t'
import styles from './groupList.less'
import { EditIcon, ArrowDownIcon, ArrowRightIcon } from '@/components/common/Icons'
import GroupActions from './GroupActions'

type Group = YModels.Group & {
  projectLabel?: string
}
type Props = {
  list: YStates.List<YModels.Group>
  initVisible?: boolean
  project?: YModels.Project
}

const GroupList: FC<Props> = ({ project, initVisible, children }) => {
  const [visible, setVisible] = useState(initVisible)
  const [groups, setGroups] = useState<Group[]>([])
  const [total, setTotal] = useState(1)

  useEffect(() => {
    let groups = list.items
    if (list) {

    }
    if (project) {
      // add extra project info
    }
  }, [project, list])

  useEffect(() => {
    setTotal(list.total)
  }, [list])

  const freshGroup = (group: Group) => {
    const index = groups.findIndex(({ id }) => id === group.id)
    setGroups(groups.splice(index, 1, group))
  }


  return (
    <>
      <div className="groupList">
        {groups.map((group) => (
          <div className={styles.groupItem} key={group.id}>
            <Row className="groupTitle">
              <Col flex={1} onClick={() => setVisible(v => !v)}>
                <span className="foldBtn">{visible ? <ArrowDownIcon /> : <ArrowRightIcon />} </span>
                <span className="groupName">{group.name}</span>
                {group.projectLabel ? <span className={styles.extraTag}>{group.projectLabel}</span> : null}
              </Col>
              <Col>
                <GroupActions group={group} fresh={(newGroup) => freshGroup(newGroup)} />
              </Col>
            </Row>
            <div className="groupTable" hidden={!visible}>
              <Items gid={group.id} />
            </div>
          </div>
        ))}
      </div>
      <Pagination
        className={`pager ${styles.pager}`}
        showQuickJumper
        showSizeChanger
        total={total}
        current={query.current}
        pageSize={query.limit}
        onChange={listChange}
      />
    </>
  )
}

export default GroupList
