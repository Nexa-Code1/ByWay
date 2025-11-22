import SectionContainer from "../../shared/SectionContainer";
import About from "./About";
import ContactUs from "./ContactUs";
import GetHelp from "./GetHelp";
import Programs from "./Programs";

function Footer() {
    return (
        <footer className="bg-gray-900 text-primary-100">
            <SectionContainer className="justify-start py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(4,auto)] gap-4 md:gap-10 my-2!">
                <About />
                <GetHelp />
                <Programs />
                <ContactUs />
            </SectionContainer>
        </footer>
    );
}

export default Footer;
