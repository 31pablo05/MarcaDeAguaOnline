import { useEffect, useCallback } from 'react'

export function useCanvasDrawing(
  canvasRef,
  image,
  watermarks,
  brightness,
  contrast,
  saturation,
  grayscale
) {
  const applyFilters = useCallback((ctx, img) => {
    // Aplicar filtros CSS
    const filters = []
    if (brightness !== 100) filters.push(`brightness(${brightness / 100})`)
    if (contrast !== 100) filters.push(`contrast(${contrast / 100})`)
    if (saturation !== 100) filters.push(`saturate(${saturation / 100})`)
    if (grayscale > 0) filters.push(`grayscale(${grayscale / 100})`)

    if (filters.length > 0) {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const tempCtx = canvas.getContext('2d')

      tempCtx.filter = filters.join(' ')
      tempCtx.drawImage(img, 0, 0)

      return canvas
    }
    return null
  }, [brightness, contrast, saturation, grayscale])

  const drawWatermark = useCallback((ctx, watermark, img, index) => {
    const watermarkX = (watermark.position.x / 100) * img.width
    const watermarkY = (watermark.position.y / 100) * img.height

    ctx.save()

    // Aplicar transformación
    ctx.translate(watermarkX, watermarkY)
    ctx.rotate((watermark.rotation * Math.PI) / 180)
    ctx.globalAlpha = watermark.opacity / 100

    if (watermark.type === 'text') {
      // Dibujar sombra si está habilitada
      if (watermark.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.5)'
        ctx.shadowBlur = watermark.shadowBlur
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
      }

      // Dibujar borde si está habilitado
      if (watermark.textStroke) {
        ctx.strokeStyle = watermark.strokeColor
        ctx.lineWidth = watermark.strokeWidth
        ctx.font = `${watermark.fontWeight} ${watermark.fontSize}px ${watermark.fontFamily}`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.strokeText(watermark.text, 0, 0)
      }

      // Dibujar texto
      ctx.fillStyle = watermark.textColor
      ctx.font = `${watermark.fontWeight} ${watermark.fontSize}px ${watermark.fontFamily}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(watermark.text, 0, 0)
    } else if (watermark.type === 'logo' && watermark.logo) {
      // Dibujar sombra si está habilitada
      if (watermark.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.5)'
        ctx.shadowBlur = watermark.shadowBlur
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
      }

      const logoImg = new Image()
      logoImg.onload = () => {
        const scaledWidth = (watermark.logo.width * watermark.scale) / 100
        const scaledHeight = (watermark.logo.height * watermark.scale) / 100
        ctx.drawImage(logoImg, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight)
      }
      logoImg.src = watermark.logo.src
    }

    ctx.restore()
  }, [])

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Aplicar filtros a la imagen
      const filteredCanvas = applyFilters(ctx, img)
      if (filteredCanvas) {
        ctx.drawImage(filteredCanvas, 0, 0)
      } else {
        ctx.drawImage(img, 0, 0)
      }

      // Dibujar todas las marcas de agua
      watermarks.forEach((watermark, index) => {
        drawWatermark(ctx, watermark, img, index)
      })
    }

    img.src = image.src
  }, [image, watermarks, applyFilters, drawWatermark])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  return { drawCanvas }
}
