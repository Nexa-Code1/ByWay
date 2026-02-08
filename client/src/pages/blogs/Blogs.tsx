import { useGetBlogs } from "@/hooks/blogs/useGetBlogs";
import PageSpinner from "@/components/shared/PageSpinner";
import HeroSection from "./components/HeroSection";
import BlogList from "./components/BlogList";
import BlogCard from "../../components/shared/BlogCard";
import type { IBlog } from "@/types";
import SectionLayout from "@/components/shared/SectionLayout";
import SectionContainer from "@/components/shared/SectionContainer";
import Error from "@/components/shared/Error";

function Blogs() {
    const { blogsRes, isLoading, error } = useGetBlogs({
        category: "language-learning",
        limit: 4,
    });

    if (isLoading) return <PageSpinner />;
    if (!isLoading && (error || !blogsRes)) return <Error />;

    return (
        <>
            <HeroSection />
            <BlogList />
            <SectionContainer className="my-0!">
                <SectionLayout
                    title="Language Learning"
                    linkPath="/search?type=blogs&category=language-learning"
                >
                    {blogsRes.data.blogs.map((blog: IBlog) => (
                        <BlogCard blog={blog} key={blog._id} />
                    ))}
                </SectionLayout>
            </SectionContainer>
        </>
    );
}

export default Blogs;
