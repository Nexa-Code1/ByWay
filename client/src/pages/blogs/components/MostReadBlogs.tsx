import BlogCard from "@/components/shared/BlogCard";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetBlogs } from "@/hooks/blogs/useGetBlogs";
import type { IBlog } from "@/types";

function MostReadBlogs() {
    const { blogsRes, isLoading, error } = useGetBlogs({
        limit: 4,
        sortBy: "views",
    });

    if (isLoading) return <Spinner />;
    if (!isLoading && (error || !blogsRes)) return;

    return (
        <SectionLayout title="Most Read">
            {blogsRes.data.blogs.map((blog: IBlog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </SectionLayout>
    );
}

export default MostReadBlogs;
