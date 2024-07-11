import classNames from "classnames";

import "./Task.css";
import trash from "../../assets/trash-can.svg";

import { ColumnStatus } from "../../enums/columnStatus";
import useTaskStore from "../../stores/useTaskStore";

interface IProp {
  readonly id: string;
  readonly title: string;
  readonly state: ColumnStatus;
}

export default function Task({ id, title, state }: IProp) {
  const deleteTask = useTaskStore((store) => store.deleteTask);
  const setDraggedTask = useTaskStore((store) => store.setDraggedTask);

  return (
    <div
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask({ id, title, state });
      }}
    >
      <div>{title}</div>
      <div className="bottomWrapper">
        <div>
          <img
            className="trashIcon"
            src={trash}
            onClick={() => deleteTask(id)}
          />
        </div>
        <div className={classNames("status", state)}>{state}</div>
      </div>
    </div>
  );
}
