const Contact = () => {
    return (
        <footer id="contact" className="bg-gray-100 text-gray-800 py-8">
            <div className="container mx-auto flex justify-between items-center">
                {/* Social Media Links */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://t.me/Hilcoeschool" className="text-blue-400 hover:text-blue-600 transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.94 3.8 8.98 8.64 9.28.63.11.86-.27.86-.6v-2.15c-3.5.63-4.25-1.67-4.25-1.67-.57-1.46-1.4-1.85-1.4-1.85-1.14-.78.09-.76.09-.76 1.26.09 1.92 1.3 1.92 1.3 1.12 1.92 2.94 1.36 3.67 1.04.12-.81.44-1.36.8-1.67-2.8-.32-5.76-1.42-5.76-5.02 0-1.11.39-2.02 1.03-2.73-.1-.32-.45-1.3.1-2.7 0 0 .86-.27 2.82 1.05.82-.23 1.7-.34 2.58-.34s1.76.11 2.58.34c1.96-1.32 2.82-1.05 2.82-1.05.55 1.4.2 2.38.1 2.7.64.71 1.03 1.62 1.03 2.73 0 3.61-2.76 4.69-5.38 5.02.42.32.8.94.8 1.9v2.83c0 .33.23.72.87.6C20.2 21.98 24 17.94 24 12c0-5.52-4.48-10-10-10z"/>
                                
                            </svg>
                        </a>
                        {/* Add more social media links here */}
                    </div>
                </div>
                {/* Contact Details */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                    <p>Email:  info@hilcoe.net</p>
                    <p>Phone: +251 111 275039
                         Admission Office </p>
                    <p>
                      Phone: +251 111 564900
                       Reception</p>

                    {/* Add more contact details here */}
                </div>
            </div>
        </footer>
    );
};

export default Contact;
