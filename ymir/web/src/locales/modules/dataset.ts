const dataset = {
  'dataset.list': { cn: '数据集管理', en: 'Datasets' },
  'dataset.detail.title': { cn: '数据集详情', en: 'Dataset Detail' },
  'dataset.asset.title': { cn: '数据详情', en: 'Dataset Assets' },
  'dataset.state.ready': { cn: '进行中', en: 'Running' },
  'dataset.state.valid': { cn: '可用', en: 'Valid' },
  'dataset.state.invalid': { cn: '不可用', en: 'Invalid' },
  'dataset.column.name': { cn: '版本', en: 'Version' },
  'dataset.column.source': { cn: '数据集来源', en: 'Dataset Source' },
  'dataset.column.asset_count': { cn: '图片数', en: "Assets' Count" },
  'dataset.column.keyword': { cn: '类别', en: 'Classes' },
  'dataset.column.ignored_keyword': { cn: '忽略类别', en: 'Ignored Classes' },
  'dataset.column.state': { cn: '状态', en: 'Status' },
  'dataset.column.create_time': { cn: '创建时间', en: 'Create Time' },
  'dataset.column.delete_time': { cn: '删除时间', en: 'Deleted Time' },
  'dataset.column.model': { cn: '模型名称', en: 'Model Name' },
  'dataset.column.map': { cn: 'mAP(平均IoU)', en: 'mAP(Average of IoU)' },
  'dataset.column.action': { cn: '操作', en: 'Actions' },
  'dataset.column.keyword.label': { cn: '{keywords} 共{total}个', en: '{keywords} total {total}.' },
  'dataset.action.fusion': { cn: '预处理', en: 'Pretreat' },
  'dataset.action.train': { cn: '训练', en: 'Train' },
  'dataset.action.mining': { cn: '挖掘', en: 'Mining' },
  'dataset.action.label': { cn: '标注', en: 'Label' },
  'dataset.action.del': { cn: '删除', en: 'Remove' },
  'dataset.action.detail': { cn: '详情', en: 'Detail' },
  'dataset.action.edit': { cn: '编辑', en: 'Rename' },
  'dataset.action.inference': { cn: '推理', en: 'Inference' },
  'dataset.empty.label': { cn: '去导入一个数据集', en: 'Import A Dataset' },
  'dataset.import.label': { cn: '添加数据集', en: 'Add Dataset' },
  'dataset.query.name': { cn: '名称', en: 'Dataset Name' },
  'dataset.action.del.confirm.content': { cn: '确认要删除数据集版本：{name}？', en: 'Are you sure to remove this dataset version: {name}?' },
  'dataset.del.single.invalid': { cn: '该版本不能删除', en: 'This version can not be delete' },
  'dataset.action.del.confirm.exclude': {
    cn: '以下版本因与项目、迭代等关联不能删除：{labels}',
    en: 'The following related to project or iterations can not be delete: {name}.',
  },
  'dataset.action.delgroup.confirm.content': {
    en: 'Are you sure to remove this dataset:{name}, all of versions will be deleted.',
    cn: '确认要删除数据集：{name}？这个操作将删除此数据集下的所有版本',
  },
  'dataset.query.name.placeholder': { cn: '数据集名称', en: 'Dataset Name' },
  'dataset.detail.pager.total': { cn: '共 {total} 图像', en: 'Total {total} Pictures' },
  'dataset.detail.keyword.label': { cn: '类别：', en: 'Classes: ' },
  'dataset.detail.randompage.label': { cn: '随机页', en: 'Random Page' },
  'dataset.detail.assets.keywords.total': { cn: '共{total}个类别', en: '{total} classes' },
  'dataset.asset.filters.title': { cn: '评估结果：（重叠度: 0.5, 置信度: 0.8）', en: 'Evaluation (IoU: 0.5, Confidence: 0.8)' },
  'dataset.asset.info': { cn: '数据信息', en: 'Asset Info' },
  'dataset.asset.info.id': { cn: '标识', en: 'ID' },
  'dataset.asset.info.size': { cn: '大小', en: 'Size' },
  'dataset.asset.info.width': { cn: '宽', en: 'Width' },
  'dataset.asset.info.height': { cn: '高', en: 'Height' },
  'dataset.asset.info.channel': { cn: '通道', en: 'Channels' },
  'dataset.asset.info.timestamp': { cn: '时间戳', en: 'Timestamp' },
  'dataset.asset.info.keyword': { cn: '类别', en: 'Classes' },
  'dataset.asset.random': { cn: '随机图像', en: 'Random Asset' },
  'dataset.asset.back': { cn: '上一个', en: 'Previous Asset' },
  'dataset.asset.empty': { cn: '查询不到指定asset', en: 'Invalid Asset' },
  'dataset.asset.annotation.hide': { cn: '隐藏所有标注', en: 'Hide All' },
  'dataset.asset.annotation.show': { cn: '显示所有标注', en: 'Show All' },
  'dataset.add.types.internal': { cn: '公共数据集', en: 'Public Dataset' },
  'dataset.add.types.copy': { cn: '复制数据集', en: 'Copy Dataset From Other Project' },
  'dataset.add.types.net': { cn: '网络导入', en: 'Net Import' },
  'dataset.add.types.local': { cn: '本地导入', en: 'Local Import' },
  'dataset.add.types.path': { cn: '路径导入', en: 'Path Import' },
  'dataset.add.success.msg': { cn: '导入正在进行中', en: 'Dataset Importing' },
  'dataset.add.form.name.label': { cn: '新数据集名称', en: 'Dataset Name' },
  'dataset.add.form.name.required': { cn: '数据集名称为必填项', en: 'Dataset Name Required' },
  'dataset.add.form.name.placeholder': { cn: '请输入数据集名称，支持2-80个字符', en: 'Please input dataset name, 2 - 80 characters' },
  'dataset.add.form.type.label': { cn: '添加类型', en: 'Type' },
  'dataset.add.form.label.label': { cn: '标注', en: 'Labeling Status' },
  'dataset.add.form.newkw.label': { cn: ' ', en: ' ' },
  'dataset.add.newkw.asname': { cn: '添加类别', en: 'As Class' },
  'dataset.add.newkw.asalias': { cn: '添加为别名', en: 'As Alias' },
  'dataset.add.newkw.ignore': { cn: '忽略此类别', en: 'Ignore' },
  'dataset.add.form.newkw.link': { cn: '前往类别管理添加>>', en: 'Go to the class manegement to add>>' },
  'dataset.add.form.newkw.tip': {
    cn: '当导入模型的类别内容不在当前的用户类别列表时，选择导入策略。',
    en: 'Select an import policy when the tag of the imported dataset does not belong to the current list of user tags.',
  },
  'dataset.add.label_strategy.exclude': { cn: '不包含标注', en: 'Only Assets' },
  'dataset.add.label_strategy.ignore': { cn: '只添加已有类别的标注', en: 'Ignore unknown classes and annotations' },
  'dataset.add.label_strategy.add': { cn: '添加所有标注', en: 'Add Classes' },
  'dataset.add.form.internal.label': { cn: '数据集', en: 'Dataset' },
  'dataset.add.form.internal.required': { cn: '请选择公共数据集', en: 'Please select public dataset' },
  'dataset.add.form.internal.placeholder': { cn: '请选择一个公共数据集', en: 'Select A Public Dataset' },
  'dataset.add.form.net.label': { cn: 'URL地址', en: 'URL' },
  'dataset.add.form.net.placeholder': { cn: '请输入压缩文件的url地址', en: 'Please input a url of zip file' },
  'dataset.add.form.path.label': { cn: '相对路径', en: 'Relative Path' },
  'dataset.add.form.tip.format.detail': { cn: '查看标注示例文件及meta.yaml格式', en: 'View annotations sample file or meta.yaml' },
  'dataset.add.form.tip.structure': {
    cn: '图片文件需放入images文件夹内，标注文件需放入gt文件夹内。gt可选。文件结构如下：{br}{pic}{br}{detail}',
    en: 'image -> images; gt -> GT annotations; gt is optional. structure: {br}{pic}',
  },
  'dataset.add.form.path.tip': {
    cn: `1. 将数据文件夹存放到ymir工作空间目录下的ymir-sharing目录，如 /home/ymir/ymir-workspace/ymir-sharing/Dataset2012, 输入基于ymir-sharing相对路径：Dataset2012{br}
    2. {structure}`,
    en: `1. Save the data in 'ymir-sharing' under ymir workspace directory, such as /home/ymir/ymir-workspace/ymir-sharing/Dataset2012, and input relative path base on ymir-sharing: Dataset2012{br}
    2. {structure}`,
  },
  'dataset.add.form.path.placeholder': { cn: '请输入路径', en: 'Please input path on server' },
  'dataset.add.form.upload.btn': { cn: '上传文件', en: 'Upload' },
  'dataset.add.form.upload.tip': {
    cn: `1. 仅支持zip格式压缩包文件上传；{br}
      2. 局域网内压缩包大小 < 1G, 互联网建议 < 200MB；{br}
      3. 压缩包内图片格式要求为：图片格式为*.jpg、*.jpeg、*.png、*.bmp，格式不符的图片将不会导入，标注文件格式为{format}。{br}
      4. 示例：{sample}{br}
      5. {structure}`,
    en: `1. Only zip file allowed;{br} 
      2. Size < 1G;{br}
      3. Images format allowed *.jpg, *.jpeg, *.png, *.bmp, images with unmatched format can not be imported, annotations format supported {format}{br}
      4. Sample: {sample}{br}
      5. {structure}`,
  },
  'dataset.add.form.net.tip': {
    cn: `1. 示例: https://www.examples.com/dataset.zip{br}
      2. {structure}`,
    en: `1. Sample: https://www.examples.com/dataset.zip{br} 
      2. {structure}`,
  },
  'dataset.copy.form.dataset': { cn: '原数据集', en: 'Original Dataset' },
  'dataset.copy.form.desc.label': { cn: '备注', en: 'Description' },
  'dataset.copy.success.msg': { cn: '数据集正在复制，请稍等', en: 'Dataset copying' },
  'dataset.detail.action.fusion': { cn: '挖掘数据准备', en: 'Data Pretreatment' },
  'dataset.detail.action.train': { cn: '训练模型', en: 'Train Model' },
  'dataset.detail.action.mining': { cn: '挖掘数据', en: 'Mining' },
  'dataset.detail.action.label': { cn: '数据标注', en: 'Label' },
  'dataset.import.public.include': { cn: '添加新类别', en: 'New Classes' },
  'dataset.add.newkeyword.empty': { cn: '无新类别', en: 'None of new classes' },
  'dataset.add.local.file.empty': { cn: '请上传本地文件', en: 'Please upload a zip file' },
  'dataset.samples.negative': { cn: '负样本', en: 'Negative Samples' },
  'dataset.train.form.samples': { cn: '正负样本', en: 'Neg./Pos. Samples' },
  'dataset.detail.label.name': { cn: '数据集名称', en: 'Dataset Name' },
  'dataset.detail.label.assets': { cn: '图片数', en: 'Assets Count' },
  'dataset.detail.label.keywords': { cn: '类别', en: 'Classes' },
  'dataset.add.form.copy.label': { cn: '源数据集', en: 'Original Dataset' },
  'dataset.add.form.copy.required': { cn: '源数据集不能为空', en: 'Original dataset is required' },
  'dataset.add.form.copy.placeholder': { cn: '请选择待复制的数据集版本', en: 'Select a dataset version for copy' },
  'dataset.add.validate.url.invalid': { cn: '不是合法的网络地址', en: 'Invalid url' },
  'dataset.fusion.validate.inputs': { cn: '请输入至少一项预处理条件', en: 'Please input one condition at least for pretreating' },
  'dataset.filter.validate.inputs': { cn: '请输入至少一项筛选条件', en: 'Please input one condition at least for filter' },
  'dataset.merge.validate.inputs': { cn: '请输入至少一项合并条件', en: 'Please input one condition at least for merge' },
  'dataset.add.internal.newkeywords.label': { en: 'Add following classes and related annotations:', cn: '添加以下类别及相应标注：' },
  'dataset.add.internal.ignore.all': { en: 'Ignore All', cn: '全部忽略' },
  'dataset.add.internal.ignorekeywords.label': { en: 'Ignore following classes and related annotations:', cn: '忽略以下类别及相应标注：' },
  'dataset.add.internal.add.all': { en: 'Add All', cn: '全部添加' },
  'dataset.analysis.column.name': { cn: '数据集', en: 'Dataset' },
  'dataset.analysis.column.labelled': { cn: '已标注图片数', en: 'Labelled Assets' },
  'dataset.analysis.validator.dataset.count': { cn: '最多选择{count}个数据集', en: 'Select {count} datasets at most' },
  'dataset.analysis.column.assets.count': { cn: '图片总数', en: 'Assets Count' },
  'dataset.analysis.column.keywords.count': { cn: '类别数量', en: 'Classes Count' },
  'dataset.analysis.column.keywords.count.average': { cn: '平均类别数', en: 'Average Classes per Asset' },
  'dataset.analysis.column.annotations.total': { cn: '标注框总数', en: 'Annotations Count' },
  'dataset.analysis.column.annotations.average': { cn: '平均标注框数', en: 'Average Annotations per Assets' },
  'dataset.analysis.column.annotations.area.total': { cn: '标注总面积', en: 'Total Annotations Area' },
  'dataset.analysis.column.annotations.area.average': { cn: '标注总面积/总图像数', en: 'Total Area / Assets' },
  'dataset.analysis.column.instances.total': { cn: '标注实例总数', en: 'Total Instances' },
  'dataset.analysis.column.instances.average': { cn: '平均标注实例数', en: 'Average Instances / Assets' },
  'dataset.analysis.column.cks.count': { cn: '图像标签数量', en: 'Assets Tags Count' },
  'dataset.analysis.param.title': { cn: '选择', en: 'Select' },
  'dataset.analysis.btn.start': { cn: '开始分析', en: 'Analysis' },
  'dataset.analysis.btn.retry': { cn: '重新分析', en: 'Retry' },
  'dataset.analysis.title.asset_bytes': { cn: '图像大小分布', en: 'Image Size Distribution' },
  'dataset.analysis.title.asset_hw_ratio': { cn: '图像高宽比分布', en: 'Image Aspect Ratio Distribution' },
  'dataset.analysis.title.asset_area': { cn: '图像分辨率分布', en: 'Image Resolution Distribution' },
  'dataset.analysis.title.asset_quality': { cn: '图像质量分布', en: 'Image Quality Distribution' },
  'dataset.analysis.title.anno_area_ratio': { cn: '标注框分辨率分布', en: 'Annotation Box Resolution Distribution' },
  'dataset.analysis.title.keyword_ratio': { cn: '样本分布占比', en: 'Classes Ratio Statistics' },
  'dataset.analysis.title.keyword_area': { cn: '标注面积统计', en: 'Annotations Area Statistics' },
  'dataset.analysis.title.instance_area': { cn: '实例面积分布', en: 'Instances Area Distribution' },
  'dataset.analysis.title.crowdedness': { cn: '目标聚集度', en: 'Object Crowdedness Statistics' },
  'dataset.analysis.title.complexity': { cn: '场景复杂度', en: 'Scene Complexity' },
  'dataset.analysis.bar.asset.tooltip': { cn: ' 占比：{ratio} 数量：{amount} 张', en: ' Ratio: {ratio} Amount: {amount}' },
  'dataset.analysis.bar.anno.tooltip': { cn: ' 占比：{ratio} 数量：{amount} 个', en: ' Ratio: {ratio} Amount: {amount}' },
  'dataset.analysis.bar.area.tooltip': { cn: ' 占比：{ratio} 面积：{amount} px', en: ' Ratio: {ratio} Area: {amount}' },
  'dataset.analysis.annotations.metrics': { cn: '标注评估', en: 'Annotations Evaluation' },
  'dataset.analysis.assets.metrics': { cn: '图像评估', en: 'Assets Evaluation' },
  'dataset.train.all.train.target': { cn: '将训练集的所有类别作为训练目标', en: 'All training dataset classes as training target' },
  'dataset.assets.keyword.selector.types.keywords': { en: 'Classes', cn: '类别' },
  'dataset.assets.keyword.selector.types.cks': { en: 'Asset Tag', cn: '数据标签' },
  'dataset.assets.keyword.selector.types.tags': { en: 'Box Tag', cn: '标注框标签' },
  'dataset.assets.keyword.selector.types.placeholder': { en: 'Please select filter classes', cn: '请选择筛选类别，可多选' },
  'dataset.assets.selector.gt.label': { en: 'Annotation Type:', cn: '标注类型：' },
  'dataset.assets.selector.evaluation.label': { en: 'Evaluation:', cn: '评估结果' },
  'dataset.detail.infer.class': { en: 'Prediction Classes:', cn: '预测类别：' },
  'dataset.type.testing': { cn: '测试集', en: 'Testing Datasets' },
  'dataset.assets.selector.columns.label': { en: '{count} assets per row', cn: '一行 {count} 张图片' },
  'dataset.assets.selector.visual.label': { cn: '可视化', en: 'Visualization' },
  'dataset.assets.selector.visual.label.all': { cn: '查看图像、标注和推理结果', en: 'View assets/annotations/predictions' },
  'dataset.assets.selector.visual.label.asset': { cn: '仅查看图像', en: 'View only assets' },
  'dataset.assets.selector.visual.label.gt': { cn: '查看图像和标注', en: 'View assets/annotations' },
  'dataset.assets.selector.visual.label.pred': { cn: '查看图像和推理结果', en: 'View assets/predictions' },
  'dataset.assets.selector.visual.label.annotation': { cn: '查看标注和推理结果', en: 'View annotations/predictions' },
  'dataset.assets.selector.evaluation.right': { cn: '预测正确', en: 'Correct' },
  'dataset.assets.selector.evaluation.fp': { cn: '预测错误-误检', en: 'FP' },
  'dataset.assets.selector.evaluation.fn': { cn: '预测错误-漏检', en: 'FN' },
}

export default dataset
