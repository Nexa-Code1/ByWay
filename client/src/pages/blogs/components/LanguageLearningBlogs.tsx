import BlogCard from "@/components/shared/BlogCard";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetBlogs } from "@/hooks/blogs/useGetBlogs";
import type { IBlog } from "@/types";

function LanguageLearningBlogs() {
    const { blogsRes, isLoading, error } = useGetBlogs({
        category: "language-learning",
        limit: 4,
    });

    if (isLoading) return <Spinner />;
    if (!isLoading && (error || !blogsRes)) return;

    return (
        <SectionLayout
            title="Language Learning"
            linkPath="/search?type=blogs&category=language-learning"
        >
            {blogsRes.data.blogs.map((blog: IBlog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </SectionLayout>
    );
}

export default LanguageLearningBlogs;
