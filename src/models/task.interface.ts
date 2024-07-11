import { ColumnStatus } from "../enums/columnStatus";

export interface Task {
    id: string;
    title: string;
    state: ColumnStatus;
}
