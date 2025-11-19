import { contacts, links } from "../../../utils/footerData";

function ContactUs() {
    return (
        <div>
            <h2 className="font-medium text-xl mb-2">Contact Us</h2>
            {Object.entries(contacts).map((ele) => (
                <p className="text-sm" key={ele[0]}>
                    <span className="capitalize">{ele[0]}: </span>
                    <span>{ele[1]}</span>
                </p>
            ))}
            <ul className="flex gap-4 items-center mt-4">
                {links.map((link) => (
                    <li key={link.key}>
                        <a
                            target="_blank"
                            href={link.href}
                            className="text-2xl hover:text-orange-100"
                        >
                            {link.icon}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactUs;
