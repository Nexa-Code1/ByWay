import SectionContainer from "@/components/shared/SectionContainer";
import ContactForm from "./components/ContactForm";

function ContactUs() {
    return (
        <SectionContainer className="mt-4!">
            <h1 className="font-semibold text-xl mb-8 text-center">
                Get In Touch
            </h1>
            <div className="max-w-4xl shadow-xl rounded-md overflow-hidden p-8 mx-auto">
                <ContactForm />
            </div>
        </SectionContainer>
    );
}

export default ContactUs;
