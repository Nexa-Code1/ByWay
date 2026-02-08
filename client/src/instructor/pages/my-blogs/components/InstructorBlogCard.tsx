import { format } from "date-fns";

import imgPlaceholder from "@/assets/images/placeholder_view.svg";
import type { IBlog } from "@/types";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import BlogControlMenu from "./BlogControlMenu";
import UserAvatar from "@/components/layout/navbar/UserAvatar";

type InstructorBlogCardProps = {
    blog: IBlog;
};

function InstructorBlogCard({ blog }: InstructorBlogCardProps) {
    return (
        <div className="flex flex-col shadow-lg overflow-hidden">
            <div className="w-full h-40 overflow-hidden">
                <img
                    src={blog.image || imgPlaceholder}
                    alt={blog.title}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="p-4 flex-1">
                <p className="w-fit p-1 font-medium text-xs bg-primary-100 text-primary-700">
                    {blog.category.name.en}
                </p>
                <h3 className="mt-2 font-medium text-lg line-clamp-2">
                    {blog.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                    {blog.description}
                </p>
            </div>

            <div className="flex items-center gap-4 p-4 border-y border-gray-200 text-gray-600 text-sm">
                <div className="flex items-center gap-1">
                    <EyeOutlined className="text-primary-500!" />
                    <span>{blog.views}</span>
                    <span className="text-gray-400 font-light text-xs">
                        Views
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <CalendarOutlined className="text-primary-500!" />
                    <span className="text-xs">
                        {format(new Date(blog.createdAt), "dd MMM yyyy")}
                    </span>
                </div>
            </div>

            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserAvatar
                        avatar={blog.instructor.image}
                        userName={blog.instructor.firstName}
                        size={30}
                    />
                    <span className="text-sm text-gray-600">
                        {blog.instructor.firstName} {blog.instructor.lastName}
                    </span>
                </div>

                <BlogControlMenu blogId={blog._id} />
            </div>
        </div>
    );
}

export default InstructorBlogCard;
