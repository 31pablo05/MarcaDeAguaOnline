import { Upload } from 'lucide-react'
import { forwardRef } from 'react'

const CanvasPreview = forwardRef(({ image, isDragging, onMouseDown, onMouseMove, onMouseUp, onMouseLeave, canvasRef }, ref) => {
  return (
    <div className="lg:col-span-2 order-1 lg:order-2 w-full">
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 hover:shadow-2xl transition-shadow duration-300 h-fit">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">👁️</span>
          <h2 className="text-lg sm:text-2xl font-bold text-aqua-900">Vista Previa</h2>
        </div>

        {/* Contenedor del Canvas - Más grande y adaptable */}
        <div
          ref={ref}
          className="relative bg-gradient-to-b from-gray-100 to-gray-50 rounded-xl overflow-auto flex items-center justify-center border-2 border-gray-200 hover:border-aqua-300 transition-colors duration-300"
          style={{
            minHeight: 'clamp(300px, 60vh, 800px)',
            cursor: isDragging ? 'grabbing' : 'grab',
            width: '100%',
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {image ? (
            <>
              <div className="flex items-center justify-center w-full h-full p-4 sm:p-6">
                <canvas
                  ref={canvasRef}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    width: 'auto',
                    height: 'auto',
                  }}
                />
              </div>
              
              {/* Badge flotante con instrucciones */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-gradient-to-r from-aqua-600 to-aqua-500 bg-opacity-90 backdrop-blur-sm text-white text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-10">
                <span className="text-lg">✋</span>
                <span className="font-semibold hidden sm:inline">Arrastra para mover</span>
                <span className="font-semibold sm:hidden">Arrastra</span>
              </div>
            </>
          ) : (
            <div className="text-center py-8 sm:py-12 px-4 sm:px-6">
              <Upload className="w-12 sm:w-16 text-aqua-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-aqua-500 font-bold text-base sm:text-lg mb-2">Carga una imagen para comenzar</p>
              <p className="text-aqua-400 text-xs sm:text-sm">PNG, JPG o GIF - Tamaño máximo 10MB</p>
            </div>
          )}
        </div>

        {/* Info de dimensiones */}
        {image && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-xs sm:text-sm text-blue-700 font-medium">
            <span className="block">📐 Dimensiones: {image.width} × {image.height}px</span>
            <span className="block text-blue-600 text-xs mt-1">💡 Ajusta el zoom con la rueda del ratón o pellizca en móvil</span>
          </div>
        )}
      </div>
    </div>
  )
})

CanvasPreview.displayName = 'CanvasPreview'

export default CanvasPreview
