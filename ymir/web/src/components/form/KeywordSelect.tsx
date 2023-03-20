import { Col, Row, Select, SelectProps } from 'antd'
import { FC, useEffect, useState } from 'react'

import t from '@/utils/t'
import useFetch from '@/hooks/useFetch'
import { DefaultOptionType } from 'antd/lib/select'
import useRequest from '@/hooks/useRequest'

type KeywordType = {
  name: string
  aliases?: string
}
type OptionType = {
  label: string
aliases?: string[]
value: string
}
type Props = SelectProps & {
  keywords?: string[]
  filter?: (kws: string[]) => string[]
}

const KeywordSelect: FC<Props> = ({ value, onChange = () => { }, keywords, filter = x => x, ...resProps }) => {
  const [options, setOptions] = useState<OptionType[]>([])
  const { data: keywordResult, run: getKeywords} = useRequest<string[], [{ limit?: number }]>('keyword/getKeywords')

  useEffect(() => {
    if (keywords) {
      generateOptions(keywords.map(keyword => ({ name: keyword })))
    } else {
      getKeywords({ limit: 9999 })
    }
  }, [keywords])

  useEffect(() => {
    if (options.length) {
      if (value) {
        onChange(value, resProps.mode ? options.filter(opt => value.includes(opt.value)) : options.find(opt => opt.value === value))
      }
    }
  }, [options])

  useEffect(() => {
    if (options.length === 1) {
      value = options[0].value
    }
  }, [options])

  useEffect(() => {
    if (keywordResult) {
      generateOptions(keywordResult.items)
    }
  }, [keywordResult])

  function generateOptions(keywords: string[] = []) {
    const opts = filter(keywords).map(keyword => ({
      label: <Row><Col flex={1}>{keyword.name}</Col></Row>,
      aliases: keyword.aliases,
      value: keyword.name,
    }))
    setOptions(opts)
  }

  function filterOptions(options, filter = x => x) {
    return filter(options)
  }

  return (
    <Select mode="multiple" showArrow
      value={value}
      placeholder={t('task.train.form.keywords.label')}
      filterOption={(value, option) => [option.value, ...(option.aliases || [])].some(key => key.indexOf(value) >= 0)}
      options={filterOptions(options, filter)}
      onChange={onChange}
      {...resProps}
    ></Select>
  )
}

export default KeywordSelect
