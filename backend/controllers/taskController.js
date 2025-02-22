import { Task } from "../models/TaskModel.js";
import { taskUpdateSchema } from "../validations/taskValidation.js";

// 🟢 GET: Obtener todas las tareas del usuario autenticado
export const getTasks = async (req, res) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving tasks" });
  }
};

// 🟢 POST: Crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const userId = req.user;
    const taskData = { 
      userId, 
      name: "New Task", 
      description: "", 
      icon: "🔥", 
      status: null 
    };

    const task = new Task(taskData);
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// 🟡 PATCH: Editar una tarea (valores opcionales)
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user;

    const validation = taskUpdateSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
};

// 🔴 DELETE: Eliminar una tarea
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user;

    const task = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
};
