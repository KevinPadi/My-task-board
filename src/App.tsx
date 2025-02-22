import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage"
import { AuthProvider } from "./context/AuthContext";
import { Flip, ToastContainer } from "react-toastify";
import BoardPage from "./pages/BoardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { TaskProvider } from "./context/TaskContext"

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
              <Route path="/b" element={<ProtectedRoute />} />

            {/* Ruta protegida */}
            <Route element={<ProtectedRoute />}>
              <Route path="/board" element={<BoardPage />} />
            </Route>
          </Routes>
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
            />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
