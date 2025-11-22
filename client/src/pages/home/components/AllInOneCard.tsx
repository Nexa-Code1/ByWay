import TextDescription from "../../../components/shared/TextDescription";
import type { IAllInOneEle } from "../../../types";

type AllInOneCardProps = {
    ele: IAllInOneEle;
};

function AllInOneCard({ ele }: AllInOneCardProps) {
    const lang = "en";

    return (
        <li className="shadow-xl rounded-lg pt-8 pb-4 px-8 relative max-w-80 hover:scale-105 transition-all">
            <div
                className="w-14 h-14 text-gray-100 rounded-full flex items-center justify-center text-2xl absolute top-0 left-1/2 -translate-x-1/2"
                style={{ backgroundColor: ele.iconBgColor }}
            >
                {ele.icon}
            </div>
            <h3 className="text-lg text-gray-800 font-semibold mb-4 mt-16">
                {ele.title[lang]}
            </h3>
            <TextDescription>{ele.content[lang]}</TextDescription>
        </li>
    );
}

export default AllInOneCard;
