import React from 'react'
import { assets } from '../assets/assets/assets'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const Footer = () => {
    
  return (
    
        <footer className="px-6 pt-8 md:px-16 lg:px-36 w-full text-black">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10">
                <div className="md:max-w-96">
                    <img alt="" className="h-11" src={assets.logo} />
                    <p className="mt-6 text-sm">
                        Crafted with innovation by Ronak Jha — Gen AI is a personal initiative aimed at making the power of generative AI accessible, efficient, and impactful. Designed with passion and built for the future.
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg" alt="google play" className="h-10 w-auto border border-white rounded" />
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg" alt="app store" className="h-10 w-auto border border-white rounded" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold mb-5">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li className='cursor-pointer'><Link to={Navbar}>Home</Link> </li>
                            <li><a href="footer.jsx">About us</a></li>
                            <li><a href="footer.jsx">Contact us</a></li>
                           
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+1-234-567-890</p>
                            <p>genai@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-sm pb-5">
                Copyright {new Date().getFullYear()} © <a href="">GenAI</a>. All Right Reserved.
            </p>
        </footer>
    
  )
}

export default Footer
