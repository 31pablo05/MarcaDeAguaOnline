import { Type, ImagePlus } from 'lucide-react'

export default function WatermarkTypeSelector({ watermarkType, onTypeChange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🎨</span>
        <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Tipo de Marca</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onTypeChange('text')}
          className={`flex flex-col items-center justify-center gap-2 py-4 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            watermarkType === 'text'
              ? 'bg-gradient-to-br from-aqua-500 to-aqua-600 text-white shadow-lg scale-105'
              : 'bg-gradient-to-br from-aqua-50 to-aqua-100 text-aqua-900 hover:from-aqua-100 hover:to-aqua-150'
          }`}
        >
          <Type className="w-6 h-6" />
          <span className="text-sm">Texto</span>
        </button>
        
        <button
          onClick={() => onTypeChange('logo')}
          className={`flex flex-col items-center justify-center gap-2 py-4 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            watermarkType === 'logo'
              ? 'bg-gradient-to-br from-aqua-500 to-aqua-600 text-white shadow-lg scale-105'
              : 'bg-gradient-to-br from-aqua-50 to-aqua-100 text-aqua-900 hover:from-aqua-100 hover:to-aqua-150'
          }`}
        >
          <ImagePlus className="w-6 h-6" />
          <span className="text-sm">Logo</span>
        </button>
      </div>
    </div>
  )
}
