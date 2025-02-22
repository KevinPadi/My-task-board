import { useTaskContext } from "../context/TaskContext"
import EditTaskDrawer from "./EditTaskDrawer"

const TasksList = () => {

  const { tasks } = useTaskContext()

  return (
    <ul className="flex flex-col gap-4">
      {
        tasks.map((task) => (
          <EditTaskDrawer key={task._id} task={task} />
        ))
      }
  </ul>
  )
}

export default TasksList