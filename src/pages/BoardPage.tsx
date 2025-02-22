import Header from "../components/Header"
import TasksList from "../components/TasksList"
import AddTaskButton from "../components/AddTaskButton"

const BoardPage = () => {

  return (
    <section>
      <Header />
      <div className="mt-20 max-w-2xl mx-auto p-4">

        {/* task list */}
        <TasksList />

        {/* add new task button */}
        <AddTaskButton />
      </div>
    </section>
  )
}

export default BoardPage