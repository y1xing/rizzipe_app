
"use client";
import Link from "next/link";
import NoWordLogo from "../../assets/NoWordLogo.png";
import Image from "next/image";
import styles from "./NavBar.module.css";
// Import avatar from MUI
import Avatar from '@mui/material/Avatar';
import ProfileIcon from "../../assets/ProfileIcon.png";



export default function NavBar() {
    return (


        <nav

            className="border-gray-200 sticky top-0 z-50 background-blur-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pt-6"
            >
                <Link href="/" className="flex items-center">

                    <Image
                        src={NoWordLogo}
                        alt="NoWord Logo"
                        width={70}
                        height={24}
                        priority
                        className={" mr-3"}
                    />


                    {/*<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Rizzipe</span>*/}
                </Link>
                <div className="flex md:order-2">
                    <Link href="/profile">
                    <Image
                        alt="Profile"
                        src={ProfileIcon}
                        width={70}
                        height={70}
                    />
                    </Link>
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div className="bg-transparent items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-colfont-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                        <li>
                            <Link href="/" className="block font-semibold mt-5 py-2 pl-3 pr-4 text-white bg-orange-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link href="/generate" className="block py-2 pl-3 pr-4 rounded  ">
                                <div className={styles.generateBtn}>
                                    <span className="text-light-900"
                                    >Generate</span>
                                </div>


                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>


    );
}



