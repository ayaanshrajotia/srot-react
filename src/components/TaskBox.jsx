import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeTask } from "../app/slices/taskSlice";

export default function TaskBox({
    id,
    title,
    description,
    status,
    assignee,
    priority,
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleDeleteTask = () => {
        dispatch(removeTask(id));
    };

    return (
        <div className="relative w-[300px] flex flex-col bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md py-4 px-5 gap-3 hover:border-n-white transition-all">
            {isMenuOpen && (
                <div className="absolute bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md py-2 px-2 w-[150px] top-[50px] right-[10px] z-[999]">
                    <ul className="flex flex-col gap-1">
                        <Link to={`/edit-task/${id}`}>
                            <li className="py-1 px-2 hover:bg-n-dark-gray-2 rounded-md cursor-pointer">
                                Edit
                            </li>
                        </Link>
                        {status !== "completed" && (
                            <li
                                className="py-1 px-2 hover:bg-n-dark-gray-2 rounded-md cursor-pointer"
                                onClick={handleDeleteTask}
                            >
                                Delete
                            </li>
                        )}
                    </ul>
                </div>
            )}
            <div className="flex justify-between items-center">
                <h2 className="truncate">{title}</h2>
                <div className="flex items-center gap-2">
                    <p className="bg-n-white text-black rounded-md text-xs px-3 py-1 font-bold">
                        P{priority}
                    </p>
                    <EllipsisVerticalIcon
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                </div>
            </div>
            <p className="text-sm text-n-light-gray line-clamp-6">
                {description}
            </p>
            {/* <div className="flex justify-between">
                <p className="text-xs text-n-light-gray">{startDate}</p>
                <p className="text-xs text-n-light-gray">{endDate}</p>
            </div> */}
            <p className="font-medium">@{capitalizeFirstLetter(assignee)}</p>
            <button className="bg-n-white px-4 py-1 text-black rounded-md text-sm hover:opacity-80 transition-all mt-auto">
                {capitalizeFirstLetter(status)}
            </button>
        </div>
    );
}
