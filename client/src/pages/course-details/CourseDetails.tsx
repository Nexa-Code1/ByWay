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
    if (!isLoading && (error || !courseDetails)) return;

    return (
        <>
            <section className="lg:bg-gray-900 lg:text-gray-100">
                <SectionContainer className="w-fit! lg:w-full! relative my-0!">
                    <CourseIntroduction courseDetails={courseDetails} />
                    <AddCourseToCart courseDetails={courseDetails} />
                </SectionContainer>
            </section>
            <SectionContainer className="lg:w-full mt-4! mb-0!">
                <div className="max-w-xl flex flex-col gap-8 mb-12 mx-auto lg:mx-0">
                    {courseDetails.content.length > 0 && (
                        <CourseContent content={courseDetails.content} />
                    )}
                    <CourseInstructorInfo
                        instructor={courseDetails.instructor}
                    />
                    <CourseRequirements
                        requirements={courseDetails.requirements}
                    />
                    <CourseDescription
                        description={courseDetails.description}
                    />
                    <CourseReviews
                        rate={courseDetails.rate}
                        reviews={courseDetails.reviews}
                    />
                </div>
                <RelatedCourses
                    categorySlug={courseDetails.category.slug}
                    courseId={courseDetails._id}
                />
            </SectionContainer>
        </>
    );
}

export default CourseDetails;
