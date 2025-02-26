import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, LogOut, UserMinus, AlertTriangle } from 'lucide-react'
import { useAuth } from "../context/AuthContext"
import { useTaskContext } from "../context/TaskContext"

const Avatar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const { logout, deleteUser } = useAuth()
  const { clearTasks } = useTaskContext()

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsConfirmingDelete(false)
    }
  }

  const handleDeleteClick = () => {
    if (isConfirmingDelete) {
      deleteUser()
      setIsOpen(false)
      setIsConfirmingDelete(false)
    } else {
      setIsConfirmingDelete(true)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="size-10 rounded-full flex items-center justify-center hover:bg-neutral-100 hover:shadow-lg hover:cursor-pointer transition-all ease-in-out duration-200"
      >
        <User className="w-6 h-6 text-gray-600" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-1 z-10 border border-neutral-200"
          >
            <button
              onClick={() => {
                logout()
                clearTasks()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center rounded-md hover:cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </button>
            <button
              onClick={handleDeleteClick}
              className={`w-full text-left px-4 py-2 text-sm ${
                isConfirmingDelete ? 'text-yellow-600' : 'text-red-600'
              } hover:bg-gray-100 flex items-center rounded-md hover:cursor-pointer overflow-hidden`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isConfirmingDelete ? 'confirm' : 'delete'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center"
                >
                  {isConfirmingDelete ? (
                    <>
                      <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Are you sure?</span>
                    </>
                  ) : (
                    <>
                      <UserMinus className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Delete Account</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Avatar

