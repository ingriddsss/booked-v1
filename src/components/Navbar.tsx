import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    return(
        <div className="flex justify-between items-center w-[50%] max-w-[1000px] max-md:w-[80%] m-auto pt-6">
            {/* <Link href="/home">
                <Image className="hidden md:block" src="/booked-full.png" alt="booked logo" width={200} height={100}/>
            </Link> */}
            <Link href="/home">
                <Image className="" src="/booked-short.png" alt="booked icon" width={100} height={100}/>
            </Link>
            <Link 
                href='/mybooks'
                className="font-dmsans whitespace-nowrap text-darkbrown text-[1.2rem] w-[fit] text-center hover:font-bold transition ease-in-out"
            >
                My Books
            </Link>
        </div>
    );
}