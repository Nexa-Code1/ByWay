import Error from "@/components/shared/Error";
import Spinner from "@/components/shared/Spinner";
import { useGetInstructorCourses } from "@/hooks/courses/useGetInstructorCourses";
import type { ICourseDetails } from "@/types";
import InstructorCourseItem from "./InstructorCourseItem";

type InstructorCoursesProps = {
    instructorId: string;
};

function InstructorCourses({ instructorId }: InstructorCoursesProps) {
    const { instructorCourses, isLoading, error } = useGetInstructorCourses(
        instructorId,
        ""
    );

    return (
        <section className="bg-white col-span-3 sm:col-span-2 flex flex-col justify-center">
            {isLoading ? (
                <Spinner
                    size="large"
                    className="text-primary-700! self-center"
                />
            ) : !isLoading && (error || !instructorCourses) ? (
                <Error />
            ) : (
                <>
                    <h2 className="font-semibold text-lg mb-4">
                        Courses (
                        {instructorCourses.courses.length
                            .toString()
                            .padStart(2, "0")}
                        )
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {instructorCourses.courses.map(
                            (course: ICourseDetails) => (
                                <InstructorCourseItem
                                    course={course}
                                    key={course._id}
                                />
                            )
                        )}
                    </div>
                </>
            )}
        </section>
    );
}

export default InstructorCourses;
