import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function MenuCard({ imgSrc, name, price, originalPrice, alt }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart({ name, price, originalPrice })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group border border-white/20 text-center p-10 cursor-pointer
      hover:bg-white transition-all duration-300 flex flex-col items-center gap-3">
      <img
        src={imgSrc}
        alt={alt}
        className="h-[100px] object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="text-white text-[2rem] font-semibold uppercase tracking-wide group-hover:text-espresso">
        {name}
      </h3>
      <div className="text-white text-[2.2rem] font-bold group-hover:text-espresso">
        {price}
        <span className="text-[1.4rem] line-through font-light ml-3 opacity-60">
          {originalPrice}
        </span>
      </div>
      <button
        onClick={handleAdd}
        className={`px-6 py-2 text-[1.5rem] uppercase tracking-wider font-semibold transition-all duration-300
          ${added
            ? 'bg-green-500 text-white scale-95'
            : 'bg-caramel text-white hover:bg-caramel-dark hover:scale-105'
          }`}
      >
        {added ? '✓ Adicionado!' : 'Adicionar ao carrinho'}
      </button>
    </div>
  )
}