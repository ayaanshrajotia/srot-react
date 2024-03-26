import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../app/slices/taskSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddTask() {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        team: "",
        assignee: "",
        priority: "",
        status: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddTask = (e) => {
        e.preventDefault();
        if (
            !taskData.title ||
            !taskData.description ||
            !taskData.team ||
            !taskData.assignee ||
            !taskData.priority ||
            !taskData.status
        ) {
            toast.error("Please fill all the fields");
            return;
        }
        if (taskData.priority === "Select priority") {
            toast.error("Please select priority");
            return;
        }
        if (taskData.status === "Select Status") {
            toast.error("Please select status");
            return;
        }
        dispatch(
            addTask({ ...taskData, assignee: taskData.assignee.toLowerCase() })
        );
        navigate("/");
    };

    return (
        <div className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md p-6">
            <h1 className="text-2xl font-medium mb-6">Add Task</h1>
            <form onSubmit={handleAddTask} className="flex flex-col gap-6">
                {/* Title */}
                <div className="flex items-center gap-3">
                    <label htmlFor="task-name" className="w-[100px]">
                        Title
                    </label>
                    <input
                        type="text"
                        id="task-name"
                        className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md outline-none h-[40px] px-4 w-full placeholder:text-n-light-gray"
                        placeholder="Enter task title"
                        value={taskData.title}
                        onChange={(e) =>
                            setTaskData({ ...taskData, title: e.target.value })
                        }
                    />
                </div>
                {/* Description */}
                <div className="flex items-center gap-3">
                    <label htmlFor="task-name" className="w-[100px]">
                        Description
                    </label>
                    <input
                        type="text"
                        id="task-name"
                        className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md outline-none h-[40px] px-4 w-full placeholder:text-n-light-gray"
                        placeholder="Enter task description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                description: e.target.value,
                            })
                        }
                    />
                </div>
                {/* Team */}
                <div className="flex items-center gap-3">
                    <label htmlFor="task-name" className="w-[100px]">
                        Team
                    </label>
                    <input
                        type="text"
                        id="task-name"
                        className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md outline-none h-[40px] px-4 w-full placeholder:text-n-light-gray"
                        placeholder="Enter team name"
                        value={taskData.team}
                        onChange={(e) =>
                            setTaskData({ ...taskData, team: e.target.value })
                        }
                    />
                </div>
                {/* Assignee */}
                <div className="flex items-center gap-3">
                    <label htmlFor="task-name" className="w-[100px]">
                        Assignee
                    </label>
                    <input
                        type="text"
                        id="task-name"
                        className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md outline-none h-[40px] px-4 w-full placeholder:text-n-light-gray"
                        placeholder="Enter assignee name"
                        value={taskData.assignee}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                assignee: e.target.value,
                            })
                        }
                    />
                </div>
                {/* Priority */}
                <div className="flex items-center gap-3">
                    <label htmlFor="task-name" className="w-[100px]">
                        Priority
                    </label>
                    <select
                        type="text"
                        id="task-name"
                        className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md outline-none h-[40px] px-4 w-full placeholder:text-n-light-gray"
                        placeholder="Enter priority"
                        value={taskData.priority}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                priority: e.target.value,
                            })
                        }
                    >
                        <option value="" defaultChecked>
                            Select priority
                        </option>
                        <option value="0">Priority 0</option>
                        <option value="1">Priority 1</option>
                        <option value="2">Priority 2</option>
                    </select>
                </div>
                {/* Status */}
                <div className="flex items-center gap-3">
                    <label htmlFor="task-name" className="w-[100px]">
                        Status
                    </label>
                    <select
                        type="text"
                        id="task-name"
                        className="bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md outline-none h-[40px] px-4 w-full placeholder:text-n-light-gray"
                        placeholder="Enter priority"
                        value={taskData.status}
                        onChange={(e) =>
                            setTaskData({
                                ...taskData,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="" defaultChecked>
                            Select Status
                        </option>
                        <option value="assign">No Status</option>
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="deployed">Deployed</option>
                        <option value="deffered">Deffered</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-n-white text-black rounded-md py-1 hover:opacity-80 transition-all"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
