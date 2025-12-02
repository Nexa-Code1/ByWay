import Spinner from "@/components/shared/Spinner";
// import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import type { ICategory } from "@/types";
import CategoryCard from "./CategoryCard";
import SectionLayout from "./SectionLayout";

//! For Testing
import { categories } from "@/utils/categories";
const isLoading = false;

function CategoriesSection() {
    // const { categories, isLoading, error } = useGetAllCategories();

    // if (!isLoading || error || !categories?.categories.length) return;

    return (
        <SectionLayout title="Choice favourite course from top category">
            {isLoading ? (
                <Spinner />
            ) : (
                // categories.categories.map((category: ICategory) => (
                //     <CategoryCard category={category} key={category.id} />
                // ))

                //! For Testing
                categories.map((category: ICategory) => (
                    <CategoryCard category={category} key={category.id} />
                ))
            )}
        </SectionLayout>
    );
}

export default CategoriesSection;
