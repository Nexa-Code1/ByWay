import { programs } from "../../../utils/footerData";

function Programs() {
    return (
        <div>
            <h2 className="font-medium text-xl mb-2">Programs</h2>
            <ul className="flex flex-col gap-1">
                {programs.map((ele) => (
                    <li key={ele} className="text-sm">
                        {ele}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Programs;
