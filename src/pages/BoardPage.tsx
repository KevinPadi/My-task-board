import { useAuth } from "../context/AuthContext"

const BoardPage = () => {
  const { user } = useAuth()
  return (
    <h1>
      {
        user ? user._id : 'cargando'
      }
    </h1>
  )
}

export default BoardPage