import Home from "@/components/Home";
import { Navbar } from "@/components/Navbar";

export default function HomePage() {
    return(
        <div className="home bg-lightcream">
            <Navbar />
            <Home />
        </div>
    );
}