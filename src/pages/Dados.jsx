import { useState, useEffect } from 'react'

const ENDPOINTS = {
  posts: 'https://jsonplaceholder.typicode.com/posts?_limit=12',
  users: 'https://jsonplaceholder.typicode.com/users',
  photos: 'https://jsonplaceholder.typicode.com/photos?_limit=12',
}

export default function Dados() {
  const [tab, setTab] = useState('posts')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const PER_PAGE = 6

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setData([])
    setPage(1)

    fetch(ENDPOINTS[tab])
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((json) => { if (!cancelled) setData(json) })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [tab])

  // ✅ CORREÇÃO AQUI: Usamos (item.propriedade || '').toLowerCase() para evitar undefined
  const filtered = data.filter((item) => {
    const q = search.toLowerCase()
    if (tab === 'posts') {
      return (item.title || '').toLowerCase().includes(q) || (item.body || '').toLowerCase().includes(q)
    }
    if (tab === 'users') {
      return (item.name || '').toLowerCase().includes(q) || (item.email || '').toLowerCase().includes(q)
    }
    if (tab === 'photos') {
      return (item.title || '').toLowerCase().includes(q)
    }
    return true
  })

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-16 min-h-screen">
      <h2 className="section-title">
        Dados <span>da API</span>
      </h2>
      <p className="text-white/50 text-[1.5rem] text-center mb-10">
        Dados públicos via{' '}
        <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer" className="text-caramel underline hover:text-caramel-light">
          JSONPlaceholder
        </a>
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
        {Object.keys(ENDPOINTS).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); setSearch('') }}
            className={`px-6 py-2 text-[1.6rem] uppercase tracking-wider transition-all
              ${tab === key
                ? 'bg-caramel text-espresso font-bold'
                : 'text-white/60 border border-white/20 hover:border-caramel/60 hover:text-white'
              }`}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder={`Buscar ${tab}...`}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="w-full max-w-[400px] bg-espresso border border-white/20 px-4 py-3
            text-[1.6rem] text-white placeholder-white/30 focus:outline-none focus:border-caramel transition-colors"
        />
        {search && (
          <span className="text-white/40 text-[1.4rem] ml-4">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Status */}
      {loading && (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-10 h-10 border-2 border-caramel border-t-transparent rounded-full animate-spin" />
          <p className="text-white/50 text-[1.6rem]">Carregando dados da API...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-500/40 px-6 py-4 text-red-300 text-[1.6rem]">
          Erro ao carregar dados: {error}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {tab === 'posts' && <PostsGrid items={paginated} />}
          {tab === 'users' && <UsersGrid items={paginated} />}
          {tab === 'photos' && <PhotosGrid items={paginated} />}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-white/20 text-white/60 text-[1.5rem]
                  hover:border-caramel hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Anterior
              </button>
              <span className="text-white/60 text-[1.5rem]">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border border-white/20 text-white/60 text-[1.5rem]
                  hover:border-caramel hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function PostsGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((post) => (
        <div key={post.id} className="bg-espresso border border-white/10 p-6 flex flex-col gap-3
          hover:border-caramel/40 transition-all duration-300 hover:-translate-y-1 group">
          <span className="text-caramel/60 text-[1.2rem] uppercase tracking-widest">
            Post #{post.id} · Usuário {post.userId}
          </span>
          <h3 className="text-white text-[1.7rem] font-semibold capitalize leading-snug group-hover:text-caramel transition-colors">
            {post.title}
          </h3>
          <p className="text-white/50 text-[1.4rem] leading-relaxed capitalize line-clamp-3">
            {post.body}
          </p>
        </div>
      ))}
    </div>
  )
}

function UsersGrid({ items }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((user) => (
        <div key={user.id} className="bg-espresso border border-white/10 p-6 flex gap-5
          hover:border-caramel/40 transition-all duration-300">
          <div className="w-[60px] h-[60px] rounded-full bg-caramel/20 border border-caramel/40
            flex items-center justify-center text-caramel text-[2rem] font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h3 className="text-white text-[1.8rem] font-bold">{user.name}</h3>
            <p className="text-caramel text-[1.4rem]">{user.email}</p>
            <p className="text-white/50 text-[1.3rem]">📍 {user.address?.city || 'N/A'}</p>
            <p className="text-white/50 text-[1.3rem]">🏢 {user.company?.name || 'N/A'}</p>
            <p className="text-white/40 text-[1.3rem]">🌐 {user.website || 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function PhotosGrid({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((photo) => (
        <div key={photo.id} className="group overflow-hidden border border-white/10 hover:border-caramel/40 transition-all">
          <div className="relative overflow-hidden aspect-square">
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-3">
            <p className="text-white/60 text-[1.2rem] capitalize line-clamp-2 leading-snug">
              {photo.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}