import SectionContainer from "@/components/shared/SectionContainer";
import { instructorStats } from "@/utils/becomeInstructorData";

function Stats() {
    return (
        <div className="bg-primary-100 py-6 px-2">
            <SectionContainer className="flex flex-wrap items-center md:justify-between gap-4 my-0!">
                {instructorStats.map((state) => (
                    <div className="w-50 flex gap-2" key={state.label}>
                        <div
                            style={{ color: state.iconColor, fontSize: "24px" }}
                        >
                            {state.icon}
                        </div>
                        <div>
                            <p className="text-xl text-primary-700 font-semibold">
                                {state.value}
                            </p>
                            <p className="text-gray-600 font-medium">
                                {state.label}
                            </p>
                        </div>
                    </div>
                ))}
            </SectionContainer>
        </div>
    );
}

export default Stats;
