import { Link } from "react-router";
import SVG from "react-inlinesvg";

import TextDescription from "@/components/shared/TextDescription";
import type { ICategory } from "@/types";
import Card from "@/components/shared/Card";
import iconPlaceholder from "@/assets/icons/icon-placeholder.svg";

type CategoryCardProps = {
    category: ICategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
    const lang = "en";

    return (
        <Card className="h-52! p-4 m-3! shadow-lg rounded-xl text-center hover:scale-105 transition-transform">
            <Link to={`/search?category=${category.slug}`}>
                <div
                    className="relative w-14 h-14 mb-4 mx-auto flex items-center justify-center"
                    style={{ fill: category.color, color: category.color }}
                >
                    <SVG
                        src={category.icon || iconPlaceholder}
                        className="rounded-sm w-6 h-6"
                        title={category.name[lang]}
                        cacheRequests={false}
                        preProcessor={(code) =>
                            code.replace(
                                /fill=(["'])(.*?)\1/g,
                                'fill="currentColor"'
                            )
                        }
                    />
                    <div
                        className="absolute w-full h-full top-1/2 left-1/2 -translate-1/2 -z-10 rounded-sm"
                        style={{
                            backgroundColor: category.color,
                            opacity: 0.3,
                        }}
                    />
                </div>
                <h3 className="mb-2 font-bold text-gray-800">
                    {category.name[lang]}
                </h3>
                <TextDescription>{category.description[lang]}</TextDescription>
            </Link>
        </Card>
    );
}
