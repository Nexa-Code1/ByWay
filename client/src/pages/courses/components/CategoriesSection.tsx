import Spinner from "@/components/shared/Spinner";
import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import type { ICategory } from "@/types";
import CategoryCard from "./CategoryCard";
import SectionLayout from "@/components/shared/SectionLayout";
import HorizontalCarousel from "@/components/shared/HorizontalCarousel";

function CategoriesSection() {
    const { categories, isLoading, error } = useGetAllCategories();

    if (isLoading)
        return <Spinner size="large" className="mx-auto! text-primary-700!" />;
    if (!isLoading && (error || !categories || !categories.categories.length))
        return;

    return (
        <SectionLayout
            cols="grid-cols-1"
            title="Choice favourite course from top category"
        >
            <HorizontalCarousel className="[&_.slick-arrow]:text-black!">
                {categories.categories.map((category: ICategory) => (
                    <div key={category._id} className="flex!">
                        <CategoryCard category={category} />
                    </div>
                ))}
            </HorizontalCarousel>
        </SectionLayout>
    );
}

export default CategoriesSection;
