import { Upload } from 'lucide-react'
import { forwardRef } from 'react'

const CanvasPreview = forwardRef(({ image, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, canvasRef }, ref) => {
  return (
    <div className="lg:col-span-2 order-1 lg:order-2">
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 sticky top-8 hover:shadow-2xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">👁️</span>
          <h2 className="text-lg sm:text-2xl font-bold text-aqua-900">Vista Previa</h2>
        </div>

        {/* Contenedor del Canvas */}
        <div
          ref={ref}
          className="relative bg-gradient-to-b from-gray-100 to-gray-50 rounded-xl overflow-hidden flex items-center justify-center border-2 border-gray-200 hover:border-aqua-300 transition-colors duration-300"
          style={{
            minHeight: '400px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {image ? (
            <>
              <canvas
                ref={canvasRef}
                style={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              
              {/* Badge flotante con instrucciones */}
              <div className="absolute bottom-4 right-4 bg-gradient-to-r from-aqua-600 to-aqua-500 bg-opacity-90 backdrop-blur-sm text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
                <span className="text-lg">✋</span>
                <span className="font-semibold">Arrastra para mover</span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 px-6">
              <Upload className="w-16 h-16 text-aqua-300 mx-auto mb-4" />
              <p className="text-aqua-500 font-bold text-lg mb-2">Carga una imagen para comenzar</p>
              <p className="text-aqua-400 text-sm">PNG, JPG o GIF - Tamaño máximo 10MB</p>
            </div>
          )}
        </div>

        {/* Info de dimensiones */}
        {image && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs sm:text-sm text-blue-700 font-medium">
            <span className="block">📐 Dimensiones: {image.width} × {image.height}px</span>
          </div>
        )}
      </div>
    </div>
  )
})

CanvasPreview.displayName = 'CanvasPreview'

export default CanvasPreview
