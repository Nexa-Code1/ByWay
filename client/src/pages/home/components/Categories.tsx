import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import { categories } from "@/utils/categories";
import CategoryBtn from "./CategoryBtn";

function Categories() {
    return (
        <SectionContainer className="flex flex-col justify-between gap-2 gradiant-bg rounded-none xl:rounded-2xl shadow-xl p-6 md:p-10">
            <h2 className="font-bold text-2xl text-gray-100">
                Explore <span className="text-orange-100">courses</span>
            </h2>
            <TextDescription className="text-gray-100">
                Find all what you want
            </TextDescription>
            <div className="w-full flex flex-wrap gap-4 items-center justify-center mt-4">
                {categories.map((category) => (
                    <CategoryBtn key={category.slug} category={category} />
                ))}
            </div>
        </SectionContainer>
    );
}

export default Categories;
