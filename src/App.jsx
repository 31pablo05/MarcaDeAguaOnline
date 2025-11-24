import { useState, useRef, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import CanvasPreview from './components/CanvasPreview'
import ImageUploader from './components/ImageUploader'
import WatermarkTypeSelector from './components/WatermarkTypeSelector'
import TextWatermarkConfig from './components/TextWatermarkConfig'
import LogoWatermarkConfig from './components/LogoWatermarkConfig'
import AdjustmentControls from './components/AdjustmentControls'
import ActionButtons from './components/ActionButtons'
import WatermarkManager from './components/WatermarkManager'
import PresetManager from './components/PresetManager'
import {
  downloadImage,
  loadPresetsFromStorage,
  savePresetToStorage,
  deletePresetFromStorage,
  createDefaultWatermark,
} from './utils/helpers'

export default function App() {
  // Estados principales
  const [image, setImage] = useState(null)
  const [watermarks, setWatermarks] = useState([createDefaultWatermark()])
  const [selectedWatermarkIndex, setSelectedWatermarkIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  // Filtros de imagen
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [grayscale, setGrayscale] = useState(0)

  // Presets
  const [presets, setPresets] = useState(loadPresetsFromStorage())
  const [presetName, setPresetName] = useState('')

  // Historial simple (array de estados)
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Referencias
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // Función para dibujar en canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Aplicar filtros
      const filters = []
      if (brightness !== 100) filters.push(`brightness(${brightness / 100})`)
      if (contrast !== 100) filters.push(`contrast(${contrast / 100})`)
      if (saturation !== 100) filters.push(`saturate(${saturation / 100})`)
      if (grayscale > 0) filters.push(`grayscale(${grayscale / 100})`)

      if (filters.length > 0) {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = img.width
        tempCanvas.height = img.height
        const tempCtx = tempCanvas.getContext('2d')
        tempCtx.filter = filters.join(' ')
        tempCtx.drawImage(img, 0, 0)
        ctx.drawImage(tempCanvas, 0, 0)
      } else {
        ctx.drawImage(img, 0, 0)
      }

      // Cargar todas las imágenes de logos primero
      const logoPromises = watermarks.map((watermark) => {
        if (watermark.type === 'logo' && watermark.logo) {
          return new Promise((resolve) => {
            const logoImg = new Image()
            logoImg.onload = () => resolve({ watermark, logoImg })
            logoImg.onerror = () => resolve(null)
            logoImg.src = watermark.logo.src
          })
        }
        return Promise.resolve(null)
      })

      Promise.all(logoPromises).then((logoResults) => {
        const logoMap = new Map()
        logoResults.forEach((result) => {
          if (result) {
            logoMap.set(result.watermark, result.logoImg)
          }
        })

        // Ahora dibujar TODAS las marcas de agua
        watermarks.forEach((watermark) => {
          const watermarkX = (watermark.position.x / 100) * img.width
          const watermarkY = (watermark.position.y / 100) * img.height

          ctx.save()
          ctx.globalAlpha = watermark.opacity / 100
          ctx.translate(watermarkX, watermarkY)
          ctx.rotate((watermark.rotation * Math.PI) / 180)

          if (watermark.type === 'text') {
            // Sombra
            if (watermark.shadow) {
              ctx.shadowColor = 'rgba(0,0,0,0.5)'
              ctx.shadowBlur = watermark.shadowBlur
              ctx.shadowOffsetX = 2
              ctx.shadowOffsetY = 2
            }

            // Borde
            if (watermark.textStroke) {
              ctx.strokeStyle = watermark.strokeColor
              ctx.lineWidth = watermark.strokeWidth
              ctx.font = `${watermark.fontWeight} ${watermark.fontSize}px ${watermark.fontFamily}`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.strokeText(watermark.text, 0, 0)
            }

            // Texto
            ctx.fillStyle = watermark.textColor
            ctx.font = `${watermark.fontWeight} ${watermark.fontSize}px ${watermark.fontFamily}`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(watermark.text, 0, 0)
          } else if (watermark.type === 'logo' && logoMap.has(watermark)) {
            // Sombra para logo
            if (watermark.shadow) {
              ctx.shadowColor = 'rgba(0,0,0,0.5)'
              ctx.shadowBlur = watermark.shadowBlur
              ctx.shadowOffsetX = 2
              ctx.shadowOffsetY = 2
            }

            const logoImg = logoMap.get(watermark)
            const scaledWidth = (watermark.logo.width * watermark.scale) / 100
            const scaledHeight = (watermark.logo.height * watermark.scale) / 100
            ctx.drawImage(logoImg, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight)
          }

          ctx.restore()
        })
      })
    }

    img.src = image.src
  }, [image, watermarks, brightness, contrast, saturation, grayscale])

  // Redibujar cuando cambia algo
  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  // Manejadores de imagen
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setImage({
            src: event.target.result,
            width: img.width,
            height: img.height,
          })
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // Manejadores de marca de agua seleccionada
  const currentWatermark = { ...createDefaultWatermark(), ...watermarks[selectedWatermarkIndex] }

  const updateWatermark = (updates) => {
    const newWatermarks = [...watermarks]
    // Asegurar que siempre tenga las propiedades base
    const baseWatermark = { ...createDefaultWatermark(), ...newWatermarks[selectedWatermarkIndex] }
    const updated = { ...baseWatermark, ...updates }
    newWatermarks[selectedWatermarkIndex] = updated
    setWatermarks(newWatermarks)
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          updateWatermark({
            logo: {
              src: event.target.result,
              width: img.width,
              height: img.height,
            },
          })
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // Drag & drop en canvas
  const handleMouseDown = (e) => {
    setIsDragging(true)
    console.log('Mouse DOWN - Drag started')
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !canvasRef.current || !image) return

    const canvas = canvasRef.current
    const canvasRect = canvas.getBoundingClientRect()

    console.log('Mouse MOVE:', {
      isDragging,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      renderWidth: canvasRect.width,
      renderHeight: canvasRect.height,
      clientX: e.clientX,
      clientY: e.clientY,
      canvasLeft: canvasRect.left,
      canvasTop: canvasRect.top,
    })

    // Validaciones
    if (canvas.width === 0 || canvas.height === 0) {
      console.log('Canvas no tiene dimensiones válidas')
      return
    }
    if (canvasRect.width === 0 || canvasRect.height === 0) {
      console.log('Canvas no está renderizado correctamente')
      return
    }

    // Calcular posición relativa al canvas renderizado
    const relativeX = e.clientX - canvasRect.left
    const relativeY = e.clientY - canvasRect.top

    // Validar que el mouse está dentro del canvas
    if (relativeX < 0 || relativeY < 0 || relativeX > canvasRect.width || relativeY > canvasRect.height) {
      console.log('Mouse fuera del canvas')
      return
    }

    // Mapear a coordenadas del canvas lógico
    const logicalX = (relativeX / canvasRect.width) * canvas.width
    const logicalY = (relativeY / canvasRect.height) * canvas.height

    // Convertir a porcentaje (0-100%)
    const percentX = (logicalX / canvas.width) * 100
    const percentY = (logicalY / canvas.height) * 100

    console.log('Posición actualizada:', { percentX: percentX.toFixed(1), percentY: percentY.toFixed(1) })

    // Actualizar solo la posición
    const newWatermarks = [...watermarks]
    newWatermarks[selectedWatermarkIndex] = {
      ...newWatermarks[selectedWatermarkIndex],
      position: {
        x: Math.max(0, Math.min(100, percentX)),
        y: Math.max(0, Math.min(100, percentY)),
      },
    }
    setWatermarks(newWatermarks)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    console.log('Mouse UP - Drag ended')
  }

  // Agregar/eliminar marcas de agua
  const handleAddWatermark = () => {
    if (watermarks.length < 3) {
      const newWatermarks = [...watermarks, createDefaultWatermark()]
      setWatermarks(newWatermarks)
      setSelectedWatermarkIndex(newWatermarks.length - 1)
    }
  }

  const handleDeleteWatermark = (index) => {
    if (watermarks.length > 1) {
      const newWatermarks = watermarks.filter((_, i) => i !== index)
      setWatermarks(newWatermarks)
      setSelectedWatermarkIndex(Math.max(0, index - 1))
    }
  }

  // Presets
  const handleSavePreset = () => {
    if (!presetName.trim()) return

    const newPreset = savePresetToStorage({
      name: presetName,
      watermarks,
      brightness,
      contrast,
      saturation,
      grayscale,
    })

    if (newPreset) {
      setPresets([...presets, newPreset])
      setPresetName('')
    }
  }

  const handleLoadPreset = (preset) => {
    setWatermarks(preset.watermarks)
    setBrightness(preset.brightness)
    setContrast(preset.contrast)
    setSaturation(preset.saturation)
    setGrayscale(preset.grayscale)
    setSelectedWatermarkIndex(0)
  }

  const handleDeletePreset = (id) => {
    deletePresetFromStorage(id)
    setPresets(presets.filter((p) => p.id !== id))
  }

  // Reset
  const handleReset = () => {
    setImage(null)
    setWatermarks([createDefaultWatermark()])
    setSelectedWatermarkIndex(0)
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setGrayscale(0)
  }

  // Descargar
  const handleDownload = () => {
    downloadImage(canvasRef, 'imagen-con-marca-agua.png')
  }

  // Manejadores de historial (deshabilitados por ahora)
  const handleUndo = () => {
    console.log('Undo será implementado en próximas versiones')
  }

  const handleRedo = () => {
    console.log('Redo será implementado en próximas versiones')
  }

  const canUndo = false
  const canRedo = false

  return (
    <div className="min-h-screen bg-gradient-to-br from-aqua-50 via-blue-50 to-aqua-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Panel de Controles - Sidebar */}
          <div className="lg:col-span-1 space-y-5 lg:space-y-6 order-2 lg:order-1">
            <ImageUploader onImageUpload={handleImageUpload} hasImage={!!image} />
            <WatermarkTypeSelector
              watermarkType={currentWatermark.type}
              onTypeChange={(type) => updateWatermark({ type })}
            />

            {currentWatermark.type === 'text' ? (
              <TextWatermarkConfig
                watermarkText={currentWatermark.text}
                fontSize={currentWatermark.fontSize}
                textColor={currentWatermark.textColor}
                rotation={currentWatermark.rotation}
                fontFamily={currentWatermark.fontFamily}
                fontWeight={currentWatermark.fontWeight}
                shadow={currentWatermark.shadow}
                shadowBlur={currentWatermark.shadowBlur}
                textStroke={currentWatermark.textStroke}
                strokeColor={currentWatermark.strokeColor}
                strokeWidth={currentWatermark.strokeWidth}
                onTextChange={(text) => updateWatermark({ text })}
                onFontSizeChange={(size) => updateWatermark({ fontSize: size })}
                onColorChange={(color) => updateWatermark({ textColor: color })}
                onRotationChange={(rotation) => updateWatermark({ rotation })}
                onFontFamilyChange={(family) => updateWatermark({ fontFamily: family })}
                onFontWeightChange={(weight) => updateWatermark({ fontWeight: weight })}
                onShadowChange={(shadow) => updateWatermark({ shadow })}
                onShadowBlurChange={(blur) => updateWatermark({ shadowBlur: blur })}
                onTextStrokeChange={(stroke) => updateWatermark({ textStroke: stroke })}
                onStrokeColorChange={(color) => updateWatermark({ strokeColor: color })}
                onStrokeWidthChange={(width) => updateWatermark({ strokeWidth: width })}
              />
            ) : (
              <LogoWatermarkConfig
                watermarkLogo={currentWatermark.logo}
                scale={currentWatermark.scale}
                rotation={currentWatermark.rotation}
                shadow={currentWatermark.shadow}
                shadowBlur={currentWatermark.shadowBlur}
                onLogoUpload={handleLogoUpload}
                onScaleChange={(scale) => updateWatermark({ scale })}
                onRotationChange={(rotation) => updateWatermark({ rotation })}
                onShadowChange={(shadow) => updateWatermark({ shadow })}
                onShadowBlurChange={(blur) => updateWatermark({ shadowBlur: blur })}
              />
            )}

            <AdjustmentControls
              opacity={currentWatermark.opacity}
              position={currentWatermark.position}
              brightness={brightness}
              contrast={contrast}
              saturation={saturation}
              grayscale={grayscale}
              onOpacityChange={(opacity) => updateWatermark({ opacity })}
              onPositionChange={(position) => updateWatermark({ position })}
              onBrightnessChange={setBrightness}
              onContrastChange={setContrast}
              onSaturationChange={setSaturation}
              onGrayscaleChange={setGrayscale}
            />

            <ActionButtons
              hasImage={!!image}
              watermarks={watermarks}
              onDownload={handleDownload}
              onReset={handleReset}
              onAddWatermark={handleAddWatermark}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={canUndo}
              canRedo={canRedo}
            />

            <WatermarkManager
              watermarks={watermarks}
              selectedWatermarkIndex={selectedWatermarkIndex}
              onSelectWatermark={setSelectedWatermarkIndex}
              onDeleteWatermark={handleDeleteWatermark}
            />

            <PresetManager
              presets={presets}
              onLoadPreset={handleLoadPreset}
              onSavePreset={handleSavePreset}
              onDeletePreset={handleDeletePreset}
              currentConfig={{ watermarks, brightness, contrast, saturation, grayscale }}
              presetName={presetName}
              onPresetNameChange={setPresetName}
            />
          </div>

          {/* Vista Previa - Main Content */}
          <CanvasPreview
            ref={containerRef}
            image={image}
            isDragging={isDragging}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            canvasRef={canvasRef}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
