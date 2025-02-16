import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

interface User {
  _id: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: AuthData) => Promise<void>
  register: (data: AuthData) => Promise<void>
  logout: () => Promise<void>
}

interface AuthData {
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider")
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkAuth = async () => {
    setLoading(true)
    try {
      const res = await axios.get<User>(`${BACKEND_URL}/api/protected`, { withCredentials: true })
      setUser({ _id: res.data._id })
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: AuthData) => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/login`, data, { withCredentials: true })
      await checkAuth()
      navigate('/board')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error desconocido';
      toast.error(`Error: ${errorMessage}`);
    }
  }

  const register = async (data: AuthData) => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/register`, data, { withCredentials: true })
      await checkAuth()
      navigate('/board')
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Error desconocido';
      toast.error(`Error: ${errorMessage}`);
    }
  }

  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/logout`, {}, { withCredentials: true })
      setUser(null)
    } catch (error: any) {
      toast.error("Error al cerrar sesión");
    }
  }

  // Verifica si el usuario está autenticado al montar la app
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
