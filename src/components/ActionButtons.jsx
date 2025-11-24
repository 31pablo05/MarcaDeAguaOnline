import { Download, RotateCcw, Trash2, Plus } from 'lucide-react'

export default function ActionButtons({
  hasImage,
  watermarks,
  onDownload,
  onReset,
  onAddWatermark,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) {
  return (
    <div className="space-y-3">
      {/* Botones principales */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onDownload}
          disabled={!hasImage}
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none"
        >
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Descargar</span>
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="hidden sm:inline">Resetear</span>
        </button>
      </div>

      {/* Botón agregar marca */}
      {watermarks.length < 3 && (
        <button
          onClick={onAddWatermark}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-aqua-500 to-aqua-600 hover:from-aqua-600 hover:to-aqua-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Marca ({watermarks.length}/3)</span>
        </button>
      )}

      {/* Botones de deshacer/rehacer */}
      <div className="flex gap-2 pt-2 border-t border-aqua-200">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-lg transition-all duration-300 text-sm disabled:cursor-not-allowed"
        >
          <span>↶</span>
          <span>Deshacer</span>
        </button>
        
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-br from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-lg transition-all duration-300 text-sm disabled:cursor-not-allowed"
        >
          <span>↷</span>
          <span>Rehacer</span>
        </button>
      </div>
    </div>
  )
}
