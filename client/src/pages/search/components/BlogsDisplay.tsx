import { useSearchParams } from "react-router";

import { useGetBlogs } from "@/hooks/blogs/useGetBlogs";
import SectionContainer from "@/components/shared/SectionContainer";
import Spinner from "@/components/shared/Spinner";
import Error from "@/components/shared/Error";
import ItemsPagination from "@/components/shared/ItemsPagination";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import BlogCard from "@/components/shared/BlogCard";
import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import type { IBlog } from "@/types";

function BlogsDisplay() {
    const [searchParams] = useSearchParams();

    const {
        blogsRes,
        isLoading: isLoadingBlogs,
        error: blogsError,
    } = useGetBlogs({
        search: searchParams.get("searchTitle") || "",
        category: searchParams.get("category") || "",
        limit: ITEMS_PER_PAGE,
        page: Number(searchParams.get("page")) || 1,
    });

    if (!isLoadingBlogs && blogsError) return <Error />;

    return (
        <SectionContainer className="mt-4!">
            {isLoadingBlogs ? (
                <Spinner className="text-primary-700! mt-20!" size="large" />
            ) : !isLoadingBlogs &&
              blogsRes &&
              !blogsRes?.data?.blogs?.length ? (
                <NoContent
                    imgSrc={emptyFolderImg}
                    title="No Blogs"
                    subTitle="Cannot find blogs. Please try again."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {blogsRes?.data?.blogs.map((blog: IBlog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                    {blogsRes?.data?.pagination && (
                        <ItemsPagination
                            pagination={blogsRes.data.pagination}
                        />
                    )}
                </>
            )}
        </SectionContainer>
    );
}

export default BlogsDisplay;
