import { Link } from "react-router";
import type { ICategory } from "@/types";

type CategoryBtnProps = {
    category: ICategory;
};

function CategoryBtn({ category }: CategoryBtnProps) {
    const lang = "en";

    return (
        <Link
            to={`/search?category=${category.slug}`}
            className="flex-1! shadow-xs! p-2 mx-2 rounded-full text-sm! text-gray-800! hover:bg-orange-100! hover:text-gray-100! transition-all bg-primary-100! font-medium whitespace-nowrap text-center"
        >
            {category.name[lang]}
        </Link>
    );
}

export default CategoryBtn;
