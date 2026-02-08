import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Form, type FormProps } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

import type { ICourseDataBasicInfo } from "@/types";
import PriceInput from "./components/PriceInput";
import CourseRequirements from "./components/CourseRequirements";
import CategorySelect from "./components/CategorySelect";
import CourseImageUpload from "./components/CourseImageUpload";
import { useCreateNewCourse } from "@/hooks/courses/useCreateNewCourse";
import { useUpdateCourse } from "@/hooks/courses/useUpdateCourse";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";
import FormActions from "@/instructor/components/common/FormActions";
import Spinner from "@/components/shared/Spinner";

function CreateCourseBasicInfo() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const draftCourseId = location.state?.draftCourseId;

    const { courseDetails, isLoading, error } =
        useGetCourseDetails(draftCourseId);
    const { createNewCourse, isCreatingNewCourse } = useCreateNewCourse();
    const { updateCourse, isUpdatingCourse } = useUpdateCourse();

    const [requirements, setRequirements] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // for UI preview

    useEffect(() => {
        if (!isLoading && !error && courseDetails) {
            setRequirements(courseDetails.course.requirements);
            setPreviewUrl(courseDetails.course.image);

            // Update form fields with course data
            form.setFieldsValue({
                title: courseDetails.course.title,
                subTitle: courseDetails.course.subTitle,
                price: courseDetails.course.price,
                description: courseDetails.course.description,
                category: courseDetails.course.category._id,
            });
        }
    }, [isLoading, error, courseDetails, form]);

    if (isLoading)
        return <Spinner className="text-primary-700! mt-50!" size="large" />;

    const initialValues: ICourseDataBasicInfo = {
        title: "",
        subTitle: "",
        price: 100,
        description: "",
        requirements,
        content: [],
        category: "",
        image: null,
    };

    const onFinish: FormProps<ICourseDataBasicInfo>["onFinish"] = async (
        values,
    ) => {
        const courseData = {
            ...values,
            requirements,
            content: [],
            image: file,
            imagePreview: previewUrl,
        };
        if (draftCourseId)
            updateCourse({
                courseId: draftCourseId,
                updatedCourseData: courseData,
            });
        else {
            createNewCourse(courseData, {
                onSuccess: (courseData) =>
                    navigate("/instructor/create-course/curriculum", {
                        state: { draftCourseId: courseData._id },
                    }),
            });
        }
    };

    return (
        <Form
            form={form}
            name="create-course-basic-information"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={initialValues}
            className="flex flex-col w-full [&_.ant-form-item-label]:w-24! [&_.ant-form-item-label]:text-start!"
        >
            {/* Course title input */}
            <Form.Item<ICourseDataBasicInfo>
                name="title"
                rules={[
                    {
                        required: true,
                        message: "Please input your a course title!",
                    },
                ]}
                label="Title"
            >
                <Input placeholder="Your course title" />
            </Form.Item>

            {/* Course subtitle input */}
            <Form.Item<ICourseDataBasicInfo>
                name="subTitle"
                rules={[
                    {
                        required: true,
                        message: "Please input course subTitle!",
                    },
                ]}
                label="Subtitle"
            >
                <Input placeholder="Your course subtitle" />
            </Form.Item>

            <div className="grid grid-cols-5 items-center gap-4">
                {/* Price input */}
                <PriceInput />
                {/* Select Category input */}
                <CategorySelect />
            </div>

            {/* Description input */}
            <Form.Item<ICourseDataBasicInfo>
                name="description"
                rules={[
                    {
                        required: true,
                        message: "Please input your a course description!",
                    },
                ]}
                label="Description"
            >
                <TextArea
                    placeholder="Your course description"
                    className="min-h-30!"
                />
            </Form.Item>

            {/* Add Course requirement */}
            <CourseRequirements
                requirements={requirements}
                onSetRequirements={setRequirements}
            />

            {/* Course image */}
            <CourseImageUpload
                onSetFile={setFile}
                previewUrl={previewUrl}
                onSetPreviewUrl={setPreviewUrl}
            />

            {/* Submit form */}
            <div className="self-end flex items-center gap-4 mt-4! mb-10!">
                <FormActions
                    isLoading={isCreatingNewCourse || isUpdatingCourse}
                    cancelLink="/instructor/my-courses"
                    submitText="Save & Next"
                />
            </div>
        </Form>
    );
}

export default CreateCourseBasicInfo;
