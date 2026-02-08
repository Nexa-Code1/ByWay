import HorizontalCarousel from "@/components/shared/HorizontalCarousel";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import type { ICategory } from "@/types";
import BlogCategoryCard from "./BlogCategoryCard";

function BlogList() {
    const { categories, isLoading, error } = useGetAllCategories();

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-12!" />;

    if (!isLoading && (error || !categories || !categories?.categories.length))
        return;

    return (
        <SectionContainer className="my-4!">
            <SectionLayout
                title="Reading blog list"
                linkPath="/search?type=blogs"
                cols="grid-cols-1"
            >
                <HorizontalCarousel className="[&_.slick-arrow]:text-black!">
                    {categories.categories.map((category: ICategory) => (
                        <div key={category._id} className="flex!">
                            <BlogCategoryCard category={category} />
                        </div>
                    ))}
                </HorizontalCarousel>
            </SectionLayout>
        </SectionContainer>
    );
}

export default BlogList;
