import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import CategoryBtn from "./CategoryBtn";
import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import type { ICategory } from "@/types";
import Spinner from "@/components/shared/Spinner";
import HorizontalCarousel from "@/components/shared/HorizontalCarousel";

function Categories() {
    const { categories, isLoading, error } = useGetAllCategories();

    if (isLoading)
        return <Spinner size="large" className="text-primary-700!" />;

    if (!isLoading && (error || !categories || !categories?.categories.length))
        return;

    return (
        <SectionContainer className="flex flex-col justify-between gap-2 gradiant-bg rounded-none xl:rounded-2xl shadow-xl p-4 md:p-10">
            <h2 className="font-bold text-2xl text-gray-100">
                Explore <span className="text-orange-100">courses</span>
            </h2>
            <TextDescription className="text-gray-100 mb-6!">
                Find all what you want
            </TextDescription>
            <HorizontalCarousel>
                {categories.categories.map((category: ICategory) => (
                    <div key={category._id} className="flex!">
                        <CategoryBtn category={category} />
                    </div>
                ))}
            </HorizontalCarousel>
        </SectionContainer>
    );
}

export default Categories;
