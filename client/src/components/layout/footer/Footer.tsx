import About from "./About";
import ContactUs from "./ContactUs";
import GetHelp from "./GetHelp";
import Programs from "./Programs";

function Footer() {
    return (
        <footer className="bg-gray-900 text-primary-100">
            <div className="container mx-auto justify-start px-2 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-10">
                <About />
                <GetHelp />
                <Programs />
                <ContactUs />
            </div>
        </footer>
    );
}

export default Footer;
