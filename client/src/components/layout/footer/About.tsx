import Logo from "../../shared/Logo";

function About() {
    return (
        <div className="max-w-96 col-span-2 sm:col-span-3 md:col-span-1">
            <Logo />
            <p className="text-primary-100 text-sm mt-4">
                Empowering learners through accessible and engaging online
                education. Byway is a leading online learning platform dedicated
                to providing high-quality, flexible, and affordable educational
                experiences.
            </p>
        </div>
    );
}

export default About;
