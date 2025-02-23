import { CirclePlus } from "lucide-react"
import { useTaskContext } from "../context/TaskContext"

const AddTaskButton = () => {
  const { createTask } = useTaskContext()

  return (
    <button onClick={() => createTask()} className="active:scale-95 w-full rounded-2xl bg-yellow-100/80 p-4 mt-4 hover:cursor-pointer hover:bg-yellow-200 transition-all ease-in-out duration-300">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-yellow-500 p-2 text-lg text-white">
            <CirclePlus />
          </div>
          <span className="font-medium text-black"> Add new task </span>
        </div>
      </div>
    </button>
  )
}

export default AddTaskButton