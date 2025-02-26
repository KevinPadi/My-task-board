import express from "express"
import { protect } from "../middlewares/authMiddleware.js"
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js"

const router = express.Router()

router.get("/tasks", protect, getTasks)
router.post("/task", protect, createTask)
router.patch("/task/:taskId", protect, updateTask)
router.delete("/task/:taskId", protect, deleteTask)

export default router
