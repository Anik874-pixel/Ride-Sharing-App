"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export default function Header() {
  return (
    <>
    
<header className="bg-white dark:bg-gray-800 text-gray-600 body-font shadow-md">
  <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
    <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 cursor-pointer">
      <span className="ml-3 text-2xl font-bold text-blue-600 dark:text-gray-300"
      >
        RideShare
        </span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center mr-3 text-base justify-center">
      <a
        href="/login"
        className="mr-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-pink-500 hover:to-red-600 text-white font-medium shadow-lg rounded-lg px-6 py-2 text-lg transition-all duration-300 transform hover:scale-105"
      >
         Login
      </a>
      <Button className="bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-medium shadow-lg rounded-lg px-6 py-2 text-lg transition-all duration-300 transform hover:scale-105">
        <a href="/register" className="text-white">
        Register
        </a>

    </Button>
  </nav>
  <ModeToggle />
</div>
</header>
    </>
  )
}