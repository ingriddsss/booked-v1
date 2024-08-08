"use client"
import { useEffect } from 'react';

import React, { createContext, useContext, useState, ReactNode } from 'react';


//Google Books API
interface Book {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        imageLinks: {
            thumbnail: string;
        };
    };
}

//Open Library API
interface Book {
    docs: {

    }
}


interface MyBooksContextType {
    searchedBooks: Book[];
    myBooks: Book[];
    setMyBooks: React.Dispatch<React.SetStateAction<Book[]>>;
    searchBooks: (query: string) => Promise<void>;
    addBook: (book: Book) => void;
}

const MyBooksContext = createContext<MyBooksContextType | undefined>(undefined);

interface MyBooksProviderProps {
    children: ReactNode;
}

export const MyBooksProvider: React.FC<MyBooksProviderProps> = ({ children }) => {
    const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
    let [myBooks, setMyBooks] = useState<Book[]>([]);

    const searchBooks = async (query: string) => {
        // Perform search logic here, e.g., fetch from an API
        try {
            // Simulated fetch for demonstration
            const apiKey = 'AIzaSyBbkK6AjYDa5QAgQ_9my1_dQs6KXEwBl1g';
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
            // const response = await fetch(`https://openlibrary.org/search.json?q=${query}`)
            // const response = await fetch(`https://openlibrary.org/search.json?q=the+lord+of+the+rings`)

            const data = await response.json();
            if (data.items) {
                setSearchedBooks(data.items.map((item: any) => ({
                    id: item.id,
                    volumeInfo: {
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors,
                        imageLinks: {
                            thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
                        }
                    }
                })));
            }
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    const addBook = (book: Book) => {
        if (!myBooks.some((b) => b.id === book.id)) {
            const updatedBooks = [...myBooks, book];
            setMyBooks(updatedBooks);
            localStorage.setItem('myBooks', JSON.stringify(updatedBooks)); // Store updated books locally
        }
    };

    useEffect(() => {
        const storedMyBooks = localStorage.getItem('myBooks');
        if (storedMyBooks) {
            setMyBooks(JSON.parse(storedMyBooks));
        }
    }, []);

    return (
        <MyBooksContext.Provider value={{ searchedBooks, myBooks, setMyBooks,  searchBooks, addBook }}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooks = () => {
    const context = useContext(MyBooksContext);
    if (!context) {
        throw new Error('useMyBooks must be used within a MyBooksProvider');
    }
    return context;
};

