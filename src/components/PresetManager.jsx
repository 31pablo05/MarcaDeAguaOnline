import { Download, Save, Trash2 } from 'lucide-react'

export default function PresetManager({ presets, onLoadPreset, onSavePreset, onDeletePreset, currentConfig, presetName, onPresetNameChange }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">💾</span>
        <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Presets Guardados</h2>
      </div>

      {/* Guardar preset */}
      <div className="space-y-3 mb-6 pb-6 border-b-2 border-aqua-100">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-aqua-900">Nombre del preset</label>
          <input
            type="text"
            value={presetName}
            onChange={(e) => onPresetNameChange(e.target.value)}
            placeholder="Mi marca personalizada..."
            className="w-full px-4 py-2 border-2 border-aqua-200 rounded-lg focus:outline-none focus:border-aqua-500 focus:ring-2 focus:ring-aqua-200 transition text-sm"
          />
        </div>
        <button
          onClick={onSavePreset}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-aqua-500 to-aqua-600 hover:from-aqua-600 hover:to-aqua-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          Guardar Configuración
        </button>
      </div>

      {/* Presets guardados */}
      {presets.length === 0 ? (
        <p className="text-aqua-400 text-center py-6 text-sm">Sin presets guardados aún</p>
      ) : (
        <div className="space-y-2">
          {presets.map((preset) => (
            <div key={preset.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-aqua-50 border border-gray-200 hover:border-aqua-300 transition-all duration-200">
              <button
                onClick={() => onLoadPreset(preset)}
                className="flex-1 px-3 py-2 text-left bg-white hover:bg-aqua-100 text-aqua-900 rounded-lg transition text-sm font-semibold truncate border border-aqua-200 hover:border-aqua-400"
              >
                <span className="inline-block mr-2">📌</span>
                {preset.name}
              </button>
              <button
                onClick={() => onDeletePreset(preset.id)}
                className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-4 h-4 text-red-500 hover:scale-110" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
