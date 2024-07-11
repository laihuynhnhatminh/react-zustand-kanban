import { devtools, persist } from "zustand/middleware";

import { Task } from "../models/task.interface";
import { ColumnStatus } from "../enums/columnStatus";
import { generateRandomId } from "../helpers/common";
import logger from "./storeLogger";
import { create } from "zustand";

interface TaskState {
  tasks: Task[];
  draggedTask: Task | null;
  addTask: (title: string, state: ColumnStatus) => void;
  deleteTask: (id: string) => void;
  setDraggedTask: (task: Task | null) => void;
  moveTask: (task: Task, newState: ColumnStatus) => void;
}

const useTaskStore = create<TaskState>()(
  logger(
    persist(
      devtools((set) => ({
        tasks: [],
        draggedTask: null,
        addTask: (title: string, state: ColumnStatus) =>
          set(
            (store: TaskState) => ({
              tasks: [...store.tasks, { id: generateRandomId(), title, state }],
            }),
            false,
            "addTask"
          ),
        deleteTask: (id: string) =>
          set(
            (store: TaskState) => ({
              tasks: store.tasks.filter((task) => task.id !== id),
            }),
            false,
            "deleteTask"
          ),
        setDraggedTask: (task: Task | null) =>
          set(
            {
              draggedTask: task,
            },
            false,
            "setDraggedTask"
          ),
        moveTask: (draggedTask: Task, newState: ColumnStatus) =>
          set(
            (store) => ({
              tasks: store.tasks.map((task) =>
                task.id === draggedTask.id
                  ? { id: task.id, title: task.title, state: newState }
                  : task
              ),
            }),
            false,
            "moveTask"
          ),
      })),
      { name: "taskStore" }
    )
  )
);

export default useTaskStore;
