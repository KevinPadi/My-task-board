import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export interface Task {
  _id: string;
  name: string;
  description?: string;
  icon: string;
  status?: string | null;
}

interface TaskContextType {
  tasks: Task[];
  getTasks: () => Promise<void>;
  createTask: () => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTask: (taskId: string, updatedData: Partial<Task>) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  // 🟢GET: Obtener todas las tareas
  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/tasks`, { withCredentials: true });
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 🟠POST: Crear una nueva tarea
  const createTask = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/task`, {}, { withCredentials: true });
      setTasks((prev) => [...prev, data])
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // 🔴DELETE: Eliminar una tarea
  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/task/${taskId}`, { withCredentials: true });
      setTasks((prev) => prev.filter((task) => task._id !== taskId))
      toast.success("Task deleted successfully")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  // 🟡PATCH: Actualizar una tarea
  const updateTask = async (taskId: string, updatedData: Partial<Task>) => {
    try {      
      const { data } = await axios.patch(`${BACKEND_URL}/api/task/${taskId}`, updatedData, { withCredentials: true });
  
      setTasks((prev) => prev.map((task) => (task._id === taskId ? data : task)));
  
      toast.success("Task updated successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask, deleteTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
};
