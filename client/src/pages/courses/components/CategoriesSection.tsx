import Spinner from "@/components/shared/Spinner";
import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import type { ICategory } from "@/types";
import CategoryCard from "./CategoryCard";
import SectionLayout from "../../../components/shared/SectionLayout";

function CategoriesSection() {
    const { categories, isLoading, error } = useGetAllCategories();

    if (isLoading)
        return (
            <Spinner
                size="large"
                className="w-full! mx-auto! text-primary-700!"
            />
        );
    if (!isLoading && (error || !categories || !categories.categories.length))
        return;

    return (
        <SectionLayout title="Choice favourite course from top category">
            {categories.categories.map((category: ICategory) => (
                <CategoryCard category={category} key={category._id} />
            ))}
        </SectionLayout>
    );
}

export default CategoriesSection;
