import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Page {
    page_number: number;
    content: string;
}

const Library: React.FC = () => {
    const { bookname } = useParams<{ bookname: string }>(); // Get the book name from the URL
    const [textPages, setTextPages] = useState<Page[]>([]); // To store the text of the pages
    const [currentPage, setCurrentPage] = useState<number>(0); // Track the current page
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state

    // Load the JSON file from the public directory
    useEffect(() => {
        const loadJson = async () => {
            try {
                const response = await fetch(`/${bookname}.json`);
                const jsonData = await response.json();
                setTextPages(jsonData.pages);
                setLoading(false);
            } catch (error) {
                console.error("Error loading JSON:", error);
            }
        };

        loadJson();
    }, [bookname]);

    // Handle pagination
    const goToNextPage = () => {
        if (currentPage < textPages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold text-center mb-8">
                Reading: {bookname}
            </h1>
            {loading ? (
                <p className="text-center">Loading JSON...</p>
            ) : (
                <div>
                    <div className="text-left whitespace-pre-wrap p-4 border rounded-lg shadow-md bg-white mb-4">
                        {textPages[currentPage].content}
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 0}
                            className={`px-4 py-2 bg-blue-500 text-white rounded ${
                                currentPage === 0
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            Previous Page
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === textPages.length - 1}
                            className={`px-4 py-2 bg-blue-500 text-white rounded ${
                                currentPage === textPages.length - 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            Next Page
                        </button>
                    </div>
                    <p className="text-center mt-4">
                        Page {currentPage + 1} of {textPages.length}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Library;
