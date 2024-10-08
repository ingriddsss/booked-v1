"use client"
import { useState } from "react";
import { useMyBooks } from "@/context/MyBooksContext";
import { toast } from "sonner";
import { CiCircleRemove } from "react-icons/ci";
import { FiEdit3 } from "react-icons/fi";
import Image from "next/image";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

import Link from "next/link";

export const MyBooksCollection = () => {
    const { myBooks, setMyBooks } = useMyBooks();
    const [editOn, setEditOn] = useState(false);

    const toggleEdit = () => {
        if (editOn === false) {
            setEditOn(true);
            toast.warning("Editing Mode Active")
        } else {
            setEditOn(false);
            toast.success("Exited Editing Mode")
        }
    }
    
    const removeBook = (bookId: string) => {
        // Filter out the book with the specified ID
        const updatedBooks = myBooks.filter(book => book.id !== bookId);
        // Update the state (assuming you have a way to set the state)
        setMyBooks(updatedBooks);
    }

    const addToast = () => {
        toast.success("Book is successfully removed from your collection");
    }

    // const debug = () => {
    //     console.log(myBooks)
    // }

    return(
        <section className="mybooks font-dmsans my-10 pb-20 bg-lightcream">
            {/* <button
                onClick={debug}
                className="p-2 rounded-md bg-red-300"
            >
                debug
            </button> */}
            
            <div className="w-[60%] max-md:w-[90%] m-auto">
                {
                    myBooks.length > 0 ? (
                        <>  
                            <div className="flex max-lg:flex-col justify-between items-center w-[80%] m-auto">
                                <button className="invisible">
                                    <FiEdit3
                                        size={20}
                                    />
                                </button>

                                <div className="flex justify-center items-center max-2xl:w-full">
                                    <Image className="max-w-[110px] w-[20%] min-w-[80px]" src="/frame_curl_design.png" alt="design" width={200} height={100}/>
                                    <h2 className="font-margaret text-darkbrown text-center text-[1.8rem] font-bold">My Book Collection</h2>
                                    <Image className="max-w-[110px] w-[20%] min-w-[80px] scale-x-[-1]" src="/frame_curl_design.png" alt="design" width={200} height={100}/>
                                </div>


                                <button 
                                    className="max-lg:mt-5"
                                    onClick={toggleEdit}
                                >
                                    <FiEdit3
                                        color="#573B37"
                                        size={20}
                                    />
                                </button>
                            </div>
                            <div className="grid grid-cols-3 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-7 mt-10">
                                {myBooks.map((book) => (
                                    <div key={book.id} className="text-center shadow-md shadow-mediumbrown rounded-[29px] bg-cream">
                                        {
                                            editOn ? (
                                                <AlertDialog.Root>
                                                    <AlertDialog.Trigger asChild>
                                                        <button 
                                                            className="mt-8 text-red-500 hover:text-red-700"
                                                            // onClick={(e) => { e.stopPropagation(); removeBook(book.id); addToast(); }}
                                                            onClick={(e) => { e.stopPropagation();}}
                                                        >
                                                            <CiCircleRemove 
                                                                size={25}
                                                            />
                                                        </button>
                                                    </AlertDialog.Trigger>
                                                    <AlertDialog.Portal>
                                                    <AlertDialog.Overlay className="AlertDialogOverlay" />
                                                    <AlertDialog.Content className="AlertDialogContent font-dmsans bg-">
                                                        <AlertDialog.Title className="AlertDialogTitle text-lg font-bold text-darkbrown">Are you sure you want to remove this book from your collection?</AlertDialog.Title>
                                                        {/* <AlertDialog.Description className="AlertDialogDescription">
                                                        This action cannot be undone. This will permanently delete your account and remove your
                                                        data from our servers.
                                                        </AlertDialog.Description> */}
                                                        <div className="flex gap-3 justify-end mt-5">
                                                        <AlertDialog.Cancel asChild>
                                                            <button className="Button bg-creaminput hover:bg-cream py-1 px-2 rounded-lg hover:cursor-pointer text-darkbrown shadow-md shadow-lightbrown hover:shadow-none">Oops! No, keep it.</button>
                                                        </AlertDialog.Cancel>
                                                        <AlertDialog.Action asChild>
                                                            <button 
                                                                className="Button bg-auburn hover:bg-darkauburn hover:cursor-pointer py-1 px-2 rounded-lg text-lightcream shadow-md shadow-lightbrown hover:shadow-none" 
                                                                onClick={(e) => removeBook(book.id)}
                                                            >Yes, remove book.</button>
                                                        </AlertDialog.Action>
                                                        </div>
                                                    </AlertDialog.Content>
                                                    </AlertDialog.Portal>
                                                </AlertDialog.Root>
                                            ) : null
                                        }
                                        <Link
                                            href={`/mybooks/${book.id}`}
                                            key={book.id}
                                            className="flex flex-col justify-between items-center gap-5 my-4 py-4 px-3"
                                        >   
                                            

                                            <Image 
                                                src={book.volumeInfo.imageLinks?.thumbnail} 
                                                alt={book.volumeInfo.title} 
                                                className="aspect-auto"
                                                width={150}
                                                height={100}
                                            />
                                            <div className="flex flex-col justify-center items-center mx-5 w-[80%] text-darkbrown">
                                                <p className="text-center text-[1.1rem] text-wrap font-bold">{book.volumeInfo.title}</p>
                                                <p className="text-wrap text-center mt-3"> - {book.volumeInfo.authors.join(', ')}</p>
                                            </div>
                                        </Link> 
                                    </div>
                            
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center text-center h-[75vh] text-darkbrown">
                            <div className="grid place-items-center">
                                {/* <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 512 512"
                                    className="w-[110px] max-md:w-[100px] max-sm:w-[85px] m-auto text-darkbrown"
                                >
                                    <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                </svg> */}

                                <Image src="/face-frown-regular 1.png" alt="sad face" width={100} height={100}/>
                                <h1 className="text-3xl max-md:text-2xl font-bold pt-6">There are no books in your collection yet</h1>
                                <p className="text-[1.5rem] max-md:text-[1.3rem] pt-2">Let&apos;s change that!</p>
                                <Link href="/home"><button className="px-4 py-2 text-xl  rounded-xl bg-lightbrown text-white hover:bg-mediumbrown shadow-md shadow-mediumbrown hover:shadow-none font-bold mt-8 transition ease-in-out">Add Books to my Collection</button></Link>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </section>
    );
}