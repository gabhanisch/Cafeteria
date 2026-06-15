import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Dados from './pages/Dados'
import Login from './pages/Login'
import Cart from './pages/Cart'

export default function App() {
  return (
    <div className="bg-roast min-h-screen text-white">
      <Header />
      <Sidebar />
      <main className="ml-0 lg:ml-[200px] pt-[60px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dados" element={<Dados />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  )
}