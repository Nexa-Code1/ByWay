import { useSearchParams } from "react-router";

import type { IBlog } from "@/types";
import { useGetInstructorBlogs } from "@/hooks/blogs/useGetInstructorBlogs";
import BlogCard from "@/components/shared/BlogCard";
import CoursesBlogsLayout from "./CoursesBlogsLayout";
import ItemsPagination from "@/components/shared/ItemsPagination";

type InstructorBlogsProps = {
    instructorId: string;
};

function InstructorBlogs({ instructorId }: InstructorBlogsProps) {
    const [searchParams] = useSearchParams();

    const { blogsRes, isLoading, error } = useGetInstructorBlogs({
        instructorId,
        page: Number(searchParams.get("page")) || 1,
    });

    return (
        <CoursesBlogsLayout
            isLoading={isLoading}
            isError={Boolean(!isLoading && (error || !blogsRes))}
            count={blogsRes?.data?.pagination?.total}
            title="Blogs"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {blogsRes?.data?.blogs?.map((blog: IBlog) => (
                    <BlogCard
                        blog={blog}
                        key={blog._id}
                        className="rounded-none! max-w-full!"
                    />
                ))}
            </div>
            <ItemsPagination pagination={blogsRes?.data?.pagination} />
        </CoursesBlogsLayout>
    );
}

export default InstructorBlogs;
