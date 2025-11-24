export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-aqua-900 via-aqua-500 to-blue-400 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-5">
          {/* Logo with animation */}
          <div className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300 active:scale-95">
            <img 
              src="/logo/logo2.svg" 
              alt="MarcaDeAgua Online Logo" 
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-3xl object-cover drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300 animate-bounce-slow bg-white bg-opacity-10 p-2 sm:p-2.5 md:p-3"
            />
          </div>
          
          {/* Contenido del Header */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white leading-tight drop-shadow-lg">
              Generador de Marcas de Agua Online
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-aqua-50 font-semibold mt-2 sm:mt-3 drop-shadow-md">
              🔒 Protegé tus imágenes en segundos, sin complicarte.
            </p>
            
            {/* Badge de características */}
            <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
              <span className="inline-block px-2 sm:px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-opacity-30 transition-all duration-300 cursor-default">
                ⚡ Rápido
              </span>
              <span className="inline-block px-2 sm:px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-opacity-30 transition-all duration-300 cursor-default">
                🔐 Seguro
              </span>
              <span className="hidden sm:inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-opacity-30 transition-all duration-300 cursor-default">
                ✨ Profesional
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Línea decorativa animada */}
      <div className="h-1 bg-gradient-to-r from-transparent via-aqua-100 to-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-50 transition-opacity duration-500 animate-pulse-slow"></div>
      </div>
    </header>
  )
}
