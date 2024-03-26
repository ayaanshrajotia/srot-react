import { Link } from "react-router-dom";
import TaskBox from "../components/TaskBox";
// import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
    addAssigneeFilter,
    addEndDateFilter,
    addPriorityFilter,
    addStartDateFilter,
    filterTasks,
    reset,
    sortTasks,
} from "../app/slices/taskSlice";

function Home() {
    // const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { filteredTasks } = useSelector((state) => state.tasks);
    const { priorityFilter, assigneeFilter } = useSelector(
        (state) => state.tasks
    );
    const dispatch = useDispatch();

    return (
        <div className={`relative flex flex-col gap-8`}>
            <div className="flex justify-between max-sm:flex-col">
                {/* Filters */}
                <div className="flex flex-col gap-5">
                    {/* Filter by */}
                    <div className="flex flex-1 items-center gap-3 flex-wrap mr-4">
                        <span className="text-n-light-gray w-[80px]">
                            Filter By
                        </span>
                        <input
                            type="text"
                            placeholder="Assignee"
                            className="bg-n-dark-gray px-4 rounded-md outline-none h-[40px] border-[1px] border-n-light-gray-2 placeholder:text-n-light-gray max-w-[300px] w-full"
                            onChange={async (e) => {
                                await dispatch(
                                    addAssigneeFilter(e.target.value)
                                );
                                await dispatch(
                                    filterTasks({
                                        priorityFilter,
                                        assigneeFilter: e.target.value,
                                    })
                                );
                            }}
                        />
                        <select
                            name=""
                            id=""
                            className="bg-n-dark-gray rounded-md outline-none h-[40px] border-[1px] border-n-light-gray-2 px-4  max-w-[300px] w-full"
                            onChange={async (e) => {
                                await dispatch(
                                    addPriorityFilter(e.target.value)
                                );
                                await dispatch(
                                    filterTasks({
                                        priorityFilter: e.target.value,
                                        assigneeFilter,
                                    })
                                );
                            }}
                        >
                            <option value="" defaultChecked>
                                Priority
                            </option>
                            <option value="0">Priority 0</option>
                            <option value="1">Priority 1</option>
                            <option value="2">Priority 2</option>
                        </select>
                        <div className="flex gap-2 items-center">
                            <input
                                type="date"
                                placeholder="Date"
                                onChange={(e) => {
                                    dispatch(
                                        addStartDateFilter(e.target.value)
                                    );
                                    dispatch(
                                        filterTasks({
                                            startDateFilter: e.target.value,
                                        })
                                    );
                                }}
                                className="bg-n-dark-gray rounded-md outline-none h-[40px] border-[1px] border-n-light-gray-2 px-4  max-w-[150px] w-full text-n-white"
                            />
                            --
                            <input
                                type="date"
                                placeholder="Date"
                                onChange={(e) => {
                                    dispatch(addEndDateFilter(e.target.value));
                                    dispatch(
                                        filterTasks({
                                            endDateFilter: e.target.value,
                                        })
                                    );
                                }}
                                className="bg-n-dark-gray rounded-md outline-none h-[40px] border-[1px] border-n-light-gray-2 px-4  max-w-[150px] w-full text-n-white"
                            />
                        </div>
                    </div>
                    {/* Sort by */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-n-light-gray w-[80px]">
                            Sort by
                        </span>
                        <select
                            name=""
                            id=""
                            className="bg-n-dark-gray text-n-white rounded-md outline-none h-[40px] border-[1px] border-n-light-gray-2 px-4 max-w-[300px] w-full"
                            onChange={(e) =>
                                dispatch(sortTasks(e.target.value))
                            }
                        >
                            <option value="" defaultChecked>
                                Sort by
                            </option>
                            <option value="priority">Priority</option>
                            <option value="start">Start Date</option>
                            <option value="end">End Date</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <Link
                        to={"/add-task"}
                        className="bg-n-white text-black rounded-md h-fit px-6 py-1 hover:opacity-80 transition-all text-center"
                    >
                        Add Task
                    </Link>
                    <button
                        className="bg-n-white text-black rounded-md h-fit px-6 py-1 hover:opacity-80 transition-all"
                        onClick={() => dispatch(reset())}
                    >
                        Reset
                    </button>
                </div>
            </div>
            {/* filteredTasks */}
            <div className="flex flex-col gap-4">
                {/* Pending */}
                <div className="flex flex-col gap-3 rounded-md pb-2 min-h-[150px]">
                    <h2 className="font-bold">Pending</h2>
                    <div className="w-full flex flex-wrap gap-3">
                        {filteredTasks.filter(
                            (task) => task.status === "assign"
                        ).length === 0 ? (
                            <div className="flex items-center justify-center text-n-light-gray bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md h-[150px] w-[300px]">
                                No Task Found
                            </div>
                        ) : (
                            filteredTasks
                                .filter((task) => task.status === "assign")
                                .map((task) => (
                                    <TaskBox
                                        key={task?.id}
                                        id={task?.id}
                                        title={task?.title}
                                        description={task?.description}
                                        startDate={task?.startDate}
                                        endDate={task?.endDate}
                                        status={task?.status}
                                        assignee={task?.assignee}
                                        priority={task?.priority}
                                    />
                                ))
                        )}
                    </div>
                </div>
                {/* In Progress */}
                <div className="flex flex-col gap-3 min-h-[150px]">
                    <h2 className="font-bold">In Progress</h2>
                    <div className=" flex gap-3 flex-wrap">
                        {filteredTasks.filter(
                            (task) => task.status === "in-progress"
                        ).length === 0 ? (
                            <div className="flex items-center justify-center text-n-light-gray bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md h-[150px] w-[300px]">
                                No Task Found
                            </div>
                        ) : (
                            filteredTasks
                                .filter((task) => task.status === "in-progress")
                                .map((task) => (
                                    <TaskBox
                                        key={task?.id}
                                        id={task?.id}
                                        title={task?.title}
                                        description={task?.description}
                                        startDate={task?.startDate}
                                        endDate={task?.endDate}
                                        status={task?.status}
                                        assignee={task?.assignee}
                                        priority={task?.priority}
                                    />
                                ))
                        )}
                    </div>
                </div>
                {/* Completed */}
                <div className="flex flex-col gap-3 min-h-[150px]">
                    <h2 className="font-bold">Completed</h2>
                    <div className="flex gap-3 flex-wrap">
                        {filteredTasks.filter(
                            (task) => task.status === "completed"
                        ).length === 0 ? (
                            <div className="flex items-center justify-center text-n-light-gray bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md h-[150px] w-[300px]">
                                No Task Found
                            </div>
                        ) : (
                            filteredTasks
                                .filter((task) => task.status === "completed")
                                .map((task) => (
                                    <TaskBox
                                        key={task?.id}
                                        id={task?.id}
                                        title={task?.title}
                                        description={task?.description}
                                        startDate={task?.startDate}
                                        endDate={task?.endDate}
                                        status={task?.status}
                                        assignee={task?.assignee}
                                        priority={task?.priority}
                                    />
                                ))
                        )}
                    </div>
                </div>
                {/* Deployed */}
                <div className="flex flex-col gap-3 min-h-[150px]">
                    <h2 className="font-bold">Deployed</h2>
                    <div className="flex gap-3 flex-wrap">
                        {filteredTasks.filter(
                            (task) => task.status === "deployed"
                        ).length === 0 ? (
                            <div className="flex items-center justify-center text-n-light-gray bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md h-[150px] w-[300px]">
                                No Task Found
                            </div>
                        ) : (
                            filteredTasks
                                .filter((task) => task.status === "deployed")
                                .map((task) => (
                                    <TaskBox
                                        key={task?.id}
                                        id={task?.id}
                                        title={task?.title}
                                        description={task?.description}
                                        startDate={task?.startDate}
                                        endDate={task?.endDate}
                                        status={task?.status}
                                        assignee={task?.assignee}
                                        priority={task?.priority}
                                    />
                                ))
                        )}
                    </div>
                </div>
                {/* Deferred */}
                <div className="flex flex-col gap-3 min-h-[150px]">
                    <h2 className="font-bold">Deffered</h2>
                    <div className="flex flex-wrap gap-3">
                        {filteredTasks.filter(
                            (task) => task.status === "deffered"
                        ).length === 0 ? (
                            <div className="flex items-center justify-center text-n-light-gray bg-n-dark-gray border-[1px] border-n-light-gray-2 rounded-md h-[150px] w-[300px]">
                                No Task Found
                            </div>
                        ) : (
                            filteredTasks
                                .filter((task) => task.status === "deffered")
                                .map((task) => (
                                    <TaskBox
                                        key={task?.id}
                                        id={task?.id}
                                        title={task?.title}
                                        description={task?.description}
                                        startDate={task?.startDate}
                                        endDate={task?.endDate}
                                        status={task?.status}
                                        assignee={task?.assignee}
                                        priority={task?.priority}
                                    />
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

{
    /* {isDeleteOpen && (
                <div className="absolute m-auto left-0 right-0 top-0 bottom-0 bg-n-dark-gray rounded-md border-[1px] border-n-light-gray-2 p-4 w-[400px] flex flex-col gap-3 h-fit z-[999]">
                    <div className="flex justify-between">
                        <h1 className="text-n-light-gray">
                            Do you want to delete this task?
                        </h1>
                        <XMarkIcon
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => setIsDeleteOpen(false)}
                        />
                    </div>

                    <span className="font-bold text-lg">Task 1</span>
                    <div className="flex justify-evenly">
                        <button className="bg-n-white text-sm text-black rounded-md h-fit px-6 py-1">
                            Yes
                        </button>
                        <button className="bg-n-white text-sm text-black rounded-md h-fit px-6 py-1">
                            No
                        </button>
                    </div>
                </div>
            )} */
}
