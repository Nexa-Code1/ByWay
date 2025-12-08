import SectionContainer from "@/components/shared/SectionContainer";
import { howBecomeInstructor } from "@/utils/becomeInstructorData";

function HowBecomeInstructor() {
    return (
        <div className="bg-primary-100 py-6 px-2">
            <SectionContainer className="my-0! flex flex-col items-center justify-center">
                <h2 className="text-primary-700 text-2xl font-bold mb-8 text-center">
                    {howBecomeInstructor.title}
                </h2>
                <ul className="flex flex-wrap justify-center md:justify-between gap-4">
                    {howBecomeInstructor.steps.map((step) => (
                        <li
                            key={step.label}
                            className="max-w-60 bg-white flex flex-col items-center gap-2 px-8 py-4 text-center text-primary-700 font-medium"
                        >
                            <div
                                style={{
                                    color: step.iconColor,
                                    fontSize: "24px",
                                }}
                            >
                                {step.icon}
                            </div>
                            <p>{step.label}</p>
                        </li>
                    ))}
                </ul>
            </SectionContainer>
        </div>
    );
}

export default HowBecomeInstructor;
