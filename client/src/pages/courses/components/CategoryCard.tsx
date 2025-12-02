import { Link } from "react-router";
import SVG from "react-inlinesvg";

import TextDescription from "@/components/shared/TextDescription";
import type { ICategory } from "@/types";
import Card from "@/components/shared/Card";

type CategoryCardProps = {
    category: ICategory;
};

export default function CategoryCard({ category }: CategoryCardProps) {
    console.log(category);
    const lang = "en";

    return (
        <Card className="max-w-64 mx-auto p-4 shadow-lg rounded-xl text-center hover:scale-105 transition-transform">
            <Link to={`/courses?category=${category.slug}`}>
                <div
                    className="relative w-14 h-14 mb-4 mx-auto flex items-center justify-center"
                    style={{ color: category.color }}
                >
                    <SVG
                        src={category.icon}
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
