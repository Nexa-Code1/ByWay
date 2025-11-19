import logoIcon from "../../assets/images/icon.png";

type LogoProps = {
    textStyle?: string;
};

function Logo({ textStyle = "text-primary-100" }: LogoProps) {
    return (
        <div className="flex items-center">
            <img src={logoIcon} alt="Byway's logo" />
            <h1 className={`font-semibold ${textStyle}`}>Byway</h1>
        </div>
    );
}

export default Logo;
