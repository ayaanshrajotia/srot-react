import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center max-sm:gap-1">
                <h1 className="text-3xl font-bold max-sm:text-xl">
                    Task Board
                </h1>
                <ul className="flex gap-4 max-sm:gap-1">
                    <li className="">
                        <Link
                            to={"/"}
                            className="hover:bg-n-light-gray-2 py-2 px-4 rounded-md max-sm:p-1"
                        >
                            Home
                        </Link>
                    </li>
                    <li className="">
                        <Link
                            to={"/add-task"}
                            className="hover:bg-n-light-gray-2 py-2 px-4 rounded-md max-sm:p-1"
                        >
                            Add Task
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
