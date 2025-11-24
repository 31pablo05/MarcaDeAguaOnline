import { ChevronDown } from 'lucide-react'

const GOOGLE_FONTS = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Georgia', value: 'Georgia' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Courier New', value: 'Courier New' },
  { name: 'Verdana', value: 'Verdana' },
  { name: 'Comic Sans MS', value: 'Comic Sans MS' },
]

export default function TextWatermarkConfig({
  watermarkText,
  fontSize,
  textColor,
  rotation,
  fontFamily,
  fontWeight,
  shadow,
  shadowBlur,
  textStroke,
  strokeColor,
  strokeWidth,
  onTextChange,
  onFontSizeChange,
  onColorChange,
  onRotationChange,
  onFontFamilyChange,
  onFontWeightChange,
  onShadowChange,
  onShadowBlurChange,
  onTextStrokeChange,
  onStrokeColorChange,
  onStrokeWidthChange,
}) {
  const renderControl = (label, children, icon = '') => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-aqua-900 flex items-center gap-2">
        <span>{icon}</span>
        {label}
      </label>
      {children}
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 space-y-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✏️</span>
        <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Configuración de Texto</h2>
      </div>

      {/* Texto principal */}
      {renderControl('Tu marca de agua', (
        <input
          type="text"
          value={watermarkText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Escribe aquí..."
          className="w-full px-4 py-3 border-2 border-aqua-200 rounded-lg focus:outline-none focus:border-aqua-500 focus:ring-2 focus:ring-aqua-200 transition font-medium text-aqua-900"
        />
      ), '📝')}

      {/* Grid de controles */}
      <div className="grid grid-cols-2 gap-4">
        {/* Tamaño de fuente */}
        {renderControl('Tamaño', (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <input
                type="number"
                min="20"
                max="120"
                value={fontSize}
                onChange={(e) => onFontSizeChange(Number(e.target.value))}
                className="w-16 px-2 py-2 border border-aqua-200 rounded-lg text-center font-semibold text-aqua-900 focus:outline-none focus:ring-2 focus:ring-aqua-500"
              />
              <span className="text-xs text-aqua-500">px</span>
            </div>
            <input
              type="range"
              min="20"
              max="120"
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="w-full h-2 bg-aqua-100 rounded-full accent-aqua-600"
            />
          </div>
        ), '📏')}

        {/* Rotación */}
        {renderControl('Rotación', (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <input
                type="number"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => onRotationChange(Number(e.target.value))}
                className="w-16 px-2 py-2 border border-aqua-200 rounded-lg text-center font-semibold text-aqua-900 focus:outline-none focus:ring-2 focus:ring-aqua-500"
              />
              <span className="text-xs text-aqua-500">°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => onRotationChange(Number(e.target.value))}
              className="w-full h-2 bg-aqua-100 rounded-full accent-aqua-600"
            />
          </div>
        ), '🔄')}
      </div>

      {/* Fuente y Peso */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderControl('Tipo de fuente', (
          <select
            value={fontFamily}
            onChange={(e) => onFontFamilyChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-aqua-200 rounded-lg focus:outline-none focus:border-aqua-500 focus:ring-2 focus:ring-aqua-200 bg-white font-medium text-aqua-900"
          >
            {GOOGLE_FONTS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        ), '🔤')}

        {renderControl('Grosor', (
          <select
            value={fontWeight}
            onChange={(e) => onFontWeightChange(e.target.value)}
            className="w-full px-3 py-2 border-2 border-aqua-200 rounded-lg focus:outline-none focus:border-aqua-500 focus:ring-2 focus:ring-aqua-200 bg-white font-medium text-aqua-900"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="900">Extra Bold</option>
          </select>
        ), '⚖️')}
      </div>

      {/* Colores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {renderControl('Color del texto', (
          <div className="flex gap-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer border-2 border-aqua-200 hover:border-aqua-400"
            />
            <input
              type="text"
              value={textColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-aqua-200 rounded-lg font-mono text-sm focus:outline-none focus:border-aqua-500"
            />
          </div>
        ), '🎨')}

        {textStroke && renderControl('Color del borde', (
          <div className="flex gap-2">
            <input
              type="color"
              value={strokeColor}
              onChange={(e) => onStrokeColorChange(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer border-2 border-aqua-200 hover:border-aqua-400"
            />
            <input
              type="text"
              value={strokeColor}
              onChange={(e) => onStrokeColorChange(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-aqua-200 rounded-lg font-mono text-sm focus:outline-none focus:border-aqua-500"
            />
          </div>
        ), '🟦')}
      </div>

      {/* Efectos */}
      <div className="border-t-2 border-aqua-100 pt-4 space-y-4">
        <h3 className="font-semibold text-aqua-900 flex items-center gap-2">✨ Efectos</h3>

        {/* Sombra */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer hover:bg-aqua-50 p-2 rounded-lg transition">
            <input
              type="checkbox"
              checked={shadow}
              onChange={(e) => onShadowChange(e.target.checked)}
              className="w-5 h-5 rounded accent-aqua-600"
            />
            <span className="font-medium text-aqua-900">Sombra proyectada</span>
          </label>

          {shadow && (
            <div className="space-y-2 ml-8">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-aqua-900">Intensidad</label>
                <span className="text-sm font-bold bg-aqua-100 text-aqua-900 px-2 py-1 rounded">{shadowBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={shadowBlur}
                onChange={(e) => onShadowBlurChange(Number(e.target.value))}
                className="w-full h-2 bg-aqua-100 rounded-full accent-aqua-600"
              />
            </div>
          )}
        </div>

        {/* Borde */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer hover:bg-aqua-50 p-2 rounded-lg transition">
            <input
              type="checkbox"
              checked={textStroke}
              onChange={(e) => onTextStrokeChange(e.target.checked)}
              className="w-5 h-5 rounded accent-aqua-600"
            />
            <span className="font-medium text-aqua-900">Borde del texto</span>
          </label>

          {textStroke && (
            <div className="space-y-2 ml-8">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-aqua-900">Grosor del borde</label>
                <span className="text-sm font-bold bg-aqua-100 text-aqua-900 px-2 py-1 rounded">{strokeWidth}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))}
                className="w-full h-2 bg-aqua-100 rounded-full accent-aqua-600"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
