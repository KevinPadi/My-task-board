import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { registerSchema, loginSchema } from '../validations/authValidation.js'
import dotenv from 'dotenv'

export const register = async (req, res) => {
  dotenv.config()

  try {
    const { email, password } = registerSchema.parse(req.body)

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ email, password: hashedPassword })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'None'
    })

    res.status(201).json({ message: 'Usuario registrado y logueado', token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  dotenv.config()
  
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email incorrecto' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'None'
    })

    res.status(200).json({ message: 'Inicio de sesión exitoso', token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  dotenv.config()
  
  res.clearCookie('token', {
    httpOnly: true,
    secure:  process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'None'
  })

  res.status(200).json({ message: 'Logout exitoso' })
}
