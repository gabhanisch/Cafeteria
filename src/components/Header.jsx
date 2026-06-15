import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-roast border-b border-white/20 h-[60px] flex items-center px-6 justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src="dist/img/logo.png"
          alt="Cafena Logo"
          className="h-[40px] w-auto object-contain"
        />
        <span className="text-caramel font-bold text-[2rem] uppercase tracking-widest group-hover:text-caramel-light transition-colors">
          Cafena
        </span>
      </Link>

      <Link to="/cart" className="relative flex items-center text-white hover:text-caramel transition-colors">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-caramel text-espresso text-[1.2rem] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
    </header>
  )
}