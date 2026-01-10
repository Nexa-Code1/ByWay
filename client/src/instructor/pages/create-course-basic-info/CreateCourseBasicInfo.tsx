import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Form, type FormProps } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import type { ICourseDataBasicInfo } from "@/types";
import PriceInput from "./components/PriceInput";
import CourseRequirements from "./components/CourseRequirements";
import CategorySelect from "./components/CategorySelect";
import UploadCourseImage from "./components/UploadCourseImage";
import { useCreateNewCourse } from "@/hooks/courses/useCreateNewCourse";
import { useUpdateCourse } from "@/hooks/courses/useUpdateCourse";
import { useDeleteCourse } from "@/hooks/courses/useDeleteCourse";
import Spinner from "@/components/shared/Spinner";
import { useGetCourseDetails } from "@/hooks/courses/useGetCourseDetails";

function CreateCourseBasicInfo() {
    const [cookies, setCookie, removeCookie] = useCookies(["draftCourseId"]);
    const { draftCourseId } = cookies;

    const { courseDetails, isLoading, error } =
        useGetCourseDetails(draftCourseId);
    const { createNewCourse, isCreatingNewCourse } = useCreateNewCourse();
    const { updateCourse, isUpdatingCourse } = useUpdateCourse();
    const { deleteCourse, isDeletingCourse } = useDeleteCourse();

    const [form] = Form.useForm();

    const [requirements, setRequirements] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null); // for UI preview

    useEffect(() => {
        if (!isLoading && !error && courseDetails) {
            setRequirements(courseDetails.course.requirements);
            setPreviewUrl(courseDetails.course.image);
        }
    }, [isLoading, error, courseDetails]);

    const initialValues: ICourseDataBasicInfo = {
        title: courseDetails?.course.title || "",
        subTitle: courseDetails?.course.subTitle || "",
        price: courseDetails?.course.price || 100,
        description: courseDetails?.course.description || "",
        requirements,
        content: [],
        category: courseDetails?.course.category._id || "",
        image: courseDetails?.course.image || null,
    };

    const onFinish: FormProps<ICourseDataBasicInfo>["onFinish"] = async (
        values
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
            const newCourse = await createNewCourse(courseData);
            setCookie("draftCourseId", newCourse.course._id);
        }
    };

    async function handleDeleteCourse() {
        await deleteCourse(draftCourseId);
        removeCookie("draftCourseId");
        form.resetFields();
    }

    return (
        <Form
            form={form}
            name="create-course-basic-information"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={initialValues}
            className="flex flex-col w-full [&_.ant-form-item-label]:w-22! [&_.ant-form-item-label]:text-start!"
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

            <div className="grid grid-cols-3 items-center gap-6">
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
            <UploadCourseImage
                onSetFile={setFile}
                previewUrl={previewUrl}
                onSetPreviewUrl={setPreviewUrl}
            />

            {/* Submit form */}
            <div className="self-end flex items-center gap-4 mt-4! mb-10!">
                {draftCourseId && (
                    <Button
                        htmlType="button"
                        className="text-error-800! border-error-800! mt-0! hover:-translate-y-0.5"
                        onClick={handleDeleteCourse}
                        disabled={isDeletingCourse}
                    >
                        {isDeletingCourse ? <Spinner size="small" /> : "Delete"}
                    </Button>
                )}
                <AppSubmitBtn
                    isLoading={isCreatingNewCourse || isUpdatingCourse}
                    type="primary"
                    className="max-w-36! bg-orange-100!"
                >
                    {draftCourseId ? "update" : "save & next"}
                </AppSubmitBtn>
            </div>
        </Form>
    );
}

export default CreateCourseBasicInfo;
