const model = {
  "model.detail.title": { en: "Model Detail", cn: "模型详情", },
  "model.column.name": { en: "Model Name", cn: "模型名称", },
  "model.column.source": { en: "Source", cn: "来源", },
  "model.column.target": { en: "Train Classes", cn: "训练目标", },
  "model.column.map": { en: "mAP", cn: "精度均值(mAP)", },
  "model.column.create_time": { en: "Create Time", cn: "创建时间", },
  "model.column.action": { en: "Actions", cn: "操作", },
  "model.action.download": { en: "Download", cn: "下载", },
  "model.action.verify": { en: "Verify", cn: "验证", },
  "model.empty.label": { en: "Train A Model", cn: "训练出一个模型", },
  "model.empty.btn.label": { en: "Import Model", cn: '导入模型', },
  "model.import.label": { en: "Import Model", cn: "导入模型", },
  "model.query.name": { en: "Model Name", cn: "模型名称", },
  "model.action.del.confirm.content": { en: "Are you sure to remove this model version:{name}?", cn: "确认要删除模型版本：{name}？", },
  "model.action.delgroup.confirm.content": { en: "Are you sure to remove this model:{name}, all of versions will be deleted.", cn: "确认要删除模型：{name}？这个操作将删除此模型下的所有版本", },
  "model.query.name.placeholder": { en: "Model Name", cn: "模型名称", },
  "model.pager.total.label": { en: "Total {total} items", cn: "共 {total} 项", },
  'model.detail.label.name': { en: 'Model Name', cn: '模型名称', },
  'model.detail.label.map': { en: 'mAP', cn: 'mAP值', },
  'model.detail.label.source': { en: 'Source', cn: '模型来源', },
  'model.detail.label.image': { en: 'Train Image', cn: '训练镜像', },
  'model.detail.label.training_dataset': { en: 'Training Dataset', cn: '训练集', },
  'model.detail.label.test_dataset': { en: 'Test Dataset', cn: '测试集', },
  'model.detail.label.train_type': { en: 'Train Type', cn: '训练类型', },
  'model.detail.label.train_goal': { en: 'Train Classes', cn: '训练目标', },
  'model.detail.label.framework': { en: 'Network', cn: '算法框架', },
  'model.detail.label.backbone': { en: 'Backbone', cn: '骨干网络结构', },
  'model.add.types.copy': { en: 'Share', cn: '复制模型', },
  'model.add.types.local': { en: 'Local', cn: '本地导入', },
  'model.add.success': { en: 'Import model success!', cn: '导入模型成功！', },
  'model.add.form.name': { en: 'Name', cn: '名称', },
  'model.add.form.name.placeholder': { en: 'Model Name', cn: '请输入模型名称', },
  'model.add.form.type': { en: 'Import Type', cn: '导入类型', },
  'model.add.form.project': { en: 'Original Model', cn: '待复制模型', },
  'model.add.form.upload.btn': { en: 'Upload', cn: '上传文件', },
  'model.file.required': { en: 'Please upload model', cn: '请上传模型', },
  'model.add.form.upload.info': { en: `1. Only support model generating on YMIR; {br} 2. Size <= {max}M.`, cn: `1. 仅支持YMIR系统产生的模型；{br} 2. 上传文件应小于 {max}MB 。`, },
  'model.verify.upload.info': {cn: '支持jpg, png, bmp格式, 图片大小 < {size}M', en: 'Support *.jpg, *.png, *.bmp, size < {size}M'},
  'model.verify.confidence': { cn: '置信度', en: 'Confidence' },
  'model.verify.upload.label': { cn: '上传图片', en: 'Upload Image' },
  'model.verify.model.info.title': { cn: '模型信息', en: 'Model Info.' },
  'model.verify.model.param.title': { cn: '参数调整', en: 'Parameter Adjustment' },
  "model.verify.model.param.fold": { cn: '点击收起', en: 'Fold', },
  "model.verify.model.param.unfold": { cn: '点击展开', en: 'Unfold', },
  'model.verify.upload.tip': { cn: '模型验证需要较长时间，请耐心等待', en: 'Verification need more time, be patient...' },
}

export default model
