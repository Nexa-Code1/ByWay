import type { ICourseContent } from "@/types";
import CourseDataEle from "./CourseDataEle";

type CourseContentSummaryProps = {
    courseContent: ICourseContent[];
};

function CourseContentSummary({ courseContent }: CourseContentSummaryProps) {
    return (
        <div className="border-y border-y-gray-300 py-4 my-6">
            <CourseDataEle
                title="Course Content"
                value={courseContent.length.toString() + " sections"}
            />
            {courseContent && courseContent.length > 0 ? (
                <div className="ml-4 mt-4 space-y-2 text-sm">
                    {courseContent.map((section, index) => (
                        <div
                            key={section._id}
                            className="border-l-2 border-blue-200 pl-4 mb-6"
                        >
                            <div className="font-medium text-blue-700 mb-1">
                                Section {index + 1}: {section.section}
                            </div>
                            {section.lessons && section.lessons.length > 0 ? (
                                <div className="ml-4 space-y-1">
                                    {section.lessons.map(
                                        (lesson, lessonIndex) => (
                                            <div
                                                key={lesson._id}
                                                className="text-gray-600"
                                            >
                                                Lesson {lessonIndex + 1}:{" "}
                                                {lesson.title}
                                            </div>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="ml-4 text-red-600 font-medium">
                                    ⚠️ No lessons added - Add lessons to publish
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-gray-500 italic mt-4">
                    No content added
                </div>
            )}
        </div>
    );
}

export default CourseContentSummary;
