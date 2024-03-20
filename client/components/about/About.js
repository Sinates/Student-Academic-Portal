const About = () => {
    return (
        <div id="about" className="container mx-auto flex items-center justify-between mt-8">
            {/* Illustration */}
            <div className="w-1/2">
                <img src="/assets/25thAnniversary.jfif" alt="Illustration" className="w-[450px] py-3 " />
            </div>
            {/* Title and Paragraph */}
            <div className="w-1/2 ml-8">
                <h1 className="text-4xl font-bold">About HiLCoE</h1>
                <p className="mt-4">
                HiLCoE is committed to excellence and continuous improvement. It is being recognized as an innovative, dynamic, and exciting community in which to learn, teach and work. HiLCoE is known for industrious educational quality, a student-centered focus, and service beyond the campus. To achieve its vision and mission, HiLCoE has created core value oriented organizational structure.

                At the present time, HiLCoE is offering Undergraduate and Post Graduate Degrees in Computer Science and Software Engineering.
                </p>
            </div>
        </div>
    );
};

export default About;
