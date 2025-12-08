import SectionContainer from "@/components/shared/SectionContainer";
import TextDescription from "@/components/shared/TextDescription";
import { rules } from "@/utils/becomeInstructorData";
import rulesImg from "@/assets/images/instructor-rules.png";

function Rules() {
    return (
        <SectionContainer>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="md:w-1/2 max-w-lg flex flex-col gap-4 items-start">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary-700">
                        {rules.title}
                    </h1>
                    <TextDescription className="text-gray-800">
                        {rules.subTitle}
                    </TextDescription>
                    <ul>
                        {rules.regulations.map((item) => (
                            <li
                                key={item}
                                className="list-disc list-inside text-primary-700 font-medium"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:w-1/2 max-w-lg">
                    <img
                        src={rulesImg}
                        alt="Rules and regulations"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
            </div>
        </SectionContainer>
    );
}

export default Rules;
