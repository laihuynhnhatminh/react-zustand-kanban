import { useState } from "react";
import classNames from "classnames";
import { useShallow } from "zustand/react/shallow";

import { ColumnStatus } from "../../enums/columnStatus";

import "./Column.css";

import Task from "../Task/Task";
import useTaskStore from "../../stores/useTaskStore";

interface IProp {
  readonly state: ColumnStatus;
}

export default function Column({ state }: IProp) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useTaskStore(
    useShallow((store) => store.tasks.filter((task) => task.state === state))
  );
  const draggedTask = useTaskStore((store) => store.draggedTask);
  const addTask = useTaskStore((store) => store.addTask);
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask);
  const moveTask = useTaskStore((store) => store.moveTask);

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        if (draggedTask) {
          setDrop(false);
          moveTask(draggedTask, state);
          setDraggedTask(null);
        }
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          state={task.state}
          id={task.id}
        />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button
              type="submit"
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
