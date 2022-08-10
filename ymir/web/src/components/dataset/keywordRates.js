import { useState, useEffect } from "react"
import t from "@/utils/t"

import s from "./keywordRates.less"
import { percent } from "@/utils/number"
import useFetch from '@/hooks/useFetch'

function randomColor() {
  return "#" + Math.random().toString(16).slice(-6)
}

const initList = { gt: [], pred: [] }

const getWidth = ({ count = 0, max }, progressWidth) => percent(count * progressWidth / max)

function KeywordRates({ keywords, dataset, progressWidth = 0.5 }) {
  const [list, setList] = useState(initList)
  const [stats, getNegativeKeywords, setStats] = useFetch('dataset/getNegativeKeywords', {})
  const [colors, setColors] = useState({})

  useEffect(() => {
    console.log('dataset, keywords:', dataset, keywords)
    if (dataset?.id && keywords?.length) {
      getNegativeKeywords({ projectId: dataset.projectId, keywords, dataset: dataset.id })
    } else if (dataset?.id) {
      cacheToStats(dataset)
    }
  }, [dataset, keywords])

  useEffect(() => {
    const kws = keywords.length ? keywords : dataset?.keywords
    const keywordColors = (kws || []).reduce((prev, keyword) => (colors[keyword] ? prev : {
      ...prev,
      [keyword]: randomColor(),
    }), {
      0: 'gray'
    })
    setColors({ ...colors, ...keywordColors })
  }, [keywords, dataset])

  useEffect(() => {
    if (stats.gt) {
      const list = generateList(stats, dataset?.assetCount, colors)
      setList(list)
    } else {
      setList(initList)
    }
  }, [stats, dataset, colors])

  function generateList(stats, total = 0, colors) {
    return {
      gt: transfer(stats.gt, total, colors),
      pred: transfer(stats.pred, total, colors),
    }
  }

  function transfer({ keywords: kc = {}, negative = 0 }, total = 0, colors) {
    const klist = [
      ...(Object.keys(kc).map(kw => ({
        key: kw,
        label: kw,
        count: kc[kw],
      }))),
      {
        key: 0,
        label: t('dataset.samples.negative'),
        count: negative,
      }
    ]
    const max = Math.max(...(klist.map(item => item.count || 0)), progressWidth)
    return klist.map(item => ({
      ...item,
      total,
      max,
      color: colors[item.key],
    }))
  }

  function label({ count = 0, label = '', total }) {
    return `${label} ${count}/${total} ${percent(count / total)}`
  }

  function cacheToStats(dataset = {}) {
    const { keywordsCount, nagetiveCount, } = dataset
    const { gt, pred } = keywordsCount
    const cacheStats = {
      gt: {
        keywords: gt,
        negative: nagetiveCount.gt,
      },
      pred: {
        keywords: pred,
        negative: nagetiveCount.pred,
      }
    }
    setStats(cacheStats)
  }

  const renderList = (list, title = 'Ground Truth') => <div className={s.rates}>
    <div className={s.title}>{title}</div>
    {list.map(item => (
      <div key={item.key} className={s.rate}>
        <span className={s.bar} style={{ width: getWidth(item, progressWidth), background: item.color }}>&nbsp;</span>
        <span>{label(item)}</span>
      </div>
    ))}
  </div>

  return (
    <div className={s.rates}>
      {renderList(list.gt)}
      {!keywords.length ? renderList(list.pred, 'Prediction') : null}
    </div>
  )
}

export default KeywordRates
