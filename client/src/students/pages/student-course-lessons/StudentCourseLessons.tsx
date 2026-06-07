import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";

import CourseContent from "@/components/shared/CourseContent";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import Error from "@/components/shared/Error";
import Spinner from "@/components/shared/Spinner";
import SectionContainer from "@/components/shared/SectionContainer";
import { useGetLessonById } from "@/hooks/courseSectionLessons/useGetLessonById";
import { useGetFirstIncompleteLesson } from "@/hooks/courseSectionLessons/useGetFirstIncompleteLesson";
import { useUpdateLesson } from "@/hooks/courseSectionLessons/useUpdateLesson";
import type { ICourseContent, ICourseSectionLesson } from "@/types";

function StudentCourseLessons() {
    const [searchParams, setSearchParams] = useSearchParams();
    const lessonId = searchParams.get("lessonId");

    const { courseId } = useParams();
    const { courseDetails, isLoading, error } = useGetCourseDetails(courseId);

    const {
        lesson: lessonById,
        isLoading: isLoadingLessonById,
        error: getLessonByIdError,
    } = useGetLessonById(lessonId || "");

    const {
        lesson: firstIncompleteLesson,
        isLoading: isLoadingFirstIncomplete,
        error: getFirstIncompleteError,
    } = useGetFirstIncompleteLesson(!lessonId ? courseId : undefined);

    const lesson = lessonId ? lessonById : firstIncompleteLesson;
    const isLoadingLesson = lessonId
        ? isLoadingLessonById
        : isLoadingFirstIncomplete;
    const getLessonError = lessonId
        ? getLessonByIdError
        : getFirstIncompleteError;

    const { updateLesson } = useUpdateLesson();

    useEffect(() => {
        if (!lessonId && firstIncompleteLesson) {
            setSearchParams({ lessonId: firstIncompleteLesson._id });
        }
    }, [lessonId, firstIncompleteLesson, setSearchParams]);

    const handleVideoEnded = () => {
        if (lesson && !lesson.isCompleted) {
            updateLesson({
                courseId: lesson.course_Id,
                sectionId: lesson.section_ID,
                lessonId: lesson._id,
                updatedLesson: {
                    isCompleted: true,
                },
            });

            // Find and navigate to the next incomplete lesson
            if (courseDetails?.content) {
                const allLessons = courseDetails.content.flatMap(
                    (section: ICourseContent) => section.lessons,
                );
                const currentIndex = allLessons.findIndex(
                    (l: ICourseSectionLesson) => l._id === lesson._id,
                );
                const nextLesson = allLessons
                    .slice(currentIndex + 1)
                    .find((l: ICourseSectionLesson) => !l.isCompleted);

                if (nextLesson) {
                    setSearchParams({ lessonId: nextLesson._id });
                }
            }
        }
    };

    if (isLoading)
        return <Spinner size="large" className="text-primary-700! mt-30!" />;
    if (!isLoading && (error || !courseDetails)) return <Error />;
    if (!courseId) return <Error />;

    return (
        <SectionContainer className="mt-4! grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2 w-full h-96 mt-8 mb-10 flex flex-col items-center justify-center">
                {isLoadingLesson ? (
                    <Spinner size="large" className="text-primary-700!" />
                ) : !isLoadingLesson && (getLessonError || !lesson) ? (
                    <Error />
                ) : lesson ? (
                    <>
                        <video
                            className="w-full h-full bg-black"
                            controls
                            onEnded={handleVideoEnded}
                        >
                            <source src={lesson.link} type="video/mp4" />
                        </video>
                        <h1 className="self-start mt-6 font-semibold text-xl">
                            {lesson.title}
                        </h1>
                        <p className="self-start mt-2">{lesson.description}</p>
                    </>
                ) : null}
            </div>

            <CourseContent
                courseId={courseId}
                content={courseDetails?.content}
                isPublic={false}
                progress={courseDetails?.progress}
            />
        </SectionContainer>
    );
}

export default StudentCourseLessons;
