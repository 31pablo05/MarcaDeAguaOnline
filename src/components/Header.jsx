export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-aqua-900 via-aqua-500 to-blue-400 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <div className="text-4xl sm:text-5xl">💧</div>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">Generador de Marcas</h1>
            <p className="text-aqua-100 text-sm sm:text-base font-medium mt-1">
              Crea profesionales marcas de agua para tus imágenes
            </p>
          </div>
        </div>
      </div>
      
      {/* Línea decorativa */}
      <div className="h-1 bg-gradient-to-r from-transparent via-aqua-100 to-transparent"></div>
    </header>
  )
}
