import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";
import {
    AiOutlineBook,
    AiOutlineUpload,
    AiOutlineMessage,
    AiOutlineHome,
    AiOutlineLogout,
} from "react-icons/ai"; // Import icons
import Login from "./components/Login";
import Library from "./components/Library";
import Upload from "./components/Upload";
import Forum from "./components/Forum";
import Book from "./components/Book";
import ReadBook from "./components/ReadBook";

// Helper function to get a cookie
const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};

// Helper function to delete a cookie
const eraseCookie = (name: string) => {
    document.cookie = name + "=; Max-Age=-99999999;";
};

const Navbar: React.FC = () => {
    const navigate = useNavigate(); // To handle logout redirection

    // Handle logout button click
    const handleLogout = () => {
        eraseCookie("session"); // Remove the session cookie
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="bg-gray-800 text-white p-2 flex justify-between items-center shadow-md">
            {/* Logo with icon and text */}
            <div className="flex items-center space-x-2 bg-gray-900 p-2 rounded-lg shadow-lg border border-gray-700">
                <AiOutlineHome className="text-3xl text-gray-400" />
                <span className="text-2xl font-bold text-gray-300">
                    Librarium
                </span>
            </div>

            {/* Centered Navigation Links */}
            <div className="flex">
                <Link
                    to="/library"
                    className="flex flex-col items-center hover:bg-gray-700 p-2 rounded"
                >
                    <AiOutlineBook className="text-2xl" />
                    <span className="hidden md:inline">Library</span>
                </Link>
                <Link
                    to="/forum"
                    className="flex flex-col items-center hover:bg-gray-700 p-2 rounded"
                >
                    <AiOutlineMessage className="text-2xl" />
                    <span className="hidden md:inline">Forum</span>
                </Link>
            </div>

            {/* Logout Button */}
            <button
                className="flex items-center space-x-2 bg-red-600 p-2 rounded-lg shadow-lg border border-red-500 hover:bg-red-700 hover:border-red-600 transition duration-300"
                onClick={handleLogout}
            >
                <AiOutlineLogout className="text-2xl" />
                <span className="hidden md:inline">Logout</span>
            </button>
        </nav>
    );
};

const App: React.FC = () => {
    const location = useLocation(); // Get the current route
    const navigate = useNavigate(); // To redirect to login page

    // Check for the session cookie and redirect to login if it doesn't exist
    useEffect(() => {
        const session = getCookie("session");
        if (!session && location.pathname !== "/login") {
            navigate("/login"); // Redirect to login if no session exists
        }
    }, [location, navigate]);

    return (
        <div className="flex flex-col h-screen">
            {/* Conditionally render the navbar only if the path is not "/login" */}
            {location.pathname !== "/login" && <Navbar />}

            {/* Main content */}
            <div className="flex-grow p-4 bg-gray-100">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/library/:bookname" element={<Book />} />
                    <Route
                        path="/library/:bookname/read"
                        element={<ReadBook />}
                    />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/forum" element={<Forum />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
