import t from "@/utils/t"
import confirm from '@/components/common/dangerConfirm'
import { forwardRef, useEffect, useImperativeHandle } from "react"

import useFetch from '@/hooks/useFetch'

const Del = forwardRef(({ ok = () => {} }, ref) => {
  const [delResult, delImage] = useFetch('image/delImage')

  useEffect(() => {
    if (delResult) {
      ok(id)
    }
  }, [delResult])

  useImperativeHandle(ref, () => {
    return {
      del,
    }
  })

  function del(id, name) {
    confirm({
      content: t("image.del.confirm.content", { name }),
      onOk: () => delImage(id),
      okText: t('common.del'),
    })
  }

  return null
})

export default Del