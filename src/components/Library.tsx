import React, { useState } from "react";

// Card component
interface CardProps {
    title: string;
    description: string;
    file: string;
    coverImage: string; // URL of the cover image
}

const Card: React.FC<CardProps> = ({
    title,
    description,
    file,
    coverImage,
}) => {
    const fallbackImage =
        "https://via.placeholder.com/150?text=No+Image+Available";

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
            <div className="relative group h-64">
                <img
                    src={coverImage}
                    alt={`Cover of ${title}`}
                    className="w-full h-full object-cover rounded-md shadow-lg"
                    onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                    }}
                />
                <div className="absolute inset-0 bg-gray-800 bg-opacity-90 text-white p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                    <p className="text-center text-sm">{description}</p>
                </div>
            </div>
            <div className="text-center mt-4">
                <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Leer PDF
                </a>
            </div>
        </div>
    );
};

// Library component
const initialBooks = [
    {
        title: "1984",
        description:
            "Una novela sobre la vida bajo la constante vigilancia del 'Gran Hermano'.",
        file: "/Library/1984",
        coverImage:
            "https://www.printmag.com/wp-content/uploads/2017/01/2a34d8_a6741e88335241308890543d203ad89dmv2.jpg",
    },
    {
        title: "Alas de Sangre",
        description:
            "Una historia de romance y sacrificio, luchando por la libertad.",
        file: "/Library/AlasDeSangre",
        coverImage:
            "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg42UxvjbBJemdUU4L40YVEA5Kx3g3kIaebHI69j2ihVMa0mKkRrlvJ3i8NeoKzl6tDJc-krI9wAj7Oat1dab3rqOokSH9CyoSUXC2mi5kuOZShtsXaqhoYT-1_oUTBRTUU1-bq_7bjXGyMfFfvZlvz17Ybg0S7gMsb5lH8AQCeHnBdsGoalf8Pqf9Y7Rw/s2141/123161057.jpg",
    },
    {
        title: "La Estrategia del Océano Azul",
        description: "Una guía sobre la creación de mercados sin competencia.",
        file: "/Library/EstrategiaOceanoAzul",
        coverImage:
            "https://m.media-amazon.com/images/I/71ueqFxrhnL._AC_UF894,1000_QL80_.jpg",
    },
    {
        title: "Hábitos Atómicos",
        description:
            "Un libro sobre cómo mejorar tus hábitos para crear un mejor futuro.",
        file: "/Library/HabitosAtomicos",
        coverImage:
            "https://m.media-amazon.com/images/I/416mbzgpfML._SY580_.jpg",
    },
];

const Library: React.FC = () => {
    const [books, setBooks] = useState(initialBooks);
    const [showForm, setShowForm] = useState(false);
    const [newBook, setNewBook] = useState({
        title: "",
        description: "",
        file: "",
        coverImage: "",
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            newBook.title &&
            newBook.description &&
            selectedFile &&
            newBook.coverImage
        ) {
            const fileUrl = URL.createObjectURL(selectedFile);
            setBooks([...books, { ...newBook, file: fileUrl }]);
            setNewBook({
                title: "",
                description: "",
                file: "",
                coverImage: "",
            });
            setSelectedFile(null);
            setShowForm(false);
        } else {
            alert("Todos los campos son obligatorios");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Biblioteca</h1>
            <div className="text-center mb-6">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Cancelar" : "Añadir Nuevo Libro"}
                </button>
            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="mb-8 max-w-md mx-auto p-4 bg-gray-100 rounded shadow-md"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="title"
                        >
                            Título
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newBook.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="description"
                        >
                            Descripción (máx 150 caracteres)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={newBook.description}
                            onChange={handleInputChange}
                            maxLength={150}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="file"
                        >
                            Archivo PDF
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            className="block text-gray-700 mb-2"
                            htmlFor="coverImage"
                        >
                            URL de la Imagen de Portada
                        </label>
                        <input
                            type="text"
                            id="coverImage"
                            name="coverImage"
                            value={newBook.coverImage}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                        Añadir Libro
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {books.map((book) => (
                    <div key={book.title} className="w-full h-auto">
                        <Card
                            title={book.title}
                            description={book.description}
                            file={book.file}
                            coverImage={book.coverImage}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
