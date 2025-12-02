import { useState } from "react";
import { useNavigate } from "react-router";
import {
    ArrowRightOutlined,
    LeftOutlined,
    RightOutlined,
    StarFilled,
} from "@ant-design/icons";
import { Button } from "antd";

import SectionContainer from "@/components/shared/SectionContainer";
import { testimonials } from "@/utils/homePageData";
import ArrowBtn from "./ArrowBtn";
import TextDescription from "@/components/shared/TextDescription";

function TestimonialSection() {
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
    const navigate = useNavigate();

    return (
        <SectionContainer className="grid grid-cols-1 md:grid-cols-2">
            <div className="max-w-md text-gray-800">
                <p className="relative pl-20 before:w-16 before:h-px before:bg-gray-800 before:absolute before:left-0 before:top-1/2 -before:translate-y-1/2">
                    Testimonial
                </p>
                <h2 className="font-bold text-2xl text-gray-800 my-4">
                    What They Say?
                </h2>
                <TextDescription>
                    Byway has got more than 100k positive ratings from our users
                    around the world.
                </TextDescription>
                <TextDescription>
                    Some of the students and teachers were greatly helped by the
                    Skilline.
                </TextDescription>
                <TextDescription>
                    Your feedback can make a difference — share your experience
                    with the courses you’ve taken to help future learners.
                </TextDescription>
                <TextDescription>
                    Want to explore more reviews? Select a course below to read
                    feedback from other students.
                </TextDescription>
                <Button
                    shape="round"
                    size="large"
                    className="group border-gray-800! text-gray-800! pr-0! hover:bg-gray-800! hover:text-gray-100! mt-4 capitalize text-base! border-r-0!"
                    onClick={() => navigate("/courses")}
                >
                    <span>see more feedbacks</span>
                    <ArrowRightOutlined className="h-full aspect-square border border-gray-800 rounded-full flex items-center justify-center group-hover:border-gray-100" />
                </Button>
            </div>

            <div className="flex flex-col">
                {/* Feedback image and scroll */}
                <div className="relative mx-auto sm:mx-0 w-72 sm:w-80 h-96 shadow-lg">
                    <img
                        src={testimonials[currentFeedbackIndex].image}
                        alt={testimonials[currentFeedbackIndex].userName}
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                    {currentFeedbackIndex !== testimonials.length - 1 && (
                        <ArrowBtn
                            className="right-0 translate-x-1/2"
                            icon={<RightOutlined />}
                            onClick={() =>
                                setCurrentFeedbackIndex((i) => i + 1)
                            }
                        />
                    )}
                    {currentFeedbackIndex !== 0 && (
                        <ArrowBtn
                            className="left-0 -translate-x-1/2"
                            icon={<LeftOutlined />}
                            onClick={() =>
                                setCurrentFeedbackIndex((i) => i - 1)
                            }
                        />
                    )}
                </div>

                {/* Feedback card */}
                <div className="relative z-10 self-end -mt-20 ml-20 max-w-md bg-white rounded-lg shadow-lg border-l-8 border-[#F67766] p-6 text-gray-800 text-sm">
                    <p className="border-l-2 border-gray-300 px-6">
                        "{testimonials[currentFeedbackIndex].comment}"
                    </p>
                    <div className="flex items-center justify-between px-6 mt-8">
                        <p>{testimonials[currentFeedbackIndex].userName}</p>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                                <StarFilled
                                    key={i}
                                    style={{ color: "#FBA333" }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}

export default TestimonialSection;
