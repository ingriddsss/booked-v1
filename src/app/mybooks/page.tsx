import { MyBooksCollection } from "@/components/MyBooksCollection";
import { Navbar } from "@/components/Navbar";

export default function BookCollection() {
    return(
        <div className="bg-lightcream h-screen"> 
            <Navbar />
            <MyBooksCollection />
        </div>
    );
}