import NoContent from "@/components/shared/NoContent";
import emptyFolderImg from "@/assets/images/empty-folder.png";

function StudentCourses() {
    return (
        <NoContent
            imgSrc={emptyFolderImg}
            title="No Courses"
            subTitle="Start Purchasing courses"
        />
    );
}

export default StudentCourses;
