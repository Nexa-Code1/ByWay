import { Link } from "react-router";
import { getHelp } from "../../../utils/footerData";

function GetHelp() {
    return (
        <div>
            <h2 className="font-medium text-xl mb-2">Get Help</h2>
            <ul className="flex flex-col gap-1">
                {getHelp.map((ele) => (
                    <li className="text-sm">
                        <Link
                            to={ele.path}
                            className="hover:text-orange-100 cursor-pointer transition-all"
                        >
                            {ele.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GetHelp;
