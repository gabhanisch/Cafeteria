import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cafena_cadastros'

const INITIAL = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  senha: '',
  confirmaSenha: '',
  favorito: '',
}

export default function Cadastro() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [cadastros, setCadastros] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setCadastros(saved)
  }, [])

  const set = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: '' })
  }

  const validate = () => {
    const e = {}
    if (!form.nome.trim()) e.nome = 'Nome obrigatório'
    else if (form.nome.trim().length < 3) e.nome = 'Mínimo 3 caracteres'

    if (!form.email.trim()) e.email = 'E-mail obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'

    if (!form.telefone.trim()) e.telefone = 'Telefone obrigatório'
    else if (!/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(form.telefone.replace(/\s/g, '')))
      e.telefone = 'Formato inválido (ex: 42 99999-9999)'

    if (!form.cidade.trim()) e.cidade = 'Cidade obrigatória'

    if (!form.senha) e.senha = 'Senha obrigatória'
    else if (form.senha.length < 6) e.senha = 'Mínimo 6 caracteres'

    if (!form.confirmaSenha) e.confirmaSenha = 'Confirme sua senha'
    else if (form.senha !== form.confirmaSenha) e.confirmaSenha = 'Senhas não conferem'

    if (!form.favorito) e.favorito = 'Escolha uma opção'

    return e
  }

  const handleSubmit = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }

    const novo = {
      id: Date.now(),
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      cidade: form.cidade,
      favorito: form.favorito,
      data: new Date().toLocaleDateString('pt-BR'),
    }

    const atualizados = [...cadastros, novo]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados))
    setCadastros(atualizados)
    setSubmitted(true)
    setForm(INITIAL)
  }

  const handleDelete = (id) => {
    const atualizados = cadastros.filter((c) => c.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados))
    setCadastros(atualizados)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16 min-h-screen">
      <h2 className="section-title">
        Cadastro <span>de Cliente</span>
      </h2>

      {submitted && (
        <div className="max-w-[600px] mx-auto mb-8 bg-green-900/40 border border-green-500/40 px-6 py-4 flex items-center gap-3">
          <span className="text-green-400 text-[2.5rem]">✓</span>
          <div>
            <p className="text-green-300 text-[1.8rem] font-semibold">Cadastro realizado com sucesso!</p>
            <p className="text-green-400/70 text-[1.4rem]">Seus dados foram salvos localmente.</p>
          </div>
          <button onClick={() => setSubmitted(false)} className="ml-auto text-green-400/60 hover:text-green-400 text-[2rem]">×</button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-espresso p-8 border border-white/10">
          <h3 className="text-caramel text-[2.2rem] font-bold uppercase mb-6">Novo Cadastro</h3>
          <div className="flex flex-col gap-4">
            <Field label="Nome completo" error={errors.nome}>
              <input type="text" placeholder="João da Silva" value={form.nome} onChange={set('nome')} className={inputCls(errors.nome)} />
            </Field>
            <Field label="E-mail" error={errors.email}>
              <input type="email" placeholder="joao@email.com" value={form.email} onChange={set('email')} className={inputCls(errors.email)} />
            </Field>
            <Field label="Telefone" error={errors.telefone}>
              <input type="text" placeholder="(42) 99999-9999" value={form.telefone} onChange={set('telefone')} className={inputCls(errors.telefone)} />
            </Field>
            <Field label="Cidade" error={errors.cidade}>
              <input type="text" placeholder="Ponta Grossa" value={form.cidade} onChange={set('cidade')} className={inputCls(errors.cidade)} />
            </Field>
            <Field label="Café favorito" error={errors.favorito}>
              <select value={form.favorito} onChange={set('favorito')} className={inputCls(errors.favorito)}>
                <option value="">Selecione...</option>
                {['Café Coado', 'Expresso', 'Cappuccino', 'Latte Art', 'Mocha', 'Flat White'].map((op) => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </Field>
            <Field label="Senha" error={errors.senha}>
              <input type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={set('senha')} className={inputCls(errors.senha)} />
            </Field>
            <Field label="Confirmar senha" error={errors.confirmaSenha}>
              <input type="password" placeholder="Repita a senha" value={form.confirmaSenha} onChange={set('confirmaSenha')} className={inputCls(errors.confirmaSenha)} />
            </Field>
            <button onClick={handleSubmit} className="btn-caramel self-start mt-2">
              Cadastrar
            </button>
          </div>
        </div>

        {/* Saved cadastros */}
        <div>
          <h3 className="text-caramel text-[2.2rem] font-bold uppercase mb-6">
            Cadastros Salvos{' '}
            <span className="text-white/50 text-[1.6rem] font-normal">({cadastros.length})</span>
          </h3>
          {cadastros.length === 0 ? (
            <div className="border border-white/10 p-8 text-center text-white/40 text-[1.6rem]">
              Nenhum cadastro ainda.<br />Preencha o formulário ao lado!
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
              {cadastros.map((c) => (
                <div key={c.id} className="bg-espresso border border-white/10 p-5 flex justify-between items-start hover:border-caramel/40 transition-colors">
                  <div>
                    <p className="text-white text-[1.8rem] font-semibold">{c.nome}</p>
                    <p className="text-white/60 text-[1.4rem]">{c.email}</p>
                    <p className="text-white/60 text-[1.4rem]">{c.cidade} · {c.telefone}</p>
                    <p className="text-caramel text-[1.3rem] mt-1">☕ {c.favorito}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-white/30 text-[1.2rem]">{c.data}</span>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="text-red-400/60 hover:text-red-400 text-[2rem] transition-colors"
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cadastros.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Apagar todos os cadastros?')) {
                  localStorage.removeItem(STORAGE_KEY)
                  setCadastros([])
                }
              }}
              className="mt-4 text-red-400/60 hover:text-red-400 text-[1.4rem] underline transition-colors"
            >
              Limpar todos
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const inputCls = (err) =>
  `w-full bg-roast border px-4 py-3 text-[1.6rem] text-white placeholder-white/30
   focus:outline-none focus:border-caramel transition-colors
   ${err ? 'border-red-500' : 'border-white/20'}`

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/70 text-[1.4rem] uppercase tracking-wider">{label}</label>
      {children}
      {error && <span className="text-red-400 text-[1.3rem]">{error}</span>}
    </div>
  )
}
