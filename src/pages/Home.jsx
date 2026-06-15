import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuCard from '../components/MenuCard'
import ReviewCard from '../components/ReviewCard'
import Footer from '../components/Footer'

// Imagens (caminhos absolutos dentro da pasta public/)
const IMG = {
  home: 'dist/img/home-img.jpg',
  about: 'dist/img/about-img.jpg',
  menu: [
    'dist/img/menu-1.png', 'dist/img/menu-2.png', 'dist/img/menu-3.png',
    'dist/img/menu-4.png', 'dist/img/menu-5.png', 'dist/img/menu-6.png',
  ],
  pics: ['dist/img/pic-1.png', 'dist/img/pic-2.png', 'dist/img/pic-3.png'],
}

const menuItems = [
  { name: 'Café Coado', price: 'R$ 9,00', originalPrice: 'R$ 15,99' },
  { name: 'Expresso', price: 'R$ 5,00', originalPrice: 'R$ 15,99' },
  { name: 'Cappuccino', price: 'R$ 9,00', originalPrice: 'R$ 15,99' },
  { name: 'Latte Art', price: 'R$ 19,00', originalPrice: 'R$ 25,99' },
  { name: 'Mocha', price: 'R$ 6,00', originalPrice: 'R$ 10,99' },
  { name: 'Flat White', price: 'R$ 5,00', originalPrice: 'R$ 15,99' },
]

const reviews = [
  {
    name: 'João',
    quote: 'O melhor café que já tomei na vida! O ambiente é incrível, o atendimento é impecável e o sabor é simplesmente perfeito. Recomendo a todos!',
    stars: 4,
    halfStar: true,
    photo: IMG.pics[0],
  },
  {
    name: 'Maria',
    quote: 'Sou cliente fiel há mais de dois anos. Cada visita é uma experiência única. O cappuccino deles é de outro nível, cremoso e aromático!',
    stars: 5,
    halfStar: false,
    photo: IMG.pics[1],
  },
  {
    name: 'Luís',
    quote: 'Ambiente aconchegante, Wi-Fi rápido e um café espetacular. O lugar perfeito para trabalhar ou simplesmente relaxar com um bom livro.',
    stars: 4,
    halfStar: true,
    photo: IMG.pics[2],
  },
]

const produtos = [
  { produto: 'Café Tradicional', preco: 'R$ 9,00', estoque: 15 },
  { produto: 'Cappuccino', preco: 'R$ 12,00', estoque: 10 },
  { produto: 'Expresso', preco: 'R$ 7,00', estoque: 20 },
  { produto: 'Latte', preco: 'R$ 11,00', estoque: 8 },
  { produto: 'Mocha', preco: 'R$ 13,00', estoque: 5 },
]

export default function Home() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      {/* HERO */}
      <div
        id="home"
        className="min-h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${IMG.home})` }}
      >
        <div className="max-w-[1200px] mx-auto px-8 py-12 w-full">
          <div
            className={`max-w-[60rem] transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-white text-[5rem] lg:text-[6rem] font-extrabold uppercase leading-tight drop-shadow-2xl">
              Code com o <span className="text-caramel">Melhor Café</span> da Região
            </h1>
            <p className="text-white text-[2rem] font-light leading-relaxed py-4 drop-shadow-lg">
              Grãos selecionados, torrados com cuidado e servidos com paixão.
              Cada xícara conta uma história que só o seu paladar pode terminar.
            </p>
            <button onClick={() => scrollTo('menu')} className="btn-caramel mt-4">
              Ver Menu Completo
            </button>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="max-w-[1200px] mx-auto px-8 py-16">
        <h2 className="section-title">
          Sobre <span>Nós</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-6 bg-espresso">
          <div className="md:w-1/2 overflow-hidden">
            <img
              src={IMG.about}
              alt="Sobre Nós"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center gap-4">
            <h3 className="text-white text-[3rem] font-bold uppercase">
              O que faz nosso café <span className="text-caramel">especial</span>
            </h3>
            <p className="text-white/80 text-[1.6rem] leading-relaxed">
              Trabalhamos com produtores locais das montanhas do Sul do Brasil,
              selecionando apenas os grãos mais nobres de cada colheita. Nosso
              processo de torra é artesanal e realçamos os aromas naturais de
              cada origem.
            </p>
            <p className="text-white/80 text-[1.6rem] leading-relaxed">
              Mais do que um café, somos um espaço de conexão. Aqui o tempo
              desacelera, as conversas fluem e cada detalhe é pensado para
              oferecer a você a melhor experiência sensorial possível.
            </p>
            <button onClick={() => scrollTo('menu')} className="btn-caramel self-start mt-2">
              Saiba Mais
            </button>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="max-w-[1200px] mx-auto px-8 py-16">
        <h2 className="section-title">
          Nosso <span>Menu</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, i) => (
            <MenuCard
              key={i}
              imgSrc={IMG.menu[i]}
              name={item.name}
              price={item.price}
              originalPrice={item.originalPrice}
              alt={`menu-${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="review" className="max-w-[1200px] mx-auto px-8 py-16">
        <h2 className="section-title">
          Nossos <span>Clientes</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      </section>

      {/* ADDRESS */}
      <section id="address" className="max-w-[1200px] mx-auto px-8 py-16 flex flex-col items-center">
        <h2 className="section-title">
          Nosso <span>Endereço</span>
        </h2>
        <div className="w-full border border-white/20 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28896.401093940196!2d-50.16196527291069!3d-25.133995765586224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e811c40ae48979%3A0x4e85ab5c7297ead5!2sCuradoria%20Coffee%20Closet!5e0!3m2!1spt-BR!2sbr!4v1770921237999!5m2!1spt-BR!2sbr"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização Cafena"
          />
        </div>
      </section>

      {/* TABLE */}
      <section id="tabela" className="max-w-[1200px] mx-auto px-8 py-16">
        <h2 className="section-title">
          Tabela <span>de Produtos</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[1.6rem]">
            <thead>
              <tr>
                {['Produto', 'Preço', 'Estoque'].map((h) => (
                  <th
                    key={h}
                    className="bg-caramel text-espresso font-bold px-6 py-4 text-center uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {produtos.map((p, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/10 hover:bg-caramel/10 transition-colors ${
                    i % 2 === 0 ? 'bg-espresso/50' : ''
                  }`}
                >
                  <td className="px-6 py-4 text-white text-center">{p.produto}</td>
                  <td className="px-6 py-4 text-caramel text-center font-semibold">{p.preco}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded text-[1.3rem] font-bold ${
                        p.estoque > 10
                          ? 'bg-green-900/60 text-green-300'
                          : p.estoque > 5
                          ? 'bg-yellow-900/60 text-yellow-300'
                          : 'bg-red-900/60 text-red-300'
                      }`}
                    >
                      {p.estoque} unid.
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contato" className="max-w-[1200px] mx-auto px-8 py-16">
        <h2 className="section-title">
          Entre <span>em Contato</span>
        </h2>
        <ContactForm />
      </section>

      <Footer />
    </div>
  )
}

/* ── Inline Contact Form ── */
function ContactForm() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Nome é obrigatório'
    if (!form.email.trim()) e.email = 'E-mail é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    if (!form.mensagem.trim()) e.mensagem = 'Mensagem é obrigatória'
    else if (form.mensagem.trim().length < 10) e.mensagem = 'Mínimo 10 caracteres'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    sessionStorage.setItem('cafena_contact', JSON.stringify({ ...form, ts: new Date().toISOString() }))
    setSent(true)
    setForm({ nome: '', email: '', mensagem: '' })
    setErrors({})
  }

  if (sent) {
    return (
      <div className="max-w-[500px] mx-auto text-center py-16">
        <div className="text-caramel text-[6rem] mb-4">✓</div>
        <h3 className="text-white text-[2.5rem] font-bold mb-2">Mensagem enviada!</h3>
        <p className="text-white/60 text-[1.6rem]">Entraremos em contato em breve.</p>
        <button onClick={() => setSent(false)} className="btn-caramel mt-6">
          Enviar outra
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-[500px] mx-auto flex flex-col gap-5">
      {[
        { key: 'nome', label: 'Seu nome', type: 'text' },
        { key: 'email', label: 'Seu e-mail', type: 'email' },
      ].map(({ key, label, type }) => (
        <div key={key} className="flex flex-col gap-1">
          <input
            type={type}
            placeholder={label}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            onFocus={() => setErrors({ ...errors, [key]: '' })}
            className={`bg-espresso border px-4 py-3 text-[1.6rem] text-white placeholder-white/40
              focus:outline-none focus:border-caramel transition-colors
              ${errors[key] ? 'border-red-500' : 'border-white/20'}`}
          />
          {errors[key] && <span className="text-red-400 text-[1.3rem]">{errors[key]}</span>}
        </div>
      ))}
      <div className="flex flex-col gap-1">
        <textarea
          placeholder="Sua mensagem"
          rows={5}
          value={form.mensagem}
          onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
          onFocus={() => setErrors({ ...errors, mensagem: '' })}
          className={`bg-espresso border px-4 py-3 text-[1.6rem] text-white placeholder-white/40
            focus:outline-none focus:border-caramel transition-colors resize-none
            ${errors.mensagem ? 'border-red-500' : 'border-white/20'}`}
        />
        {errors.mensagem && <span className="text-red-400 text-[1.3rem]">{errors.mensagem}</span>}
      </div>
      <button onClick={handleSubmit} className="btn-caramel self-start">
        Enviar Mensagem
      </button>
    </div>
  )
}