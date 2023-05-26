import { Button, Form, FormItemProps, Input, message } from 'antd'
import { FC, ReactNode } from 'react'
import t from '@/utils/t'
import { AddIcon, DeleteIcon } from '@/components/common/Icons'
import { formLayout } from '@/config/antd'

type Props = {
  name: string
  rules?: FormItemProps['rules']
  tip?: ReactNode
  confirm: (items: string[]) => void
  max?: number
}
const Inputs: FC<Props> = ({ name, rules, tip = null, confirm, max = 0 }) => {
  const [form] = Form.useForm()

  return (
    <Form
      name={`${name}Form`}
      form={form}
      {...formLayout}
      onFinish={(values) => {
        if (max > 0) {
          confirm(values[name])
          form.resetFields()
        } else {
          message.warning('Exceed Maximium Count')
        }
      }}
    >
      <Form.List name={name} initialValue={['']}>
        {(fields, { add, remove }) => (
          <>
            <Form.Item label={t(`dataset.add.form.${name}.label`)}>
              {fields.map((field, index) => (
                <div key={field.key}>
                  <Form.Item {...field} rules={rules}>
                    <Input placeholder={t(`dataset.add.form.${name}.placeholder`)} max={512} allowClear />
                  </Form.Item>
                  {(!max || fields.length < max) && index === fields.length - 1 ? <AddIcon onClick={() => add()} /> : null}
                  {index > 0 ? <DeleteIcon onClick={() => remove(field.name)} /> : null}
                </div>
              ))}
              {tip}
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add to List
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Inputs
