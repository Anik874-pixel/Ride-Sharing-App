"use client";

// import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues by ensuring component is mounted before reading theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid mismatches between server and client render

  return (
    <>
      {/* Light Mode Gradient */}
      {theme === "light" && (
        <div
          className="absolute inset-0 -z-10 h-full w-full bg-white 
          [background-image:linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]
          [background-size:6rem_4rem]"
        >
          <div
            className="absolute inset-0 
            [background-image:radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
          ></div>
        </div>
      )}

      {/* Dark Mode Gradient */}
      {theme === "dark" && (
        <div
          className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 
          [background-image:radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
        ></div>
      )}

      {/* Hero Section */}
      <section className="text-gray-600 body-font relative overflow-x-hidden">
        <div className="container mx-auto flex px-14 py-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-50">
              Your Ride Your Way
            </h1>
            <p className="mb-8 text-2xl leading-relaxed dark:text-gray-200">
              Experience seamless transportation at your fingertips. Book a ride
              and reach your destination with comfort and style.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                <Link href="/login">Login</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pl-0.5"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </button>

              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
                <Link href="/register">Register</Link>
              </button>
            </div>
          </div>

          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <Image className="object-cover object-center rounded" alt="hero" src="/landingPhoto.png"  width={600} height={600} />
    </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="text-gray-600 dark:text-gray-50 body-font overflow-hidden">
  <div className="container px-16 py-24 mx-auto">
    <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">

    <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-900 text-blue-500 dark:text-blue-300 mb-5 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 dark:text-gray-50 text-lg title-font font-medium mb-3">
          Experienced Drivers
          </h2>
          <p className="leading-relaxed text-base text-gray-600 dark:text-gray-300">
          Connect with drivers instantly and get real-time ride tracking at your fingertips.

          </p>
          
        </div>
      </div>
      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-900 text-blue-500 dark:text-blue-300 mb-5 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 dark:text-gray-50 text-lg title-font font-medium mb-3">
          Premium Service
          </h2>
          <p className="leading-relaxed text-base text-gray-600 dark:text-gray-300">
            Experience top-class rides with our premium services, ensuring safety and comfort.
          </p>
          
        </div>
      </div>

      <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-900 text-blue-500 dark:text-blue-300 mb-5 flex-shrink-0">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10"
            viewBox="0 0 24 24"
          >
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 dark:text-gray-50 text-lg title-font font-medium mb-3">
            Ride Share
          </h2>
          <p className="leading-relaxed text-base text-gray-600 dark:text-gray-300">
          Our exclusive ride-sharing feature helps you reach your destination at a lower cost..
          </p>
          
        </div>
      </div>

     
    </div>
  </div>
</section>
      
{/* Testimonials Section */}
<section className="text-gray-600 dark:text-neutral-50 body-font">
  <div className="container px-5 py-20 mx-auto">
    <h1 className="text-3xl font-medium title-font text-gray-900 dark:text-neutral-50 mb-12 text-center">Testimonials</h1>
    <div className="flex flex-wrap -m-4">
      <div className="p-4 md:w-1/2 w-full">
        <div className="h-full bg-gray-100 dark:bg-neutral-950 p-8 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed mb-6 dark:text-neutral-50">This ride-sharing platform has completely changed how I commute! The fares are affordable, the rides are always on time, and the app is super easy to use. I love the seamless experience and the polite drivers!</p>
          <a className="inline-flex items-center">
            <img alt="testimonial" src="https://i.pravatar.cc/107" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font font-medium text-gray-900 dark:text-neutral-50">Rohan Verma</span>
              <span className="text-gray-500 text-sm dark:text-neutral-50">Software Engineer</span>
            </span>
          </a>
        </div>
      </div>
      <div className="p-4 md:w-1/2 w-full">
        <div className="h-full bg-gray-100 dark:bg-neutral-950 p-8 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="block w-5 h-5 text-gray-400 mb-4" viewBox="0 0 975.036 975.036">
            <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
          </svg>
          <p className="leading-relaxed mb-6 dark:text-neutral-50">An excellent alternative to traditional cabs! I’ve saved so much money using the ride-share feature, and the cars are always clean and comfortable. Highly recommend it to anyone looking for a hassle-free travel option!</p>
          <a className="inline-flex items-center">
            <img alt="testimonial" src="https://i.pravatar.cc/106" className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"/>
            <span className="flex-grow flex flex-col pl-4">
              <span className="title-font font-medium text-gray-900 dark:text-neutral-50">Rahul Banerjee</span>
              <span className="text-gray-500 text-sm dark:text-neutral-50">Doctor</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Footer Section */}
<footer className="text-gray-600 dark:text-neutral-50 body-font">
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-neutral-50">
      
      <span className="ml-3 text-xl">RideShare</span>
    </a>
    <p className="text-sm text-gray-500 dark:text-neutral-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 dark:sm:border-neutral-700 sm:py-2 sm:mt-0 mt-4">© 2025 RideShare —
      <a href="https://twitter.com/knyttneve" className="text-gray-600 dark:text-neutral-400 ml-1" rel="noopener noreferrer" target="_blank">@Aniket</a>
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
     
      <a href="https://github.com/Anik874-pixel" className="cursor-pointer ml-3 text-gray-500 dark:text-neutral-400">
        <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.805 1.304 3.49.997.108-.775.418-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.52.105-3.17 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 013.005-.403c1.02.005 2.04.138 3.005.403 2.295-1.552 3.3-1.23 3.3-1.23.645 1.65.24 2.867.12 3.17.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.1.81 2.22 0 1.61-.015 2.91-.015 3.31 0 .315.21.69.825.57C20.565 22.093 24 17.598 24 12.297c0-6.627-5.373-12-12-12z"></path>
        </svg>
      </a>
      <a href="www.linkedin.com/in/aniket874" className="cursor-pointer ml-3 text-gray-500 dark:text-neutral-400">
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
      </a>
     
    </span>
  </div>
</footer>


    </>
  );
}
