import CourseDataEle from "./CourseDataEle";

type CourseImagePreviewProps = {
    imagePreview: string;
};

function CourseImagePreview({ imagePreview }: CourseImagePreviewProps) {
    return (
        <div>
            <CourseDataEle
                title="Course Image"
                value={
                    <img
                        src={imagePreview}
                        alt="Course preview"
                        className="w-32 h-24 object-cover rounded"
                    />
                }
            />
        </div>
    );
}

export default CourseImagePreview;
