"use client"
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FaStar } from 'react-icons/fa';
import { useMyBooks } from "@/context/MyBooksContext";
// import { CiCircleRemove } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
// import { IoAddCircleOutline } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import local from "next/font/local";
import Image from "next/image";

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


//@ts-ignore
export default function BookInfoPage({ params }) {
    const { myBooks } = useMyBooks();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0); 
    const [numSets, setNumSets] = useState(1);
    const [editOn, setEditOn] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]); // Store selected options per book
    const [inputValues, setInputValues] = useState<string[]>([]); // Store input values per book
    const [textValues, setTextValues] = useState<string[]>(["tell me what you think"]); // Store text values per book

    const selectedBook = myBooks.find((myBook) => myBook.id === params.bookId);

    useEffect(() => {
        const savedRating = localStorage.getItem(`rating_${params.bookId}`);
        if (savedRating) {
            setRating(parseInt(savedRating));
        }
    }, [params.bookId]);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        localStorage.setItem(`rating_${params.bookId}`, newRating.toString());
    };

    useEffect(() => {
        const savedSelectedOptions = localStorage.getItem(`selectedOptions_${params.bookId}`);
        if (savedSelectedOptions && savedSelectedOptions !== "undefined") { // Check for valid string
            setSelectedOptions(JSON.parse(savedSelectedOptions)); // Parse the string to an array
        } else {
            setSelectedOptions([]); // Set to an empty array if no saved options
        }
        
        const savedInputValues = localStorage.getItem(`inputValues_${params.bookId}`);
        if (savedInputValues) {
            setInputValues(JSON.parse(savedInputValues));
        }

        const savedTextValues = localStorage.getItem(`textValues_${params.bookId}`);
        if (savedTextValues) {
            setTextValues(JSON.parse(savedTextValues))
        }

        const savedNumSets = localStorage.getItem(`numSets_${params.bookId}`);
        if (savedNumSets) {
            setNumSets(parseInt(savedNumSets));
        }
    }, [params.bookId]);

    const addSet = () => {
        setNumSets(numSets + 1);
        localStorage.setItem(`numSets_${params.bookId}`, (numSets + 1).toString());
        setInputValues((prev) => {
            const newValues = [...prev, ''];
            localStorage.setItem(`inputValues_${params.bookId}`, JSON.stringify(newValues));
            return newValues;
        });
        setSelectedOptions((prev) => {
            const newOptions = [...prev, 'Ch.'];
            localStorage.setItem(`selectedOptions_${params.bookId}`, JSON.stringify(newOptions));
            return newOptions;
        });
        setTextValues((prev) => {
            const newTexts = [...prev, 'tell me what you think'];
            localStorage.setItem(`textValues_${params.bookId}`, JSON.stringify(newTexts));
            return newTexts;
        });
    }

    const removeSet = (indexToRemove: number) => {
        setNumSets(numSets - 1);
        localStorage.setItem(`numSets_${params.bookId}`, (numSets - 1).toString());
        const newInputValues = inputValues.filter((_: any, index: number) => index !== indexToRemove);
        const newSelectedOptions = selectedOptions.filter((_: any, index: number) => index !== indexToRemove);
        const newTextValues = textValues.filter((_: any, index: number) => index !== indexToRemove);
        
        setInputValues(newInputValues);
        setSelectedOptions(newSelectedOptions);
        setTextValues(newTextValues);
        
        localStorage.setItem(`inputValues_${params.bookId}`, JSON.stringify(newInputValues));
        localStorage.setItem(`selectedOptions_${params.bookId}`, JSON.stringify(newSelectedOptions));
        localStorage.setItem(`textValues_${params.bookId}`, JSON.stringify(newTextValues));
    }

    const handleSelectChange = (e: any, index: any) => {
        const newOptions = [...selectedOptions];
        newOptions[index] = e.target.value;
        setSelectedOptions(newOptions);
        // console.log("Saving to localStorage:", newOptions);
        localStorage.setItem(`selectedOptions_${params.bookId}`, JSON.stringify(newOptions));
    };

    const handleInputChange = (e: any, index: any) => {
        const newValues = [...inputValues];
        newValues[index] = e.target.value;
        setInputValues(newValues);
        // console.log("Saving input to localStorage:", newValues);
        localStorage.setItem(`inputValues_${params.bookId}`, JSON.stringify(newValues));
    };

    const handleTextChange = (e: any, index: any) => {
        const newText = [...textValues];
        newText[index] = e.target.value;
        setTextValues(newText);
        // console.log("Saving note to localStorage:", newText);
        localStorage.setItem(`textValues_${params.bookId}`, JSON.stringify(newText));
    }

    const toggleEdit = () => {
        if (editOn === false) {
            setEditOn(true);
            toast.warning("Editing Mode Active")
        } else {
            setEditOn(false);
            toast.success("Exited Editing Mode")
        }
    }

    // const debug = () => {
    //     console.log(myBooks)
    //     console.log(params.bookId)
    //     console.log(selectedBook)
    //     // console.log(selectedBook.volumeInfo.imageLinks.thumbnail)
    // }

    return(
        <section className="bg-lightcream h-screen">
            <Navbar />
            <section className="font-dmsans flex justify-center items-center gap-20 max-lg:flex-col mt-20 max-md:my-20 max-sm:my-18 h-fit">
                {/* <button onClick={debug}>debug</button> */}

                {selectedBook ? (
                <>
                    <div className="left flex flex-col justify-center items-center w-[30%] max-lg:w-[70%] mb-28 max-lg:mb-0">
                        <Image 
                            src={selectedBook?.volumeInfo.imageLinks.thumbnail} 
                            alt={selectedBook.volumeInfo.title} 
                            className="w-[200px]" 
                            width={200}
                            height={100}
                        />
                        <div className="book-info text-center text-darkbrown">
                            <h3 className="text-2xl font-bold pt-7">{selectedBook.volumeInfo.title}</h3>
                            <p className="text-lg pt-1">{selectedBook.volumeInfo.authors.join(', ')}</p>
                        </div>

                        <div className="star-rating text-center mt-7">
                            <h3 className="text-lg text-darkbrown font-semibold">My Rating:</h3>
                            <div className="stars flex">
                                {[...Array(5)].map((_, i) => {
                                    const ratingValue = i+1;

                                    return (
                                    <label key={_.id}>
                                        <input 
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRatingChange(ratingValue)}
                                        />
                                        <FaStar 
                                            className="star w-[25px] m-[0.15rem] transition-colors duration-300" 
                                            size={30}
                                            color={ratingValue <= (hover || rating) ? "#EBB426" : "#573B37"}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    </label>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* <p className="mt-5">Quote Bank Coming Soon!</p> */}
                    </div>
                    
                    <div className="right flex flex-col justify-center items-center py-8 mb-24 rounded-lg max-w-[550px] w-[40%] max-lg:w-[80%] max-md:w-[85%]">
                        <div className="flex justify-between items-center mb-10 w-[95%]">
                            <div className="flex justify-center items-center">
                                <Image className="w-[70px]" src="/frame_curl_design.png" alt="design" width={70} height={50}/>
                                <p className="font-margaret font-bold text-[1.6rem] pl-4 text-darkbrown">My Notes</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <button 
                                    className=""
                                    onClick={toggleEdit}
                                >
                                    <FiEdit3 
                                        color="#573B37"
                                        size={20}
                                    />
                                </button>
                                
                            <Image className="w-[70px] scale-x-[-1] ml-4" src="/frame_curl_design.png" alt="design" width={200} height={100}/>
                            </div>
                        </div>
                        
                        <div 
                            className="container flex flex-col items-center bg-peachy rounded-lg max-lg:max-h-[70vh] w-[100%] max-h-[60vh] overflow-hidden overflow-y-scroll py-5"
                        >
                            {[...Array(numSets)].map((_, index) => {
                                return (
                                    <div key={_.id} className="flex flex-row justify-center items-center w-full gap-5">
                                    {/* <div key={index} className="numSets py-8 px-5 rounded-lg"> */}
                                        {/* <div className="flex justify-center items-center w-[100%]">
                                            <select
                                                className="bg-slate-100 px-3 py-2 rounded-lg font-bold"
                                                value={selectedOptions[index] || 'Ch.'} // Access selected option for the current book
                                                onChange={(e) => handleSelectChange(e, index)}
                                            >
                                                <option>Ch.</option>
                                                <option>Sect.</option>
                                                <option>Pt.</option>
                                                <option>Act</option>
                                                <option>Pg.</option>
                                            </select>
                                            <input
                                                className="bg-slate-100 w-1/2 px-3 py-2 rounded-lg ml-3"
                                                placeholder="1"
                                                value={inputValues[index] || ''} // Access input value for the current book
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                        </div> */}

                                        <textarea
                                            className="bg-creaminput px-3 py-2 rounded-lg mt-3 w-[80%] h-[150px] text-darkbrown placeholder placeholder-opacity-75"
                                            value={textValues[index] || ''} // Access the text value for the current book
                                            onChange={(e) => handleTextChange(e, index)}
                                        >
                                        </textarea>
                                    {/* </div> */}
                                    
                                    {
                                        editOn ? (
                                            <button 
                                                className="text-mediumbrown hover:text-darkbrown"
                                                onClick={() => removeSet(index)}
                                            >
                                                <FaDeleteLeft 
                                                    size={25}
                                                />
                                            </button>
                                        ) : null
                                    }
                                    
                                    
                                    
                                    </div>
                                );
                            })}
                        
                        
                        </div>

                        {
                                    editOn ? (
                                        <button
                                            className="text-xl text-mediumbrown hover:text-darkbrown transition ease-in-out py-1 px-2 rounded-lg mt-5"
                                            onClick={addSet}
                                        >
                                            <IoAddCircle
                                                size={27}
                                            />
                                        </button>
                                    ) : null
                                }
                        
                
                    </div>

                </>
                ): null}

            </section>
        </section>
    );
}