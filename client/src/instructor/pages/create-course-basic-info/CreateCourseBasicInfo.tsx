import { useNavigate } from "react-router";
import { Form, type FormProps } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo, useState } from "react";

import type { ICourseDataBasicInfo } from "@/types";
import PriceInput from "./components/PriceInput";
import CourseRequirements from "./components/CourseRequirements";
import CategorySelect from "./components/CategorySelect";
import CourseImageUpload from "./components/CourseImageUpload";
import FormActions from "@/instructor/components/common/FormActions";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

function CreateCourseBasicInfo() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const {
        state: {
            title,
            subTitle,
            price,
            description,
            requirements,
            image,
            imagePreview,
            category,
            courseContent,
            isEditMode,
        },
        updateBasicInfo,
        resetCourse,
    } = useNewCourseContext();

    const [curRequirements, setCurRequirements] =
        useState<string[]>(requirements);

    const initialValues: ICourseDataBasicInfo = useMemo(
        () => ({
            title,
            subTitle,
            price,
            description,
            requirements,
            category,
            imagePreview,
            content: courseContent,
            image: image, // Ensure the actual file is in initial values
        }),
        [
            title,
            subTitle,
            price,
            description,
            requirements,
            category,
            imagePreview,
            courseContent,
            image,
        ],
    );

    // Update form values when in edit mode and data changes
    useEffect(() => {
        if (isEditMode && form) {
            form.setFieldsValue({
                title,
                subTitle,
                price,
                description,
                requirements,
                category,
                imagePreview,
                content: courseContent,
                image: image,
            });
        }
    }, [
        isEditMode,
        title,
        subTitle,
        price,
        description,
        requirements,
        category,
        imagePreview,
        courseContent,
        image,
        form,
    ]);

    const onFinish: FormProps<ICourseDataBasicInfo>["onFinish"] = (values) => {
        // Update context with form values
        updateBasicInfo({
            ...values,
            requirements: curRequirements,
        });

        // Navigate to curriculum page
        navigate("/instructor/create-course/curriculum");
    };

    const handleCancel = () => {
        resetCourse();
        navigate("/instructor/my-courses");
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
                requirements={curRequirements}
                onSetCurRequirements={setCurRequirements}
            />

            {/* Course image */}
            <CourseImageUpload
                onSetFile={(file) => updateBasicInfo({ image: file })}
                onSetPreviewUrl={(preview) =>
                    updateBasicInfo({ imagePreview: preview })
                }
                previewUrl={imagePreview}
            />

            {/* Submit form */}
            <div className="self-end flex items-center gap-4 mt-4! mb-10!">
                <FormActions
                    isLoading={false}
                    onCancel={handleCancel}
                    submitLabel={isEditMode ? "Update & Next" : "Save & Next"}
                />
            </div>
        </Form>
    );
}

export default CreateCourseBasicInfo;
