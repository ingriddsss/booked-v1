import Link from "next/link";
import Image from "next/image";

export const Welcome = () => {
    return(
        <section className="h-screen flex justify-center items-center">
            <div className="text-center">
                <Image className="max-w-[500px] w-[85%] m-auto" src="/booked-full-cropped.png" alt="booked logo" width={500} height={100}/>
                <p className="font-dmsans text-3xl text-darkbrown mt-4">your personal literary hub.</p>
                <Link href="/home"><button className="font-dmsans font-bold tracking-wide text-[1.5rem] bg-lightbrown text-white py-1 px-4 rounded-xl mt-10 transition hover:bg-mediumbrown hover:ease-in-out shadow-lg shadow-slate-400 hover:shadow-none">check it out</button></Link>
            </div>
        </section>
    );
}