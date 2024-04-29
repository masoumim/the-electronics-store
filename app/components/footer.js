// footer.js - This component is used to display the footer of the app.
'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faMastodon } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-6 md:flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-semibold">The Electronics Store</h3>
                    <p className="mt-2">&copy; 2024 All rights reserved.</p>
                </div>
                <div className="mt-6 md:mt-0">
                    <h3 className="text-xl font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="/about" className="hover:text-blue-500 hover:underline">About Us</a></li>
                        <li><a href="/contact" className="hover:text-blue-500 hover:underline">Contact Us</a></li>
                        <li><a href="/faq" className="hover:text-blue-500 hover:underline">FAQ</a></li>
                    </ul>
                </div>
                <div className="mt-6 md:mt-0">
                    <h3 className="text-xl font-semibold">Legal</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="/terms" className="hover:text-blue-500 hover:underline">Terms of Service</a></li>
                        <li><a href="/privacy" className="hover:text-blue-500 hover:underline">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="mt-6 md:mt-0">
                    <h3 className="text-xl font-semibold">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                            className="hover:text-blue-500">
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                            className="hover:text-sky-500">
                            <FontAwesomeIcon icon={faXTwitter} size="lg" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                            className="hover:text-pink-500">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="https://www.mastodon.social" target="_blank" rel="noopener noreferrer"
                            className="hover:text-blue-700">
                            <FontAwesomeIcon icon={faMastodon} size="lg" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
