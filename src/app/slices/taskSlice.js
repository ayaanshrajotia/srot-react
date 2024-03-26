import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const initialState = {
    tasks: [],
    filteredTasks: [],
    priorityFilter: null, // priority will have 4 values: null, 0, 1, 2
    assigneeFilter: null,
    startDateFilter: null,
    endDateFilter: null,
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            if (action.payload.status === "completed") {
                state.tasks.push({
                    ...action.payload,
                    id: v4(),
                    startDate: new Date().toLocaleDateString(),
                    endDate: new Date().toLocaleDateString(),
                });
                state.filteredTasks = state.tasks;
            } else {
                state.tasks.push({
                    ...action.payload,
                    id: v4(),
                    startDate: new Date().toLocaleDateString(),
                });
                state.filteredTasks = state.tasks;
            }
            state.priorityFilter = null;
            state.assigneeFilter = null;
            state.startDateFilter = null;
            state.endDateFilter = null;
        },
        removeTask: (state, action) => {
            state.filteredTasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        editTask: (state, action) => {
            const { id } = action.payload;
            const { status, priority } = action.payload.taskData;
            const task = state.filteredTasks.find((task) => task.id === id);
            if (status === "completed") {
                task.endDate = new Date().toLocaleDateString();
            }
            task.status = status;
            task.priority = priority;
        },
        filterTasks: (state, action) => {
            const {
                priorityFilter,
                assigneeFilter,
                startDateFilter,
                endDateFilter,
            } = action.payload;
            state.priorityFilter = priorityFilter;
            state.assigneeFilter = assigneeFilter;
            state.startDateFilter = startDateFilter;
            state.endDateFilter = endDateFilter;
            state.filteredTasks = state.tasks.filter((task) => {
                if (priorityFilter && task.priority !== priorityFilter) {
                    return false;
                }
                if (assigneeFilter && !task.assignee.includes(assigneeFilter)) {
                    return false;
                }
                if (
                    startDateFilter &&
                    task.startDate !==
                        new Date(startDateFilter).toLocaleDateString()
                ) {
                    return false;
                }
                if (
                    endDateFilter &&
                    task.endDate !==
                        new Date(endDateFilter).toLocaleDateString()
                ) {
                    return false;
                }
                return true;
            });
        },
        addPriorityFilter: (state, action) => {
            state.priorityFilter = action.payload;
        },
        addAssigneeFilter: (state, action) => {
            state.assigneeFilter = action.payload;
        },
        addStartDateFilter: (state, action) => {
            state.startDateFilter = action.payload;
        },
        addEndDateFilter: (state, action) => {
            state.endDateFilter = action.payload;
        },
        sortTasks: (state, action) => {
            if (action.payload === "priority")
                state.filteredTasks = state.filteredTasks.sort((a, b) => {
                    if (a.priority < b.priority) {
                        return -1;
                    }
                    if (a.priority > b.priority) {
                        return 1;
                    }
                    return 0;
                });
            else if (action.payload === "start") {
                state.filteredTasks = state.filteredTasks.sort((a, b) => {
                    if (a.startDate < b.startDate) {
                        return -1;
                    }
                    if (a.startDate > b.startDate) {
                        return 1;
                    }
                    return 0;
                });
            } else if (action.payload === "end") {
                state.filteredTasks = state.filteredTasks.sort((a, b) => {
                    if (a.endDate < b.endDate) {
                        return -1;
                    }
                    if (a.endDate > b.endDate) {
                        return 1;
                    }
                    return 0;
                });
            }
        },
        reset: (state) => {
            state.filteredTasks = state.tasks;
        },
    },
});

export const {
    addTask,
    removeTask,
    editTask,
    filterTasks,
    addAssigneeFilter,
    addPriorityFilter,
    sortTasks,
    reset,
    addStartDateFilter,
    addEndDateFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
