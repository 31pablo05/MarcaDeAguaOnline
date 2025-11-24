import { Upload, CheckCircle } from 'lucide-react'

export default function LogoWatermarkConfig({
  watermarkLogo,
  scale,
  rotation,
  shadow,
  shadowBlur,
  onLogoUpload,
  onScaleChange,
  onRotationChange,
  onShadowChange,
  onShadowBlurChange,
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 space-y-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🖼️</span>
        <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Configuración de Logo</h2>
      </div>

      {/* Cargar Logo */}
      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-aqua-300 rounded-lg p-8 cursor-pointer hover:bg-gradient-to-b hover:from-aqua-50 hover:to-white transition-all duration-300 group">
        <div className="flex flex-col items-center justify-center w-full">
          <Upload className="w-10 h-10 text-aqua-400 mb-2 group-hover:text-aqua-600 group-hover:scale-110 transition-transform" />
          <span className="text-sm sm:text-base font-semibold text-aqua-900">Sube tu logo aquí</span>
          <span className="text-xs sm:text-sm text-aqua-500 mt-1">PNG, JPG, GIF (máx. 5MB)</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onLogoUpload}
          className="hidden"
        />
      </label>

      {watermarkLogo && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">Logo cargado correctamente</span>
        </div>
      )}

      {/* Escala */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-aqua-900 flex items-center gap-2">
            <span>📏</span>
            Tamaño del Logo
          </label>
          <span className="text-sm font-bold bg-aqua-100 text-aqua-900 px-3 py-1 rounded-full">
            {scale}%
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="150"
          value={scale}
          onChange={(e) => onScaleChange(Number(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-aqua-200 to-aqua-400 rounded-full appearance-none cursor-pointer accent-aqua-600 hover:from-aqua-300 hover:to-aqua-500 transition"
        />
      </div>

      {/* Rotación */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-aqua-900 flex items-center gap-2">
            <span>🔄</span>
            Rotación
          </label>
          <span className="text-sm font-bold bg-aqua-100 text-aqua-900 px-3 py-1 rounded-full">
            {rotation}°
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => onRotationChange(Number(e.target.value))}
          className="w-full h-3 bg-gradient-to-r from-aqua-200 to-aqua-400 rounded-full appearance-none cursor-pointer accent-aqua-600 hover:from-aqua-300 hover:to-aqua-500 transition"
        />
      </div>

      {/* Sombra */}
      <div className="border-t-2 border-aqua-100 pt-4 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer hover:bg-aqua-50 p-2 rounded-lg transition">
          <input
            type="checkbox"
            checked={shadow}
            onChange={(e) => onShadowChange(e.target.checked)}
            className="w-5 h-5 rounded accent-aqua-600"
          />
          <span className="font-semibold text-aqua-900 flex items-center gap-2">
            <span>✨</span>
            Sombra proyectada
          </span>
        </label>

        {shadow && (
          <div className="space-y-2 ml-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-aqua-900">Intensidad de sombra</label>
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
    </div>
  )
}
