import { useState } from "react";
import { useGetTodosQuery } from "../../redux/api/api";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import { TodoFilter } from "./TodoFilter";

export default function TodoContainer() {
  const [priority, setPriority] = useState('');

  const { data, isLoading } = useGetTodosQuery(priority);


  return (
    <div>
      <div className="flex justify-between mb-2">

        <AddTodoModal></AddTodoModal>
        <TodoFilter
          priority={priority}
          setPriority={setPriority}>
        </TodoFilter>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px] space-y-3">

        <div className="bg-white p-5 w-full rounded-lg h-full space-y-3">

          {
            isLoading ? " " :
              data.length > 0 ? data.map((item: any) => {
                return <TodoCard key={item._id} title={item.title} description={item.description} id={item.id} isCompleted={item.isCompleted} priority={item.priority}></TodoCard>
              }) :
                <div className="bg-white md:flex justify-between items-center rounded-xl p-3">
                  <h1 className="text-center w-full font-bold text-2xl">
                    There is no task
                  </h1>
                </div>
          }

        </div>
      </div>
    </div>
  )
}
