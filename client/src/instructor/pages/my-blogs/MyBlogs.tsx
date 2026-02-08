import { useSearchParams } from "react-router";

import Error from "@/components/shared/Error";
import Spinner from "@/components/shared/Spinner";
import { useGetInstructorBlogs } from "@/hooks/blogs/useGetInstructorBlogs";
import { useUserProfile } from "@/hooks/user/useUserProfile";
import InstructorBlogCard from "./components/InstructorBlogCard";
import type { IBlog } from "@/types";
import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";
import ItemsPagination from "@/components/shared/ItemsPagination";

function MyBlogs() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const {
        userProfile,
        isLoading: isLoadingUser,
        error: userProfileError,
    } = useUserProfile();

    const {
        blogsRes,
        isLoading: isLoadingBlogs,
        error: blogsError,
    } = useGetInstructorBlogs({
        instructorId: userProfile?.user._id,
        page,
    });

    if (
        !isLoadingBlogs &&
        !isLoadingUser &&
        (userProfileError || blogsError || !blogsRes)
    )
        <Error />;

    return (
        <div>
            {isLoadingUser || isLoadingBlogs ? (
                <Spinner className="text-primary-700! mt-50!" size="large" />
            ) : !blogsRes?.data?.blogs?.length ? (
                <NoContent
                    imgSrc={emptyFolderImg}
                    title="No Blogs Found"
                    subTitle="Empty blogs list. Start creating one."
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                        {blogsRes.data.blogs.map((blog: IBlog) => (
                            <InstructorBlogCard blog={blog} key={blog._id} />
                        ))}
                    </div>
                    <ItemsPagination pagination={blogsRes.data.pagination} />
                </>
            )}
        </div>
    );
}

export default MyBlogs;
