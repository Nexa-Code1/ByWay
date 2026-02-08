import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Form, type FormProps } from "antd";
import DOMPurify from "dompurify";

import { useGetAllCategories } from "@/hooks/categories/useGetAllCategories";
import { useCreateBlog } from "@/hooks/blogs/useCreateBlog";
import BlogImageUpload from "./components/BlogImageUpload";
import BlogBasicInfo from "./components/BlogBasicInfo";
import type { IBlogFormData } from "@/types";
import { useGetBlogById } from "@/hooks/blogs/useGetBlogById";
import FormActions from "@/instructor/components/common/FormActions";
import Spinner from "@/components/shared/Spinner";
import { useUpdateBlog } from "@/hooks/blogs/useUpdateBlog";

function CreateBlog() {
    const location = useLocation();
    const [form] = Form.useForm();

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { createBlog, isCreatingBlog } = useCreateBlog();
    const { updateBlog, isUpdatingBlog } = useUpdateBlog();
    const { blogRes, isLoading, error } = useGetBlogById(
        location.state?.blogId,
    );
    const { categories, isLoading: categoriesLoading } = useGetAllCategories();

    useEffect(() => {
        if (!isLoading && !error && blogRes) {
            setPreviewUrl(blogRes.data.image);
            form.setFieldsValue({
                title: blogRes.data.title,
                description: blogRes.data.description,
                content: blogRes.data.content,
                category: blogRes.data.category._id,
            });
        }
    }, [isLoading, error, blogRes, form]);

    const initialValues: IBlogFormData = {
        title: "",
        description: "",
        content: "",
        category: "",
        image: null,
    };

    if (isLoading)
        return <Spinner className="text-primary-700! mt-50!" size="large" />;

    const onFinish: FormProps<IBlogFormData>["onFinish"] = async (values) => {
        // Sanitize blog content
        const cleanHtml = DOMPurify.sanitize(values.content, {
            USE_PROFILES: { html: true },
        });

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("content", cleanHtml);
        formData.append("category", values.category);
        if (imageFile) formData.append("image", imageFile);

        if (location.state?.blogId) {
            updateBlog({ id: location.state.blogId, formData });
        } else {
            createBlog(formData, {
                onSuccess: () => {
                    form.resetFields();
                    setImageFile(null);
                    setPreviewUrl(null);
                },
            });
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            className="space-y-6 mb-10!"
        >
            {/* Blog Image Upload */}
            <BlogImageUpload
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                setImageFile={setImageFile}
            />

            {/* Blog Basic Info */}
            <BlogBasicInfo
                categories={categories?.categories}
                categoriesLoading={categoriesLoading}
            />

            {/* Form Actions */}
            <FormActions
                isLoading={isCreatingBlog || isUpdatingBlog}
                cancelLink="/instructor/my-blogs"
                submitText={
                    location.state?.blogId ? "Update Blog" : "Create Blog"
                }
            />
        </Form>
    );
}

export default CreateBlog;
