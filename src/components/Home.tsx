"use client"
import React, { useState, useEffect } from 'react';
import { useMyBooks } from '../context/MyBooksContext';
import { toast } from 'sonner';
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import Image from "next/image";

const Home: React.FC = () => {
    const { searchedBooks, searchBooks, addBook, myBooks, setMyBooks } = useMyBooks();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            setIsLoading(true);
            setError(null);
            try {
                await searchBooks(searchQuery);
            } catch (error) {
                setError(`Failed to search for "${searchQuery}"`);
                console.error('Error searching books:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const addToast = () => {
        toast.success("Book is added to your collection!");
    }

    const handleAddBook = (book: any) => {
        try {
            addBook(book);
            addToast();
        } catch (error) {
            toast.error(`Failed to add "${book.volumeInfo.title}" to your collection.`);
            console.error('Error adding book:', error);
        }
    };


    // const debug = () => {
    //     console.log(myBooks);
    // }

    return (
        <div className="font-dmsans flex min-h-screen flex-col items-center justify-start p-10">
            {/* <button
                onClick={debug}
                className="py-1 px-2 mb-8 rounded-md bg-red-300"
            >
                debug
            </button> */}


            <div className="flex justify-center items-center">
                <Image className="max-w-[110px] w-[20%] min-w-[80px]" src="/frame_curl_design.png" alt="design" width={200} height={100}/>
                <h1 className='font-margaret text-3xl text-darkbrown'>Let's look for a book!</h1>
                <Image className="max-w-[110px] w-[20%] min-w-[80px] scale-x-[-1]" src="/frame_curl_design.png" alt="design" width={200} height={100}/>
            </div>

            <div className="flex mt-6 w-[80%] justify-center">
                <input
                    type="text"
                    value={searchQuery}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="placeholder-darkbrown placeholder-opacity-75 px-2 border-2 border-none bg-creaminput rounded-md outline-none text-darkbrown shadow-sm shadow-slate-400 max-w-[400px] w-[85%]"
                    placeholder="Search for a book..."
                />

                <button
                    className="font-bold tracking-wide text-white bg-lightbrown hover:bg-mediumbrown py-2 px-5 rounded-lg ml-6 shadow-md shadow-slate-400 hover:shadow-none transition ease-in-out"
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    Search
                    {/* {isLoading ? 'Searching...' : 'Search'} */}
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <div className="flex flex-col mt-8 max-md:pl-10 max-sm:pl-0 max-w-[600px] w-[50%] max-lg:w-[85%] max-md:w-[95%] max-sm:w-[100%]">
                { isLoading ? 
                <svg aria-hidden="true" className="m-auto mt-16 inline w-12 h-12 text-gray-200 animate-spin dark:text-peachy fill-darkbrown" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg> :
                 searchedBooks.map((book) => (
                    <div
                        key={book.id}
                        className="flex items-center justify-start my-4 py-5 px-5 shadow-md shadow-gray-400 rounded-md bg-cream text-darkbrown"
                    >
                        <Image src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} width={200} height={100}/>
                        <div className="flex flex-col mx-5 w-[100%]">
                            <p className="text-lg text-wrap font-bold">{book.volumeInfo.title}</p>
                            <p> - {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
                        </div>
                        {/* <button onClick={() => handleAddBook(book)} className="ml-auto hover:cursor-pointer hover:font-bold transition ease-in-out">
                            <p className='text-[1.8rem]'>+</p>
                        </button> */}
                        {myBooks.some((myBook) => myBook.id === book.id) ? (
                            <button className="cursor-not-allowed font-bold text-darkbrown" disabled>
                                {/* <p className='text-[1.8rem]'>&#10003;</p> */}
                                <IoCheckmarkCircle 
                                    size={20}
                                />
                            </button>
                        ) : (
                            <button title="Add to My Books Collection" onClick={() => handleAddBook(book)} className="ml-auto hover:cursor-pointer hover:font-bold transition ease-in-out">
                                {/* <p className='text-[1.8rem]'>+</p> */}
                                <IoIosAdd 
                                    size={25}
                                />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;