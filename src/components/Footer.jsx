export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative bg-gradient-to-b from-aqua-900 via-aqua-950 to-blue-950 text-white mt-16 border-t-4 border-aqua-400 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-aqua-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Branding con Logo SVG */}
          <div className="group">
            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white bg-opacity-5 backdrop-blur-sm group-hover:bg-opacity-10 transition-all duration-300 w-fit">
              <img 
                src="/logo/logo2.svg" 
                alt="MarcaDeAgua Logo" 
                className="w-12 h-12 rounded-lg drop-shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-slow"
              />
              <h3 className="text-2xl font-black bg-gradient-to-r from-aqua-300 to-blue-300 bg-clip-text text-transparent">
                Marca de Agua
              </h3>
            </div>
            <p className="text-aqua-100 text-sm leading-relaxed pl-4 border-l-3 border-aqua-500 group-hover:border-aqua-300 transition-colors duration-300">
              La forma más fácil de proteger y personalizar tus imágenes con marcas de agua profesionales. Sin registro, 100% seguro en tu navegador.
            </p>
          </div>

          {/* Características */}
          <div className="group">
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="text-aqua-400 text-xl">⚡</span>
              Características
              <span className="inline-block w-2 h-2 rounded-full bg-aqua-400 group-hover:animate-glow"></span>
            </h4>
            <ul className="text-aqua-100 text-sm space-y-3">
              <li className="flex items-center gap-2 hover:text-aqua-200 transition-colors duration-300 group-hover:translate-x-1 duration-300">
                <span className="text-aqua-400 font-bold">✓</span> Múltiples marcas por imagen
              </li>
              <li className="flex items-center gap-2 hover:text-aqua-200 transition-colors duration-300 group-hover:translate-x-1 duration-300">
                <span className="text-aqua-400 font-bold">✓</span> Texto y logos personalizables
              </li>
              <li className="flex items-center gap-2 hover:text-aqua-200 transition-colors duration-300 group-hover:translate-x-1 duration-300">
                <span className="text-aqua-400 font-bold">✓</span> Filtros de imagen avanzados
              </li>
              <li className="flex items-center gap-2 hover:text-aqua-200 transition-colors duration-300 group-hover:translate-x-1 duration-300">
                <span className="text-aqua-400 font-bold">✓</span> Presets para guardar configuraciones
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="group">
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <span className="text-aqua-400 text-xl">📞</span>
              Contacto
              <span className="inline-block w-2 h-2 rounded-full bg-aqua-400 group-hover:animate-glow"></span>
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                <span className="text-aqua-400 text-lg flex-shrink-0">📧</span>
                <a 
                  href="mailto:pabloproboste64@gmail.com"
                  className="text-aqua-100 hover:text-aqua-200 transition-colors duration-300 break-all"
                >
                  pabloproboste64@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                <span className="text-aqua-400 text-lg flex-shrink-0">💬</span>
                <a 
                  href="https://wa.me/542804389134"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-aqua-100 hover:text-aqua-200 transition-colors duration-300 flex items-center gap-1"
                >
                  +54 280 438-9134
                  <span className="text-xs text-aqua-400">↗</span>
                </a>
              </div>
              <div className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                <span className="text-aqua-400 text-lg flex-shrink-0">📍</span>
                <div className="text-aqua-100">
                  <p>Trelew, Chubut</p>
                  <p>Argentina</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider con efecto */}
        <div className="relative h-px my-12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aqua-500 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aqua-400 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-500 blur-sm"></div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-aqua-100 text-sm space-y-4">
          <div className="flex items-center justify-center gap-2 text-base mb-6">
            <span className="animate-bounce-slow">✨</span>
            <p>
              Hecho con <span className="text-red-400 text-lg animate-glow">❤️</span> usando React + Vite + Tailwind CSS
            </p>
            <span className="animate-bounce-slow" style={{animationDelay: '1s'}}>✨</span>
          </div>
          
          <p className="hover:text-aqua-300 transition-colors duration-300">
            Desarrollado por{' '}
            <a
              href="https://github.com/31pablo05"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-aqua-300 hover:text-white transition-all duration-300 underline decoration-aqua-400 hover:decoration-aqua-200 hover:drop-shadow-lg inline-flex items-center gap-2 group"
            >
              <img 
                src="/logo/DevCraft.png" 
                alt="DevCraft Logo" 
                className="w-6 h-6 rounded-md inline-block drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              Pablo Proboste
            </a>
          </p>
          
          <p className="text-aqua-200 font-semibold">
            © {currentYear} MarcaDeAgua Online. Todos los derechos reservados.
          </p>
          
          <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-aqua-800/50">
            <a href="https://github.com/31pablo05" target="_blank" rel="noopener noreferrer" className="text-aqua-400 hover:text-aqua-200 transition-all duration-300 hover:scale-125">
              <span className="text-2xl">🔗</span>
            </a>
            <a href="https://github.com/31pablo05/MarcaDeAguaOnline" target="_blank" rel="noopener noreferrer" className="text-aqua-400 hover:text-aqua-200 transition-all duration-300 hover:scale-125">
              <span className="text-2xl">📦</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
