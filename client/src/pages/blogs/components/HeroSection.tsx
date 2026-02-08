import { useNavigate } from "react-router";
import { Button } from "antd";

import SectionContainer from "@/components/shared/SectionContainer";
import blogHeroImg from "@/assets/images/blog-1.jpg";

function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="bg-primary-100">
            <SectionContainer className="my-0! py-12! flex flex-col md:flex-row justify-between items-center text-center md:text-start gap-8">
                <div className="order-2 md:order-0 w-full md:w-1/2 flex flex-col justify-between">
                    <p className="text-sm font-medium">
                        Insights That Empower Builders, Designers, and Thinkers
                    </p>
                    <h1 className="text-xl text-primary-700 font-semibold my-4">
                        Explore practical articles, expert opinions, and
                        real-world experiences written by professionals who love
                        sharing what they know.
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Whether you’re here to learn something new, sharpen your
                        skills, or stay ahead in your field, our articles are
                        crafted to deliver value—not fluff.
                    </p>
                    <div className="mt-4 flex justify-center md:justify-start items-center gap-4">
                        <Button
                            type="default"
                            className="bg-transparent! border-primary-700! text-primary-700! hover:-translate-y-0.5"
                            onClick={() => navigate("/search?type=blogs")}
                        >
                            Read Articles
                        </Button>
                        <Button
                            type="primary"
                            className="bg-primary-700! hover:-translate-y-0.5"
                            onClick={() => navigate("/become-instructor")}
                        >
                            Publish With Us
                        </Button>
                    </div>
                </div>
                <div className="rounded-md overflow-hidden w-full md:w-1/2 max-w-md max-h-60">
                    <img
                        src={blogHeroImg}
                        alt="Creating, publishing, reading blogs in different topics"
                        className="w-full h-full object-cover"
                    />
                </div>
            </SectionContainer>
        </div>
    );
}

export default HeroSection;
