import { Link } from "react-router";
import type { ICategory } from "../../../types";

type CategoryBtnProps = {
    category: ICategory;
};

function CategoryBtn({ category }: CategoryBtnProps) {
    const lang = "en";

    return (
        <Link
            to={`/courses?category=${category.slug}`}
            className="shadow-xs px-8 py-2 rounded-full text-gray-800 hover:bg-orange-100 hover:text-gray-100 transition-all bg-primary-100 font-medium"
        >
            {category.name[lang]}
        </Link>
    );
}

export default CategoryBtn;
