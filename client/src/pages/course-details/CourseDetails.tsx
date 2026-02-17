import { useParams } from "react-router";

import SectionContainer from "@/components/shared/SectionContainer";
import CourseDescription from "./components/CourseDescription";
import CourseRequirements from "./components/CourseRequirements";
import CourseIntroduction from "./components/CourseIntroduction";
import CourseInstructorInfo from "./components/CourseInstructorInfo";
import CourseReviews from "./components/CourseReviews";
import CourseContent from "./components/CourseContent";
import AddCourseToCart from "./components/CoursePurchasePanel";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import PageSpinner from "@/components/shared/PageSpinner";
import RelatedCourses from "./components/RelatedCourses";

function CourseDetails() {
    const params = useParams();
    const { courseDetails, isLoading, error } = useGetCourseDetails(
        params.courseId,
    );

    if (isLoading) return <PageSpinner />;
    if (!isLoading && (error || !courseDetails || !courseDetails.course))
        return;

    const { course } = courseDetails;

    return (
        <>
            <section className="lg:bg-gray-900 lg:text-gray-100">
                <SectionContainer className="w-fit! lg:w-full! relative my-0!">
                    <CourseIntroduction courseDetails={course} />
                    <AddCourseToCart courseDetails={course} />
                </SectionContainer>
            </section>
            <SectionContainer className="lg:w-full mt-4! mb-0!">
                <div className="max-w-xl flex flex-col gap-8 mb-12 mx-auto lg:mx-0">
                    {course.content.length > 0 && (
                        <CourseContent content={course.content} />
                    )}
                    <CourseInstructorInfo instructor={course.instructor} />
                    <CourseRequirements requirements={course.requirements} />
                    <CourseDescription description={course.description} />
                    <CourseReviews
                        rate={course.rate}
                        reviews={course.reviews}
                    />
                    {/* <video width="320" height="240" controls>
                        <source
                            src={
                                course.content[0].lessons[0].link
                            }
                            type="video/mp4"
                        />
                    </video> */}
                    {/* <iframe
                        width="560"
                        height="315"
                        src={course.content[0].lessons[0].link}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe> */}
                </div>
                <RelatedCourses
                    categorySlug={course.category.slug}
                    courseId={course._id}
                />
            </SectionContainer>
        </>
    );
}

export default CourseDetails;
