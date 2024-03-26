import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

export default function App() {
    return (
        <div className="min-w-screen min-h-screen flex flex-col p-8 bg-n-black text-n-white">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-task" element={<AddTask />} />
                    <Route path="/edit-task/:taskId" element={<EditTask />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
