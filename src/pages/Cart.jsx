import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-8 py-16 min-h-screen text-center">
        <h2 className="section-title">
          Seu <span>Carrinho</span>
        </h2>
        <p className="text-white/60 text-[2rem] py-16">🛒 Seu carrinho está vazio.</p>
        <Link to="/" className="btn-caramel">Voltar às compras</Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16 min-h-screen">
      <h2 className="section-title">
        Seu <span>Carrinho</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[1.6rem]">
          <thead>
            <tr>
              <th className="bg-caramel text-espresso font-bold px-4 py-3 text-left">Produto</th>
              <th className="bg-caramel text-espresso font-bold px-4 py-3 text-center">Preço</th>
              <th className="bg-caramel text-espresso font-bold px-4 py-3 text-center">Quantidade</th>
              <th className="bg-caramel text-espresso font-bold px-4 py-3 text-center">Total</th>
              <th className="bg-caramel text-espresso font-bold px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'))
              const total = price * item.quantity
              return (
                <tr key={item.name} className="border-b border-white/10">
                  <td className="px-4 py-3 text-white">{item.name}</td>
                  <td className="px-4 py-3 text-caramel text-center">{item.price}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        className="w-8 h-8 bg-espresso border border-white/20 text-white hover:bg-caramel transition-colors"
                      >
                        −
                      </button>
                      <span className="text-white text-[1.6rem] w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        className="w-8 h-8 bg-espresso border border-white/20 text-white hover:bg-caramel transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-caramel text-center font-bold">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => removeFromCart(item.name)}
                      className="text-red-400 hover:text-red-300 text-[2rem]"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-8 bg-espresso p-6 border border-white/10">
        <div>
          <p className="text-white/60 text-[1.4rem]">Total de itens: <span className="text-white font-bold">{totalItems}</span></p>
          <p className="text-white text-[2rem] font-bold">
            Total: <span className="text-caramel">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
          </p>
        </div>
        <div className="flex gap-4">
          <button onClick={clearCart} className="px-6 py-3 text-white/60 border border-white/20 hover:text-white hover:border-white transition-colors">
            Limpar
          </button>
          <button className="btn-caramel">Finalizar compra</button>
        </div>
      </div>
    </div>
  )
}