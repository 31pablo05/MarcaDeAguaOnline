export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gradient-to-r from-aqua-900 via-aqua-800 to-blue-900 text-white mt-12 border-t-4 border-aqua-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">💧</span>
              <h3 className="text-xl font-bold">Marca de Agua</h3>
            </div>
            <p className="text-aqua-100 text-sm leading-relaxed">
              La forma más fácil de proteger y personalizar tus imágenes con marcas de agua profesionales.
            </p>
          </div>

          {/* Características */}
          <div>
            <h4 className="font-bold text-lg mb-4">Características</h4>
            <ul className="text-aqua-100 text-sm space-y-2">
              <li>✓ Múltiples marcas por imagen</li>
              <li>✓ Texto y logos personalizables</li>
              <li>✓ Filtros de imagen avanzados</li>
              <li>✓ Presets para guardar configuraciones</li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">100% Seguro</h4>
            <p className="text-aqua-100 text-sm mb-4">
              Todo se procesa en tu navegador. Tus imágenes nunca se cargan a servidor alguno.
            </p>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-aqua-600 rounded-full text-xs font-semibold">React</div>
              <div className="px-3 py-1 bg-aqua-600 rounded-full text-xs font-semibold">Vite</div>
              <div className="px-3 py-1 bg-aqua-600 rounded-full text-xs font-semibold">Canvas</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-aqua-700 my-8"></div>

        {/* Footer Bottom */}
        <div className="text-center text-aqua-100 text-sm space-y-3">
          <p>
            Hecho con <span className="text-red-400">❤️</span> usando React + Vite + Tailwind CSS
          </p>
          <p>
            Desarrollado por{' '}
            <a
              href="https://devcraftpablo.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-aqua-300 hover:text-aqua-100 transition-colors duration-300 underline decoration-aqua-400 hover:decoration-aqua-200"
            >
              Pablo Proboste
            </a>
          </p>
          <p>
            © {currentYear} Generador de Marcas de Agua. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
