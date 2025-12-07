import CourseDetailWrapper from "./CourseDetailWrapper";

type CourseRequirementsProps = {
    requirements: string[];
};

function CourseRequirements({ requirements }: CourseRequirementsProps) {
    return (
        <CourseDetailWrapper title="Requirements">
            <ul className="list-disc list-inside">
                {requirements.map((el) => (
                    <li key={el}>{el}</li>
                ))}
            </ul>
        </CourseDetailWrapper>
    );
}

export default CourseRequirements;
