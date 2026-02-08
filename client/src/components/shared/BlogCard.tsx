import { useState } from "react";
import { EyeFilled } from "@ant-design/icons";

import blogImgPlaceholder from "@/assets/images/placeholder_view.svg";
import type { IBlog } from "@/types";
import Card from "@/components/shared/Card";
import TextDescription from "@/components/shared/TextDescription";
import UserAvatar from "@/components/layout/navbar/UserAvatar";
import UnderlineLink from "./UnderlineLink";

type BlogCardProps = {
    blog: IBlog;
    className?: string;
};

function BlogCard({ blog, className }: BlogCardProps) {
    // const lang = "en";
    const [image, setImage] = useState(blog.image);

    return (
        <Card className={`text-start! hover:scale-none! ${className}`}>
            <div className="w-full h-40">
                <img
                    src={image}
                    onError={() => setImage(blogImgPlaceholder)}
                    alt="course image"
                    className="w-full h-full object-cover object-center rounded-md"
                />
            </div>
            <h3 className="font-semibold text-sm text-gray-800 my-4">
                {blog.title}
            </h3>
            <div className="flex gap-2 items-center text-sm">
                <UserAvatar
                    avatar={blog.instructor.image}
                    userName={blog.instructor.firstName}
                    size={30}
                />
                <p className="font-medium text-xs flex-1">
                    {blog.instructor.firstName}
                </p>
            </div>
            <TextDescription className="flex-1! text-xs! mt-4">
                {blog.description}
            </TextDescription>

            <div className="flex items-center justify-between">
                <UnderlineLink
                    to={`/blogs/${blog._id}`}
                    className="w-fit! p-0! text-xs! text-gray-500! hover:-translate-y-0.5"
                >
                    Read more
                </UnderlineLink>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                    <EyeFilled />
                    <p>{blog.views}</p>
                </div>
            </div>
        </Card>
    );
}

export default BlogCard;
