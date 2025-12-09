import CourseCard from "@/components/shared/CourseCard";

function CoursesResult({ courses }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
            ))}
        </div>
    );
}

export default CoursesResult;
