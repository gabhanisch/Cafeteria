import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos')
      return
    }
    if (email === 'admin@cafena.com' && password === '123456') {
      sessionStorage.setItem('cafena_user', JSON.stringify({ email, name: 'Admin' }))
      navigate('/')
    } else {
      setError('E-mail ou senha inválidos')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('cafena_user')
    navigate('/')
  }

  const user = JSON.parse(sessionStorage.getItem('cafena_user'))

  if (user) {
    return (
      <div className="max-w-[1200px] mx-auto px-8 py-16 min-h-screen">
        <h2 className="section-title">
          Minha <span>Conta</span>
        </h2>
        <div className="max-w-[500px] mx-auto bg-espresso p-8 border border-white/10">
          <p className="text-white text-[1.6rem] mb-4">
            Logado como: <span className="text-caramel font-bold">{user.name}</span>
            <br />
            <span className="text-white/50">{user.email}</span>
          </p>
          <button onClick={handleLogout} className="btn-caramel bg-red-500 hover:bg-red-600">
            Sair
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16 min-h-screen">
      <h2 className="section-title">
        Login <span>de Cliente</span>
      </h2>
      <div className="max-w-[500px] mx-auto bg-espresso p-8 border border-white/10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-white/70 text-[1.4rem] uppercase tracking-wider">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-roast border border-white/20 px-4 py-3 text-[1.6rem] text-white placeholder-white/30 focus:outline-none focus:border-caramel transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-white/70 text-[1.4rem] uppercase tracking-wider">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-roast border border-white/20 px-4 py-3 text-[1.6rem] text-white placeholder-white/30 focus:outline-none focus:border-caramel transition-colors"
              placeholder="******"
            />
          </div>
          {error && <span className="text-red-400 text-[1.3rem]">{error}</span>}
          <button type="submit" className="btn-caramel self-start">
            Entrar
          </button>
        </form>
        <p className="text-white/50 text-[1.4rem] mt-4">
          Não tem conta? <a href="/cadastro" className="text-caramel hover:underline">Cadastre-se</a>
        </p>
      </div>
    </div>
  )
}