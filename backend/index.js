// Import dependencies
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import protectedRoute from './routes/protectedRoute.js'
import taskRoutes from './routes/taskRoutes.js'

// Initialize dotenv
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true
}))

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB connected successfully!')
  } catch (err) {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  }
}
connectDB()

// Routes
app.use('/api/auth', authRoutes) // rutas de autenticación
app.use('/api', protectedRoute) // ruta protegida
app.use('/api', taskRoutes) // rutas de las tasks


// Example route
app.get('/', (req, res) => {
  res.send('MERN Stack Application with ES6 Syntax')
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
