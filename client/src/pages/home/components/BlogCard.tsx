import { useNavigate } from "react-router";
import { Button, Tag } from "antd";

import type { IBlog } from "@/types";
import TextDescription from "@/components/shared/TextDescription";

type BlogCardProps = {
    blog: IBlog;
};

function BlogCard({ blog }: BlogCardProps) {
    const navigate = useNavigate();

    return (
        <div className="md:col-start-2 flex gap-4 items-center lg:items-start">
            <div className="relative max-w-48 overflow-hidden rounded-s-md">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-conver shadow-md"
                />
                <Tag className="absolute! bottom-2 right-0 uppercase bg-primary-700! text-gray-100! rounded-full! px-6! border-none!">
                    new
                </Tag>
            </div>
            <div>
                <h3 className="font-semibold text-base text-gray-800">
                    {blog.title}
                </h3>
                <TextDescription className="truncate-text">
                    {blog.content}
                </TextDescription>
                <Button
                    type="text"
                    className="p-0! hover:bg-transparent! underline text-gray-600! hover:text-gray-800!"
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                    Read more
                </Button>
            </div>
        </div>
    );
}

export default BlogCard;
