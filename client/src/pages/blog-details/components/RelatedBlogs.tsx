import BlogCard from "@/components/shared/BlogCard";
import SectionLayout from "@/components/shared/SectionLayout";
import Spinner from "@/components/shared/Spinner";
import { useGetBlogs } from "@/hooks/blogs/useGetBlogs";
import type { IBlog } from "@/types";

type RelatedBlogsProps = {
    currentBlogId: string;
    category: string;
};

function RelatedBlogs({ currentBlogId, category }: RelatedBlogsProps) {
    const { blogsRes, isLoading, error } = useGetBlogs({
        category,
        limit: 5,
    });

    if (isLoading) return <Spinner />;
    if (!isLoading && (error || !blogsRes)) return;

    const blogs = blogsRes.data.blogs
        .filter((blog: IBlog) => blog._id !== currentBlogId)
        .slice(0, 4);

    return (
        <SectionLayout title="Related articles">
            {blogs.map((blog: IBlog) => (
                <BlogCard blog={blog} key={blog._id} />
            ))}
        </SectionLayout>
    );
}

export default RelatedBlogs;
