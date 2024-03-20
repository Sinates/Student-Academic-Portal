import Navbar from "@/components/common/Navbar";
import About from "@/components/about/About";
import Contact from "@/components/contact/Contact";

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-8 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 order-2 lg:order-1 ">
                    {/* Title */}
                    <h1 className="text-4xl font-bold mb-4 text-center">Welcome to HiLCoE</h1>
                    {/* Paragraph */}
                    <p className="text-lg mb-6 text-center">
                    School of your dreams a specialized computer science and technology college and has always placed great emphasis on delivering high-quality education and producing graduates with a good practical knowledge of computing in a wide variety of areas.
                    </p>
                    {/* Button (Apply) */}
                    <div className="flex justify-center">
                        <button className=" w-[450px] bg-blue-500 hover:bg-blue-700 text-white border border-blue-500 hover:text-white hover:border-transparent px-8 py-2 rounded-lg font-semibold transition-all duration-300">
                            Apply Now
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2 order-1 lg:order-2">
                    {/* Illustration */}
                    <img src="/assets/buildingHilcoe.png" alt="Illustration" className="w-full m-4 " />
                </div>
            </div>
            <div className=" my-28 "></div>
            <About />
            <Contact />
        </div>
    );
};

export default LandingPage;


