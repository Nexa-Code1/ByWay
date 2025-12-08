import { Button } from "antd";

import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import becomeInstructorImg from "@/assets/images/become-instructor.png";
import { introduction } from "@/utils/becomeInstructorData";

function HeroSection() {
    return (
        <SectionContainer className="my-0! pb-0! mt-4!">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="md:w-1/2 max-w-lg flex flex-col gap-4 items-center md:items-start text-center md:text-start">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary-700">
                        {introduction.title}
                    </h1>
                    <TextDescription className="text-primary-700">
                        {introduction.subTitle}
                    </TextDescription>
                    <Button
                        type="primary"
                        className="bg-primary-700! mx-auto md:mx-0"
                    >
                        Get Started
                    </Button>
                </div>
                <div className="md:w-1/2 max-w-lg">
                    <img
                        src={becomeInstructorImg}
                        alt="Become instructor"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
            </div>
        </SectionContainer>
    );
}

export default HeroSection;
