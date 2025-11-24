import JSZip from 'jszip'

export function downloadImage(canvasRef, filename = 'imagen-con-marca-agua.png') {
  if (!canvasRef.current) return

  const link = document.createElement('a')
  link.href = canvasRef.current.toDataURL('image/png')
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export async function downloadMultipleImages(canvasRefs, filenames) {
  const zip = new JSZip()

  canvasRefs.forEach((canvasRef, index) => {
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL('image/png').split(',')[1]
      zip.file(filenames[index] || `imagen-${index + 1}.png`, imageData, { base64: true })
    }
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'imagenes-marcadas.zip'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function loadPresetsFromStorage(key = 'watermark_presets') {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function savePresetToStorage(preset, key = 'watermark_presets') {
  try {
    const presets = loadPresetsFromStorage(key)
    const newPreset = {
      ...preset,
      id: Date.now(),
    }
    presets.push(newPreset)
    localStorage.setItem(key, JSON.stringify(presets))
    return newPreset
  } catch {
    console.error('Error saving preset')
    return null
  }
}

export function deletePresetFromStorage(id, key = 'watermark_presets') {
  try {
    const presets = loadPresetsFromStorage(key)
    const filtered = presets.filter((p) => p.id !== id)
    localStorage.setItem(key, JSON.stringify(filtered))
  } catch {
    console.error('Error deleting preset')
  }
}

export const createDefaultWatermark = () => ({
  type: 'text',
  text: 'Mi Marca de Agua',
  fontSize: 50,
  fontFamily: 'Arial',
  fontWeight: 'bold',
  textColor: '#1E88E5',
  logo: null,
  scale: 100,
  rotation: 0,
  position: { x: 50, y: 50 },
  opacity: 70,
  shadow: false,
  shadowBlur: 5,
  textStroke: false,
  strokeColor: '#000000',
  strokeWidth: 2,
})
