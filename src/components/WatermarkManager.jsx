import { Trash2, Edit2, Check } from 'lucide-react'

export default function WatermarkManager({ watermarks, onSelectWatermark, onDeleteWatermark, selectedWatermarkIndex }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📋</span>
        <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Mis Marcas ({watermarks.length}/3)</h2>
      </div>
      
      {watermarks.length === 0 ? (
        <p className="text-aqua-400 text-center py-6 text-sm">Sin marcas de agua. Crea una para comenzar.</p>
      ) : (
        <div className="space-y-2">
          {watermarks.map((watermark, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                selectedWatermarkIndex === index
                  ? 'bg-gradient-to-r from-aqua-50 to-blue-50 border-aqua-500 shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-aqua-300 hover:bg-aqua-50'
              }`}
              onClick={() => onSelectWatermark(index)}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-aqua-900 text-sm sm:text-base">
                    {watermark.type === 'text' ? '✏️ Texto' : '🖼️ Logo'}
                  </p>
                  {watermark.type === 'text' && (
                    <p className="text-sm text-gray-600 truncate mt-1">{watermark.text || '(vacío)'}</p>
                  )}
                </div>
                
                {selectedWatermarkIndex === index && (
                  <Check className="w-5 h-5 text-aqua-600 flex-shrink-0" />
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteWatermark(index)
                  }}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4 text-red-500 hover:scale-110" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
