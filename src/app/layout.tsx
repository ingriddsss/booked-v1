import type { Metadata } from "next";
import "./globals.css";
import accentfont from 'next/font/local';
import mainfont from 'next/font/local';
import { MyBooksProvider } from "@/context/MyBooksContext";
import { Toaster, toast } from 'sonner';

// const inter = DM_Sans({ subsets: ["latin"] });

// const sequel = accentfont({
//   src: [
//     {
//      path: "../../public/fonts/Sequel-Regular.ttf",
//      weight: "400",
//     },
//   ],
//   variable: "--font-sequel",
// });

const margaret = accentfont({
  src: [
    {
      path: "../../public/fonts/Margaret-Bold.otf",
      weight: "500"
    },
  ],
  variable: "--font-margaret"
})

const dmsans = mainfont({
  src: [
    { 
      path: "../../public/fonts/DMSans_18pt-Regular.ttf",
      weight: "400"
    },
  ],
  variable: "--font-dmsans"
})

export const metadata: Metadata = {
  title: "Booked",
  description: "your personal literary hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Rendering Layout');
  return (
    <html lang="en">
      <body className={`${margaret.variable} ${dmsans.variable} bg-lightcream`}>
          <MyBooksProvider>
            {children}
          </MyBooksProvider>
          <Toaster
            richColors
            expand={true}
            position="bottom-right"
          />
      </body>
    </html>
  );
}
