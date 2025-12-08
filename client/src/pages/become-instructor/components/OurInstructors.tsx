import { Button } from "antd";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import { ourInstructors } from "@/utils/becomeInstructorData";
import ourInstructorsImg from "@/assets/images/our-instructors.png";
import quotesImg from "@/assets/images/quotes.png";

function OurInstructors() {
    const [reviewIndex, setReviewIndex] = useState(0);

    const { title, subTitle, reviews } = ourInstructors;

    function handleIncreaseReviewIndex() {
        setReviewIndex((index) =>
            reviewIndex === 0 ? reviews.length - 1 : index - 1
        );
    }

    function handleDecreaseReviewIndex() {
        setReviewIndex((index) =>
            index === reviews.length - 1 ? 0 : index + 1
        );
    }

    return (
        <SectionContainer>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="md:w-1/2 max-w-lg flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary-700">
                        {title}
                    </h1>
                    <TextDescription className="text-gray-800">
                        {subTitle}
                    </TextDescription>
                    <div className="bg-[#F1F7FD] p-8 text-primary-700">
                        <img src={quotesImg} alt="quotes" />
                        <p className="font-medium my-4">
                            {reviews[reviewIndex]}
                        </p>
                        <p className="text-sm">
                            {reviewIndex + 1} / {reviews.length}
                        </p>
                    </div>
                    {reviews.length > 1 && (
                        <div className="flex gap-4 items-center">
                            <Button
                                className="w-10! h-10! bg-primary-700! text-white! disabled:bg-gray-300!"
                                onClick={handleIncreaseReviewIndex}
                            >
                                <LeftOutlined />
                            </Button>
                            <Button
                                className="w-10! h-10! bg-primary-700! text-white! disabled:bg-gray-300!"
                                onClick={handleDecreaseReviewIndex}
                            >
                                <RightOutlined />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="md:w-1/2 max-w-lg">
                    <img
                        src={ourInstructorsImg}
                        alt="Rules and regulations"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
            </div>
        </SectionContainer>
    );
}

export default OurInstructors;
