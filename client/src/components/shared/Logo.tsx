import logoIcon from "../../assets/images/icon.png";

function Logo() {
    return (
        <div className="flex items-center">
            <img src={logoIcon} alt="Byway's logo" />
            <h1 className="font-semibold text-primary-100">Byway</h1>
        </div>
    );
}

export default Logo;
