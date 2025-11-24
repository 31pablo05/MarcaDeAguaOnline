export default function PositionPresets({ onPositionSelect }) {
  const presets = {
    'topLeft': { x: 5, y: 5, label: 'Superior Izq' },
    'topCenter': { x: 50, y: 5, label: 'Superior Centro' },
    'topRight': { x: 95, y: 5, label: 'Superior Der' },
    'centerLeft': { x: 5, y: 50, label: 'Centro Izq' },
    'center': { x: 50, y: 50, label: 'Centro' },
    'centerRight': { x: 95, y: 50, label: 'Centro Der' },
    'bottomLeft': { x: 5, y: 95, label: 'Inferior Izq' },
    'bottomCenter': { x: 50, y: 95, label: 'Inferior Centro' },
    'bottomRight': { x: 95, y: 95, label: 'Inferior Der' },
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-aqua-900 mb-4">📍 Posiciones Preestablecidas</h2>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(presets).map(([key, { x, y, label }]) => (
          <button
            key={key}
            onClick={() => onPositionSelect({ x, y })}
            className="px-2 py-2 bg-aqua-50 hover:bg-aqua-100 text-aqua-900 rounded-lg text-xs font-medium transition border border-aqua-200"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
