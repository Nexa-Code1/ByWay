import { CheckCircleFilled } from "@ant-design/icons";

import SectionContainer from "@/components/shared/SectionContainer";
import pageMockupImg from "@/assets/images/landing-page-mockup.jpg";
import TextDescription from "@/components/shared/TextDescription";
import { whyTeachingOnByWay } from "@/utils/becomeInstructorData";

function WhyTeaching() {
    return (
        <SectionContainer>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-primary-700">
                <div className="md:w-1/2 max-w-lg">
                    <img src={pageMockupImg} alt="Landing page mockup" />
                </div>
                <div className="md:w-1/2 max-w-lg flex flex-col gap-4 items-start">
                    <h2 className="font-semibold text-2xl">
                        {whyTeachingOnByWay.title}
                    </h2>
                    <TextDescription>
                        {whyTeachingOnByWay.description}
                    </TextDescription>
                    <ul>
                        {whyTeachingOnByWay.reasons.map((reason) => (
                            <li
                                key={reason.title}
                                className="mb-4 flex items-start gap-4"
                            >
                                <CheckCircleFilled className="text-2xl text-primary-main!" />
                                <div>
                                    <h3 className="font-semibold">
                                        {reason.title}
                                    </h3>
                                    <TextDescription className="text-gray-600">
                                        {reason.description}
                                    </TextDescription>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionContainer>
    );
}

export default WhyTeaching;
