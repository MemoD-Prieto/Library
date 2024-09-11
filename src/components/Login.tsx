import React, { useState } from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Define the user object type
interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

// Define the session data type
interface SessionData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

// Helper function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate(); // Initialize navigate hook

    // Simulate a JSON object for user data
    const users: User[] = [
        {
            id: 1,
            email: "user1@example.com",
            password: "password123",
            firstName: "John",
            lastName: "Doe",
        },
        {
            id: 2,
            email: "user2@example.com",
            password: "password456",
            firstName: "Jane",
            lastName: "Smith",
        },
    ];

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Find user in the "database"
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            // If user is found, store user data in a session cookie
            const sessionData: SessionData = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            // Convert the session data to a string and store it in a cookie
            setCookie("session", JSON.stringify(sessionData), 1); // Cookie expires in 1 day

            // Clear error message if any
            setError("");

            // Redirect to the library page
            navigate("/library"); // This will navigate the user to /library after login
        } else {
            // Show an error message if credentials are incorrect
            setError("Invalid email or password");
        }
    };

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample image"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <form onSubmit={handleLogin}>
                    <div className="text-center md:text-left">
                        <label className="mr-1">Sign in with</label>
                        <button
                            type="button"
                            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                        >
                            <BiLogoFacebook
                                size={20}
                                className="flex justify-center items-center w-full"
                            />
                        </button>
                        <button
                            type="button"
                            className="inline-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                        >
                            <AiOutlineTwitter
                                size={20}
                                className="flex justify-center items-center w-full"
                            />
                        </button>
                    </div>
                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                            Or
                        </p>
                    </div>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input className="mr-1" type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <a
                            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Don&apos;t have an account?{" "}
                    <a
                        className="text-red-600 hover:underline hover:underline-offset-4"
                        href="#"
                    >
                        Register
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Login;
