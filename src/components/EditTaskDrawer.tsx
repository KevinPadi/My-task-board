import { useState } from "react"
import { taskSchema, TaskSchema } from "../schemas/taskSchema"
import { Check, CircleCheckBig, CircleFadingArrowUp, CircleX, Loader, Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Drawer } from 'vaul'
import { useTaskContext } from "../context/TaskContext";

function EditTaskDrawer({ task }: { task: TaskSchema }) {
  const [open, setOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false);
  const { updateTask, deleteTask } = useTaskContext()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
  })

  const onSubmit = (data: TaskSchema) => {
    updateTask(task._id ?? "", data)
    setOpen(false)
  }

  const handleDeleteClick = () => {
    if (isConfirming) {
      // Si el usuario ya confirmó, procedemos con la eliminación
      if (task._id) deleteTask(task._id)
      setOpen(false)
    } else {
      // Si no ha confirmado, cambiamos el texto del botón
      setIsConfirming(true);
    }
  }

  const taskEmojis = ["🏋️‍♂️", "📅", "🛠️", "🔥", "🚀", "🧠", "📖", "💡", "🎯", "⏳"]
  const statusOptions = [
    {
      icon: CircleFadingArrowUp,
      label: 'In Progress',
      value: 'inProgress'
    },
    {
      icon: CircleCheckBig,
      label: 'Completed',
      value: 'completed'
    },
    {
      icon: CircleX,
      label: "Won't Do",
      value: "won'tDo"
    },
  ]

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
      <Drawer.Trigger>
      <li 
        className={`w-full rounded-2xl p-4 text-xl hover:cursor-pointer transition-all ease-in-out duration-200 shadow-sm hover:shadow-lg
          ${task.status === 'inProgress' ? 'bg-yellow-300/75 hover:bg-yellow-300' :
            task.status === 'completed' ? 'bg-green-300/75 hover:bg-green-300' : 
            task.status === "won'tDo" ? 'bg-red-300/75 hover:bg-red-300' :
            'bg-neutral-300/75 hover:bg-neutral-300'
          }`
        }
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="rounded-xl bg-white p-2"> {task.icon} </span>
            <span className="font-medium text-black"> {task.name} </span>
          </div>
          <div 
            className={`rounded-xl p-2 text-lg text-white 
              ${task.status === 'inProgress' ? 'bg-yellow-500' :
                task.status === 'completed' ? 'bg-green-500' : 
                task.status === "won'tDo" ? 'bg-red-500' :
                'bg-transparent'
              }`}
          >
            {
              task.status === 'inProgress' ? <CircleFadingArrowUp /> :
              task.status === 'completed' ? <CircleCheckBig /> : 
              task.status === "won'tDo" ? <CircleX /> :
              undefined
            }
          </div>
        </div>
        {
          task.description && (
            <p className="pl-15 text-left text-base pr-10 text-balance"> {task.description} </p>
          )
        }
      </li>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 pb-4 bottom-2 fixed z-10 outline-none max-w-2xl flex ml-2 h-screen"
          style={{ "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties}
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">

            <div className="flex items-center justify-between">
              <Drawer.Title className="font-medium mb-2 text-zinc-900 text-xl">
                Task details
              </Drawer.Title>

              <Drawer.Close className="border border-neutral-300 rounded-lg p-2 hover:bg-neutral-200/60 hover:cursor-pointer transition-colors ease-in-out duration-200">
                <X className="size-4 text-neutral-500" />
              </Drawer.Close>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-6 space-y-6 h-full relative overflow-auto flex flex-col grow">

              {/* Task name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-neutral-400"> Task name </label>
                <input defaultValue={task.name} {...register("name")} id="name" type="text" className="border rounded-lg p-3 border-neutral-400 focus:outline-orange-500 focus:border-orange-500" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm text-neutral-400"> Description </label>
                <textarea defaultValue={task.description} {...register("description")} className="border rounded-lg p-3 border-neutral-400 focus:outline-orange-500 focus:border-orange-500 placeholder:text-neutral-400" placeholder="Enter a short description"></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
              </div>

              {/* Icons */}
              <div className="flex flex-col gap-2">
                <p className="text-sm text-neutral-400"> Icon </p>
                <ul className="flex flex-wrap items-center gap-2">
                  {taskEmojis.map((emoji, index) => (
                    <li key={index}>
                      <input defaultValue={task.icon} defaultChecked={task.icon === emoji} type="radio" {...register("icon")} id={emoji} value={emoji} className="peer hidden" />
                      <label htmlFor={emoji} className="inline-flex w-full cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 text-xl peer-checked:bg-yellow-400 peer-checked:text-gray-600 hover:bg-neutral-300 hover:text-gray-600 peer-checked:hover:bg-yellow-400">
                        <div className="block">{emoji}</div>
                      </label>
                    </li>
                  ))}
                </ul>
                {errors.icon && <p className="text-red-500 text-sm">{errors.icon.message}</p>}
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-neutral-400"> Status </p>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full">
                  {statusOptions.map((option, index) => (
                      <div className="relative" key={index}>
                        <input defaultValue={task.status ?? ""} defaultChecked={task.status === option.value} type="radio" {...register("status")} id={option.label} name="status" value={option.value} className="peer sr-only" />
                        <label htmlFor={option.label} className="flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-1 transition-colors peer-checked:border-blue-600 border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl 
                            ${option.label === 'In Progress' ? 'bg-yellow-600' : 
                              option.label === 'Completed' ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                            {<option.icon className="text-white" />}
                          </div>
                          <span className="flex-grow text-base font-medium"> {option.label} </span>
                        </label>
                        <div className="absolute top-1/2 right-3 hidden size-6 -translate-y-1/2 text-blue-50 text-xs bg-blue-500 peer-checked:flex items-center justify-center rounded-full p-1">
                          <Check className="size-5" strokeWidth={3} />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="p-4 w-full sticky bottom-0 bg-zinc-50  mt-auto">
                <div className="flex gap-6 justify-end">
                  <button type="button" onClick={handleDeleteClick} className="rounded-full bg-neutral-200 hover:bg-neutral-300 px-4 py-1 hover:cursor-pointer transition-colors ease-in-out duration-200 flex items-center gap-2">
                  {
                    isConfirming ? 'Are you sure?' : 'Delete'
                  }

                    <Trash2 className="size-4" />
                  </button>
                  <button type="submit" className="rounded-full bg-blue-500 hover:bg-blue-600 hover:cursor-pointer transition-colors ease-in-out duration-200 text-white text-medium px-4 py-1 flex items-center gap-2">
                    {
                      isSubmitting ? (
                        <Loader className="size-4 animate-spin" />
                      ) : (
                        <>
                          Save
                          <Check className="size-4" />
                        </>
                      )
                    }
                  </button>
                </div>
              </div>

            </form>

          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>

  )
}

export default EditTaskDrawer