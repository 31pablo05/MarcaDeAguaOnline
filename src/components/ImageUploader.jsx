import { Upload, CheckCircle } from 'lucide-react'

export default function ImageUploader({ onImageUpload, hasImage }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">📁</span>
        <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Cargar Imagen Base</h2>
      </div>
      
      <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-aqua-300 rounded-lg p-8 cursor-pointer hover:bg-gradient-to-b hover:from-aqua-50 hover:to-white transition-all duration-300 group">
        <div className="flex flex-col items-center justify-center w-full">
          <Upload className="w-10 h-10 text-aqua-400 mb-2 group-hover:text-aqua-600 group-hover:scale-110 transition-transform" />
          <span className="text-sm sm:text-base font-semibold text-aqua-900">Clic para subir o arrastra aquí</span>
          <span className="text-xs sm:text-sm text-aqua-500 mt-1">PNG, JPG, GIF (máx. 10MB)</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="hidden"
        />
      </label>
      
      {hasImage && (
        <div className="flex items-center gap-2 mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-700">Imagen cargada correctamente</span>
        </div>
      )}
    </div>
  )
}
