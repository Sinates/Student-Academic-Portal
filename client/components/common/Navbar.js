import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-transparent p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src="/assets/logo-hilcoe.jpg" alt="logo" className="w-[150px]" />
            </div>
            <div className="flex items-center space-x-4">
                {/* Link to Home Section */}
                <a href="#home" className="text-black">Home</a>
                {/* Link to About Section */}
                <a href="#about" className="text-black">About</a>
                {/* Link to Contact Section */}
                <a href="#contact" className="text-black">Contact Us</a>
                {/* Sign In Button */}
                <Link href="/signin" passHref>
                    <button className="text-blue-500 hover:text-white bg-transparent border border-blue-500 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-blue-500 hover:border-blue-500">
                        Sign In
                    </button>
                </Link>
                {/* Sign Up Button */}
                <Link href="/signup" passHref>
                    <button className="text-blue-500 hover:text-white bg-transparent border border-blue-500 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-300 hover:bg-blue-500 hover:border-blue-500">
                        Sign Up
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

