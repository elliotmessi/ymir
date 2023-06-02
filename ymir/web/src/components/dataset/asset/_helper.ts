import { Annotation, BoundingBox, Mask, Polygon } from '@/constants'
import { AnnotationType } from '@/constants/asset'
import { decode } from '@/utils/rle'
import Color from 'color'

const getColor = (hex: string = 'white', alpha: number = 0.3) => Color(hex).alpha(alpha)

export function mask2Image(mask: number[][], width: number, height: number, color = '') {
  if (!mask) {
    return
  }

  const imageData = mask2Uint8Array(mask, width * height * 4, color)

  return new ImageData(imageData, width, height)
}

function mask2Uint8Array(mask: number[][], len: number, color?: string) {
  const dataWithColor = new Uint8ClampedArray(len)
  const fill = getColor(color)
  mask.forEach((row, i) => {
    const rowLen = row.length
    row.forEach((item, j) => {
      const rgba = item ? [fill.red(), fill.green(), fill.blue(), Math.floor(fill.alpha() * 255)] : [0, 0, 0, 0]
      dataWithColor.set(rgba, (i * rowLen + j) * 4)
    })
  })

  return dataWithColor
}

export function renderPolygons(canvas: HTMLCanvasElement, annotations: Polygon[], showMore?: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx || !annotations.length) {
    return
  }
  const { color } = annotations[0]
  ctx.fillStyle = getColor(color).hexa()
  ctx.strokeStyle = getColor('gray').hexa()
  ctx.lineWidth = 1
  ctx.beginPath()
  annotations.forEach((annotation) => {
    const { polygon: points } = annotation
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach((point, index) => index > 0 && ctx.lineTo(point.x, point.y))
  })
  ctx.fill()
  showMore && drawBoxs(ctx, annotations)
}

export function renderMask(canvas: HTMLCanvasElement, mask: number[][], width: number, height: number, color?: string, showMore?: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }
  const image = mask2Image(mask, width, height, color)

  image && ctx.putImageData(image, 0, 0)

  showMore && drawBoxs(ctx, annotations)
}

function drawBoxs(ctx: CanvasRenderingContext2D, annotations: Annotation[]) {
  ctx.strokeStyle = getColor('green').hexa()
  ctx.lineWidth = 4
  ctx.font = 'bold 20px Arial'
  ctx.fillStyle = 'green'
  annotations.forEach(({ box, keyword }) => {
    ctx.strokeRect(box.x, box.y, box.w, box.h)
    ctx.fillText(keyword, box.x, box.y)
  })
}

export function transferAnnotations(annotations: Annotation[] = []) {
  const handles = (annotation: Annotation) => {
    switch (annotation.type) {
      case AnnotationType.Polygon:
        return toPolygon(annotation)
      case AnnotationType.Mask:
        return toMask(annotation)
      case AnnotationType.BoundingBox:
      default:
        return toBoundingBox(annotation as BoundingBox)
    }
  }

  return annotations.map(handles)
}

function toBoundingBox(annotation: BoundingBox): BoundingBox {
  return annotation
}

function toMask(annotation: Mask): Mask {
  const { mask, height, decodeMask: decoded } = annotation
  if (!mask || !height || decoded) {
    return annotation
  }
  const decodeMask = decode(mask, height)
  return {
    ...annotation,
    decodeMask,
  }
}

function toPolygon(annotation: Polygon): Polygon {
  return annotation
}
