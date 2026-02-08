import parse from "html-react-parser";
import { format } from "date-fns";
import { Link, useParams } from "react-router";

import { useGetBlogById } from "@/hooks/blogs/useGetBlogById";
import PageSpinner from "@/components/shared/PageSpinner";
import Error from "@/components/shared/Error";
import SectionContainer from "@/components/shared/SectionContainer";
import UserAvatar from "@/components/layout/navbar/UserAvatar";
import RelatedBlogs from "./components/RelatedBlogs";

function BlogDetails() {
    const { blogId } = useParams();
    const { blogRes, isLoading, error } = useGetBlogById(blogId);

    if (isLoading) return <PageSpinner />;
    if (!isLoading && (error || !blogRes)) return <Error />;

    const blog = blogRes.data;

    return (
        <SectionContainer className="my-0!">
            <img src={blog.image} />
            <h1 className="text-primary-700 font-semibold text-xl my-6">
                {blog.title}
            </h1>
            <p>{parse(blog.content)}</p>
            <div className="flex items-center justify-between gap-4 my-8 pb-6 border-b border-b-gray-300">
                <div className="flex gap-2 items-center">
                    <UserAvatar
                        avatar={blog.instructor.image}
                        userName={blog.instructor.firstName}
                        size={40}
                    />
                    <Link
                        to={`/instructors/${blog.instructor._id}`}
                        className="font-semibold flex-1 text-sm hover:text-primary-700"
                    >
                        {blog.instructor.firstName} {blog.instructor.lastName}
                    </Link>
                </div>

                <div className="flex flex-col text-sm">
                    <p>
                        <span className="font-medium inline-block w-24">
                            Updated at:{" "}
                        </span>
                        <span>
                            {format(new Date(blog.updatedAt), "dd MMM yyyy")}
                        </span>
                    </p>
                    <p>
                        <span className="font-medium inline-block w-24">
                            Seen:{" "}
                        </span>
                        <span>{blog.views}</span>
                    </p>
                </div>
            </div>

            <RelatedBlogs
                currentBlogId={blog._id}
                category={blog.category.slug}
            />
        </SectionContainer>
    );
}

export default BlogDetails;
