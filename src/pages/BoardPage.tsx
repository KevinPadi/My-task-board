import { CircleCheckBig, CircleFadingArrowUp, CirclePlus, CircleX } from "lucide-react"
import Header from "../components/Header"
import { useState } from "react"
import { Drawer } from 'vaul'

function AddNewTaskDrawer() {
  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger className="w-full rounded-2xl bg-yellow-100/80 p-4 mt-4 hover:cursor-pointer hover:bg-yellow-200 transition-colors ease-in-out duration-300">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-yellow-500 p-2 text-lg text-white">
              <CirclePlus />
            </div>
            <span className="font-medium text-black"> Add new task </span>
          </div>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-2xl flex ml-2"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
        >
          <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
            <div>
              <Drawer.Title className="font-medium mb-2 text-zinc-900 text-xl"> Add new task </Drawer.Title>
            </div>
            <form action="" className="w-full mt-6 space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm text-neutral-400"> Task name </label>
                <input name="name" id="name" type="text" className="border rounded-lg p-3 border-neutral-400 focus:outline-orange-500 focus:border-orange-500" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm text-neutral-400"> Description </label>
                <textarea name="description" id=""  className="border rounded-lg p-3 border-neutral-400 focus:outline-orange-500 focus:border-orange-500 placeholder:text-neutral-400" placeholder="Enter a short description"></textarea>
              </div>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
 


const BoardPage = () => {

  interface Task {
    name: string,
    description?: string,
    icon?: string,
    status: undefined | 'inProgress' | 'completed' | "won't do"

  }

  const sampleData: Task[] = [
    {
      name: 'Task in Progress',
      description: undefined,
      icon: '😃',
      status: "inProgress"
    },
    {
      name: 'Task Completed',
      description: undefined,
      icon: '😃',
      status: "completed"
    },
    {
      name: "Task Won't do",
      description: undefined,
      icon: '😃',
      status: "won't do"
    },
    {
      name: 'Task to Do',
      description: 'Work on a challenge in devchallengee',
      icon: '😃',
      status: undefined
    },
  ]

  const [ tasks, setTasks ] = useState<Task[]>(sampleData)

  return (
    <section>
      <Header />
      <div className="mt-20 max-w-2xl mx-auto p-4">
        <ul className="flex flex-col gap-4">
          {
            tasks.map((task, index) => (
              <li 
                key={index} 
                className={`w-full rounded-2xl p-4 text-xl 
                  ${task.status === 'inProgress' ? 'bg-yellow-300/75' :
                    task.status === 'completed' ? 'bg-green-300/75' : 
                    task.status === "won't do" ? 'bg-red-300/75' :
                    'bg-neutral-300/75'
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
                        task.status === "won't do" ? 'bg-red-500' :
                        'bg-transparent'
                      }`}
                  >
                    {
                      task.status === 'inProgress' ? <CircleFadingArrowUp /> :
                      task.status === 'completed' ? <CircleCheckBig /> : 
                      task.status === "won't do" ? <CircleX /> :
                      undefined
                    }
                  </div>
                </div>
                {
                  task.description && (
                    <p className="pl-15 text-base pr-10 text-balance"> {task.description} </p>
                  )
                }
              </li>
            ))
          }

        </ul>

        <AddNewTaskDrawer />
      </div>
    </section>
  )
}

export default BoardPage