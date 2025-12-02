import { useNavigate } from "react-router";
import { Button, Tag } from "antd";

import type { IBlog } from "@/types";
import TextDescription from "@/components/shared/TextDescription";

type LatestBlogCardProps = {
    blog: IBlog;
};

function LatestBlogCard({ blog }: LatestBlogCardProps) {
    const navigate = useNavigate();

    return (
        <div className="row-span-1 md:row-span-3 flex flex-col items-start">
            <div className="rounded-xl overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover shadow-md"
                />
            </div>
            <Tag className="uppercase bg-primary-700! text-gray-100! rounded-full! px-6! mt-4!">
                new
            </Tag>
            <h3 className="font-semibold text-base text-gray-800 my-4">
                {blog.title}
            </h3>
            <TextDescription>{blog.content}</TextDescription>
            <Button
                type="text"
                className="p-0! hover:bg-transparent! underline text-gray-600! hover:text-gray-800!"
                onClick={() => navigate(`/blogs/${blog.id}`)}
            >
                Read more
            </Button>
        </div>
    );
}

export default LatestBlogCard;
