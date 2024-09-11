import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useParams } from "react-router-dom";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Library: React.FC = () => {
    const { bookname } = useParams<{ bookname: string }>(); // Get the book name from the URL
    const [textPages, setTextPages] = useState<string[]>([]); // To store the text of the PDF pages
    const [currentPage, setCurrentPage] = useState<number>(0); // Track the current page
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state

    // Load the PDF file from public directory
    useEffect(() => {
        const loadPdf = async () => {
            try {
                const pdfUrl = `/public/${bookname}.pdf`; // Replace with your correct path
                const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
                const numPages = pdf.numPages;

                let fullText = ""; // Variable to store the full text
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    const pageText = textContent.items
                        .map((item: any) => item.str)
                        .join(" ");
                    fullText += pageText + " "; // Collect all text from the pages
                }

                // Split the full text into chunks of 1,000 words
                const words = fullText.split(/\s+/);
                const chunkSize = 1000; // 1,000 words per page
                const textChunks = [];
                for (let i = 0; i < words.length; i += chunkSize) {
                    textChunks.push(words.slice(i, i + chunkSize).join(" "));
                }

                setTextPages(textChunks);
                setLoading(false);
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };

        loadPdf();
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
                <p className="text-center">Loading PDF...</p>
            ) : (
                <div>
                    <div className="text-left whitespace-pre-wrap p-4 border rounded-lg shadow-md bg-white mb-4">
                        {textPages[currentPage]}
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
