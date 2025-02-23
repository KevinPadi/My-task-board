import { useTaskContext } from "../context/TaskContext"
import EditTaskDrawer from "./EditTaskDrawer"
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TasksList = () => {
  const [parent] = useAutoAnimate()

  const { tasks } = useTaskContext()

  return (
    <ul ref={parent} className="flex flex-col gap-4">
      {
        tasks.map((task) => (
          <EditTaskDrawer key={task._id} task={task} />
        ))
      }
  </ul>
  )
}

export default TasksList