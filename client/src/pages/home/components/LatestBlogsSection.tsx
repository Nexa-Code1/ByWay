import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import { blogs } from "@/utils/blogs";
import BlogCard from "./BlogCard";
import LatestBlogCard from "./LatestBlogCard";

function LatestBlogsSection() {
    return (
        <SectionContainer className="flex flex-col items-center justify-between gap-4 text-gray-800">
            <h2 className="font-bold text-2xl">Latest blogs and resources</h2>
            <TextDescription>
                Read latest articles that have been written by our instructors
            </TextDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-8">
                <LatestBlogCard key={blogs[0].id} blog={blogs[0]} />
                {blogs.slice(1).map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </SectionContainer>
    );
}

export default LatestBlogsSection;
