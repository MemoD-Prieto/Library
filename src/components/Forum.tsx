import React, { useState, useEffect } from "react";

// Individual Post Component
interface PostProps {
    profilePic: string;
    username: string;
    time: string;
    title: string;
    content: string;
    comments: CommentProps[];
}

// Individual Comment Component
interface CommentProps {
    profilePic: string;
    username: string;
    time: string;
    content: string;
}

// Function to retrieve the username from the session cookie
const getUsernameFromSession = () => {
    const sessionCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="));
    if (sessionCookie) {
        const session = JSON.parse(
            decodeURIComponent(sessionCookie.split("=")[1])
        );
        return session?.firstName ?? "Usuario"; // Retrieve the first name or use "Usuario" as fallback
    }
    return "Usuario"; // Default to "Usuario" if no session is found
};

const Post: React.FC<PostProps> = ({
    profilePic,
    username,
    time,
    title,
    content,
    comments,
}) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
                <img
                    src={profilePic}
                    alt={`${username}'s profile`}
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                    <p className="font-semibold">{username}</p>
                    <p className="text-sm text-gray-500">{time}</p>
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4">{content}</p>
            <div className="mt-4">
                <h3 className="font-semibold mb-2">Comments</h3>
                {comments.map((comment, index) => (
                    <div key={index} className="flex items-start mb-4">
                        <img
                            src={comment.profilePic}
                            alt={`${comment.username}'s profile`}
                            className="w-8 h-8 rounded-full mr-3"
                        />
                        <div>
                            <p className="font-semibold">
                                {comment.username}{" "}
                                <span className="text-sm text-gray-500">
                                    {comment.time}
                                </span>
                            </p>
                            <p className="text-gray-700">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Forum: React.FC = () => {
    const [posts, setPosts] = useState<PostProps[]>([
        {
            profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
            username: "Juan Pérez",
            time: "2 hours ago",
            title: "Mi opinión sobre 1984 de George Orwell",
            content:
                "Acabo de terminar de leer 1984 y debo decir que es uno de los libros más impactantes que he leído. ¿Alguien más siente que el mensaje de Orwell sigue siendo relevante hoy en día?",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/women/44.jpg",
                    username: "Laura Gómez",
                    time: "1 hour ago",
                    content:
                        "Totalmente de acuerdo, Juan. Es increíble cómo muchas de las cosas que Orwell predijo parecen estar sucediendo ahora.",
                },
            ],
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
            username: "María Hernández",
            time: "5 hours ago",
            title: "¿Recomiendan Hábitos Atómicos?",
            content:
                "Estoy pensando en leer Hábitos Atómicos, pero me gustaría saber si realmente vale la pena. ¿Alguno de ustedes lo ha leído? ¿Qué les pareció?",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/men/75.jpg",
                    username: "Pedro Martínez",
                    time: "3 hours ago",
                    content:
                        "¡Te lo recomiendo! Es un libro que realmente me ayudó a cambiar mis hábitos diarios. Es muy práctico y fácil de aplicar.",
                },
            ],
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/12.jpg",
            username: "Carlos Fernández",
            time: "1 day ago",
            title: "Soy escritor principiante, ¡necesito ayuda!",
            content:
                "Estoy escribiendo mi primera novela y me encantaría recibir consejos de otros escritores. ¿Cómo manejan el bloqueo del escritor? A veces me siento atascado y no sé cómo avanzar.",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/women/33.jpg",
                    username: "Ana Ruiz",
                    time: "12 hours ago",
                    content:
                        "¡No te desanimes, Carlos! Todos pasamos por eso. Intenta escribir todos los días, aunque sea solo una frase. Eventualmente, las ideas comenzarán a fluir de nuevo.",
                },
            ],
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
            username: "Luis García",
            time: "3 days ago",
            title: "Libro recomendado: El poder del ahora",
            content:
                "He leído 'El poder del ahora' y ha cambiado por completo mi perspectiva de la vida. Si alguien más lo ha leído, me encantaría conocer su opinión.",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/women/56.jpg",
                    username: "Claudia Rodríguez",
                    time: "1 day ago",
                    content:
                        "¡Es un libro increíble, Luis! Me ayudó a centrarme en el presente y dejar de preocuparme tanto por el futuro.",
                },
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/men/67.jpg",
                    username: "David Sánchez",
                    time: "12 hours ago",
                    content:
                        "Totalmente de acuerdo. Eckhart Tolle tiene una manera única de hacernos ver la vida de una forma más tranquila.",
                },
            ],
        },
        {
            profilePic: "https://randomuser.me/api/portraits/women/29.jpg",
            username: "Sofía López",
            time: "4 days ago",
            title: "¿Alguien ha leído La magia del orden?",
            content:
                "He escuchado mucho sobre 'La magia del orden' de Marie Kondo. Estoy considerando leerlo, pero me pregunto si realmente tiene un impacto en la organización personal.",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/men/48.jpg",
                    username: "Mario Pérez",
                    time: "3 days ago",
                    content:
                        "Sí, lo leí y fue una revelación. Me ayudó a reorganizar mi espacio personal y ahora me siento más en control de mi entorno.",
                },
            ],
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/39.jpg",
            username: "Andrés Fernández",
            time: "1 week ago",
            title: "Necesito recomendaciones para escritores novatos",
            content:
                "Soy nuevo en la escritura creativa y estoy buscando algunos libros o recursos que me puedan ayudar a mejorar. ¿Alguna sugerencia?",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/women/58.jpg",
                    username: "Raquel Ortiz",
                    time: "5 days ago",
                    content:
                        "Te recomendaría 'Sobre la escritura' de Stephen King. Es un gran recurso tanto para escritores novatos como experimentados.",
                },
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/men/24.jpg",
                    username: "Carlos Morales",
                    time: "3 days ago",
                    content:
                        "También puedes probar 'Bird by Bird' de Anne Lamott. Es un libro muy útil y lleno de consejos prácticos para escritores.",
                },
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/women/73.jpg",
                    username: "Patricia Vega",
                    time: "2 days ago",
                    content:
                        "Totalmente de acuerdo con Carlos y Raquel. Ambos libros son muy útiles.",
                },
            ],
        },
        {
            profilePic: "https://randomuser.me/api/portraits/men/53.jpg",
            username: "José Ramírez",
            time: "2 weeks ago",
            title: "Ciencia ficción: ¿Qué libros recomendarían?",
            content:
                "Soy un gran fanático de la ciencia ficción y estoy buscando recomendaciones de libros que exploren el futuro y la tecnología de manera innovadora.",
            comments: [
                {
                    profilePic:
                        "https://randomuser.me/api/portraits/women/45.jpg",
                    username: "Lucía Gutiérrez",
                    time: "1 week ago",
                    content:
                        "'Dune' de Frank Herbert es un clásico de la ciencia ficción. También podrías probar 'Neuromante' de William Gibson.",
                },
            ],
        },
    ]);

    const [newPost, setNewPost] = useState({ title: "", content: "" });
    const [username, setUsername] = useState<string>("Usuario");

    // Load the username from session when the component mounts
    useEffect(() => {
        const sessionUsername = getUsernameFromSession();
        setUsername(sessionUsername);
    }, []);

    // Handle form submission
    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPostData: PostProps = {
            profilePic: "https://randomuser.me/api/portraits/lego/2.jpg", // Placeholder for new user's profile pic
            username,
            time: "Just now",
            title: newPost.title || "Nuevo Post",
            content: newPost.content,
            comments: [],
        };

        setPosts([newPostData, ...posts]);

        setNewPost({ title: "", content: "" }); // Clear form
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Post creation form */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center mb-4">
                    <img
                        src="https://randomuser.me/api/portraits/lego/2.jpg" // Placeholder for profile picture
                        alt={`${username}'s profile`}
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <span className="font-semibold">{username}</span>
                </div>
                <form onSubmit={handlePostSubmit}>
                    <textarea
                        value={newPost.content}
                        onChange={(e) =>
                            setNewPost({ ...newPost, content: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                        placeholder="¿Qué estás pensando?"
                        required
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            </div>

            {/* List of posts */}
            {posts.map((post, index) => (
                <Post
                    key={index}
                    profilePic={post.profilePic}
                    username={post.username}
                    time={post.time}
                    title={post.title}
                    content={post.content}
                    comments={post.comments}
                />
            ))}
        </div>
    );
};

export default Forum;
