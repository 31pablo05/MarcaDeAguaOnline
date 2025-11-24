export default function AdjustmentControls({
  opacity,
  position,
  brightness,
  contrast,
  saturation,
  grayscale,
  onOpacityChange,
  onPositionChange,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
  onGrayscaleChange,
}) {
  const renderSlider = (label, value, onChange, min, max, unit = '', icon = '') => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-aqua-900 flex items-center gap-2">
          <span>{icon}</span>
          {label}
        </label>
        <span className="text-sm font-bold bg-aqua-100 text-aqua-900 px-3 py-1 rounded-full">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-aqua-200 to-aqua-400 rounded-full appearance-none cursor-pointer accent-aqua-600 hover:from-aqua-300 hover:to-aqua-500 transition"
      />
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Controles de Marca de Agua */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Posición y Opacidad</h2>
        </div>

        <div className="space-y-5">
          {renderSlider('Opacidad', opacity, onOpacityChange, 0, 100, '%', '👁️')}

          {renderSlider('Posición X', Math.round(position.x), (x) => onPositionChange({ ...position, x }), 0, 100, '%', '↔️')}

          {renderSlider('Posición Y', Math.round(position.y), (y) => onPositionChange({ ...position, y }), 0, 100, '%', '↕️')}
        </div>
      </div>

      {/* Filtros de Imagen */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-2xl">🎞️</span>
          <h2 className="text-lg sm:text-xl font-bold text-aqua-900">Filtros de Imagen</h2>
        </div>

        <div className="space-y-5">
          {renderSlider('Brillo', brightness, onBrightnessChange, 50, 150, '%', '☀️')}

          {renderSlider('Contraste', contrast, onContrastChange, 50, 150, '%', '⚡')}

          {renderSlider('Saturación', saturation, onSaturationChange, 0, 200, '%', '🎨')}

          {renderSlider('Escala de Grises', grayscale, onGrayscaleChange, 0, 100, '%', '⬜')}
        </div>
      </div>
    </div>
  )
}
