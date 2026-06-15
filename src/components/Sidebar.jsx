import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', hash: '' },
  { to: '/', label: 'Sobre', hash: 'about' },
  { to: '/', label: 'Menu', hash: 'menu' },
  { to: '/', label: 'Avaliações', hash: 'review' },
  { to: '/', label: 'Endereço', hash: 'address' },
  { to: '/cadastro', label: 'Cadastro', hash: '' },
  { to: '/login', label: 'Login', hash: '' },
  { to: '/dados', label: 'Dados API', hash: '' },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const handleHashLink = (hash) => {
    setOpen(false)
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-[70px] left-4 z-50 bg-espresso border border-white/20 p-2 rounded"
      >
        <div className={`w-6 h-0.5 bg-caramel mb-1.5 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-6 h-0.5 bg-caramel mb-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
        <div className={`w-6 h-0.5 bg-caramel transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-full w-[200px] bg-espresso border-r border-white/20 z-40 pt-[60px]
        flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {navLinks.map(({ to, label, hash }) => (
          hash ? (
            <Link
              key={label}
              to={to}
              onClick={() => handleHashLink(hash)}
              className="text-caramel px-6 py-5 text-[1.6rem] uppercase tracking-wide hover:bg-caramel hover:text-espresso transition-colors border-b border-white/10"
            >
              {label}
            </Link>
          ) : (
            <NavLink
              key={label}
              to={to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-6 py-5 text-[1.6rem] uppercase tracking-wide transition-colors border-b border-white/10
                ${isActive ? 'bg-caramel text-espresso font-bold' : 'text-caramel hover:bg-caramel hover:text-espresso'}`
              }
            >
              {label}
            </NavLink>
          )
        ))}
      </aside>
    </>
  )
}