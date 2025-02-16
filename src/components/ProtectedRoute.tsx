import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LoaderCircle } from "lucide-react"

const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoaderCircle className="animate-spin size-10" />
      </div>
    )
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
