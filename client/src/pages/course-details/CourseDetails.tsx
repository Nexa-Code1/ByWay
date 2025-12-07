import { useParams } from "react-router";

import SectionContainer from "@/components/shared/SectionContainer";
import CourseDescription from "./components/CourseDescription";
import CourseRequirements from "./components/CourseRequirements";
import CourseIntroduction from "./components/CourseIntroduction";
import CourseInstructorInfo from "./components/CourseInstructorInfo";
import CourseReviews from "./components/CourseReviews";
import CourseContent from "./components/CourseContent";
import AddCourseToCart from "./components/CourseActions";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import PageSpinner from "@/components/shared/PageSpinner";
import RelatedCourses from "./components/RelatedCourses";

function CourseDetails() {
    const params = useParams();
    const { courseDetails, isLoading, error } = useGetCourseDetails(
        params.courseId
    );

    if (isLoading) return <PageSpinner />;
    if (!isLoading && (error || !courseDetails || !courseDetails.course))
        return;

    return (
        <>
            <section className="lg:bg-gray-900 lg:text-gray-100">
                <SectionContainer className="w-fit! lg:w-full! relative my-0!">
                    <CourseIntroduction courseDetails={courseDetails.course} />
                    <AddCourseToCart courseDetails={courseDetails.course} />
                </SectionContainer>
            </section>
            <SectionContainer className="w-fit lg:w-full mt-4! mb-0!">
                <div className="max-w-xl flex flex-col gap-8 mb-12">
                    <CourseContent content={courseDetails.content} />
                    <CourseInstructorInfo
                        instructor={courseDetails.course.instructor}
                    />
                    <CourseRequirements
                        requirements={courseDetails.course.requirements}
                    />
                    <CourseDescription
                        description={courseDetails.course.description}
                    />
                    <CourseReviews />
                </div>
                <RelatedCourses
                    categorySlug={courseDetails.course.category.slug}
                    courseId={courseDetails.course._id}
                />
            </SectionContainer>
        </>
    );
}

export default CourseDetails;
