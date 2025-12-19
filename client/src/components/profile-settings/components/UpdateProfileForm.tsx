import { Form, Select, type FormProps } from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import type { IUpdateProfile, IUser } from "@/types";
import { useUpdateProfile } from "@/hooks/user/useUpdateProfile";

type UpdateProfileFormProps = {
    userInfo: IUser;
    profileImgFile: File | null;
    privateOption?: boolean;
};

function UpdateProfileForm({
    userInfo,
    profileImgFile,
    privateOption = true,
}: UpdateProfileFormProps) {
    const { updateProfile, isPending: isUpdating } = useUpdateProfile();
    const [form] = Form.useForm();

    const { firstName, lastName, headLine, bio, language, isPrivate, links } =
        userInfo;
    const facebookLink = links.find((link) => link.name === "facebook");
    const instagramLink = links.find((link) => link.name === "instagram");

    const initialValues: IUpdateProfile = {
        firstName,
        lastName,
        headLine,
        bio,
        language,
        isPrivate,
        facebookLink: facebookLink?.link,
        instagramLink: instagramLink?.link,
    };

    const onFinish: FormProps<IUpdateProfile>["onFinish"] = async (values) => {
        updateProfile({
            updatedValues: { ...values, isPrivate: values.isPrivate || false },
            file: profileImgFile,
        });
    };

    return (
        <Form
            form={form}
            name="updateProfileForm"
            onFinish={onFinish}
            autoComplete="off"
            initialValues={initialValues}
            className="w-full [&_.ant-form-item-label]:w-22! [&_.ant-form-item-label]:text-start!"
        >
            {/* Name inputs */}
            <div className="w-full flex gap-4">
                <Form.Item<IUpdateProfile>
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your first name!",
                        },
                    ]}
                    label="First name"
                    className="w-full"
                >
                    <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item<IUpdateProfile>
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your last name!",
                        },
                    ]}
                    label="Last name"
                    className="w-full"
                >
                    <Input placeholder="Last Name" />
                </Form.Item>
            </div>

            {/* Headline input */}
            <Form.Item<IUpdateProfile> name="headLine" label="Headline">
                <Input placeholder="Headline" />
            </Form.Item>

            {/* Biograyphy input */}
            <Form.Item<IUpdateProfile> name="bio" label="Biography">
                <TextArea placeholder="Biography" />
            </Form.Item>

            {/* Select language input */}
            <Form.Item<IUpdateProfile> name="language" label="Language">
                <Select
                    placeholder="Category"
                    options={[
                        { label: "English", value: "en" },
                        { label: "Arabic", value: "ar" },
                    ]}
                />
            </Form.Item>

            {/* Links inputs */}
            <hr />
            <p className="font-semibold my-4">Links:</p>
            <Form.Item<IUpdateProfile>
                name="facebookLink"
                label="facebook"
                rules={[
                    {
                        type: "url",
                        message: "Please add valid url!",
                    },
                ]}
            >
                <Input placeholder="Facebook link" />
            </Form.Item>
            <Form.Item<IUpdateProfile>
                name="instagramLink"
                label="instagram"
                rules={[
                    {
                        type: "url",
                        message: "Please add valid url!",
                    },
                ]}
            >
                <Input placeholder="Instagram link" />
            </Form.Item>

            {/* isPrivate checkbox */}
            {privateOption && (
                <>
                    <hr />
                    <Form.Item<IUpdateProfile>
                        name="isPrivate"
                        valuePropName="checked"
                        className="mt-4!"
                    >
                        <Checkbox>Make your profile private</Checkbox>
                    </Form.Item>
                </>
            )}

            {/* Submit form */}
            <AppSubmitBtn
                isLoading={isUpdating}
                type="primary"
                className="max-w-36! bg-orange-100!"
            >
                save changes
            </AppSubmitBtn>
        </Form>
    );
}

export default UpdateProfileForm;
