import Logo from "../shared/Logo";

function ModalHeader() {
    return (
        <header>
            <Logo textStyle="text-gray-800 text-base" />
            <p className="text-gray-800 mt-2">
                Join us and get more benefits. We promise to keep your data
                safely.
            </p>
        </header>
    );
}

export default ModalHeader;
