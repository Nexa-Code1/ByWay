import { useState, type Dispatch, type SetStateAction } from "react";
import { Button, Form, message } from "antd";
import Input from "antd/es/input/Input";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

import IconBtn from "@/components/shared/IconBtn";

type CourseRequirementsProps = {
    requirements: string[];
    onSetCurRequirements: Dispatch<SetStateAction<string[]>>;
};

function CourseRequirements({
    requirements,
    onSetCurRequirements,
}: CourseRequirementsProps) {
    const [value, setValue] = useState("");
    const form = Form.useFormInstance();

    function handleAddRequirement() {
        if (!value.trim()) return setValue("");
        if (requirements.includes(value.trim()))
            return message.error("Requirement is already exist.");

        onSetCurRequirements((prev) => [...prev, value.trim()]);

        // Update form field value
        form.setFieldValue("requirements", requirements);
        setValue("");
    }

    function handleDeleteRequirement(requirement: string) {
        const newRequirements = requirements.filter(
            (item) => item !== requirement,
        );
        onSetCurRequirements(newRequirements);

        // Update form field value
        form.setFieldValue("requirements", newRequirements);
    }

    return (
        <div className="mb-6">
            <div className="w-full! flex items-center mb-6">
                <div>
                    <label
                        htmlFor="requirements"
                        className="inline-block! w-24!"
                    >
                        Requirements:
                    </label>
                </div>
                <Input
                    id="requirements"
                    placeholder="Please input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button
                    type="text"
                    htmlType="button"
                    className="text-orange-100! flex gap-2 bg-transparent!"
                    onClick={handleAddRequirement}
                >
                    <PlusOutlined />
                    <span className="hidden md:block">Add requirement</span>
                </Button>
            </div>
            {requirements.length > 0 && (
                <ul className="grid grid-cols-2 gap-2">
                    {requirements.map((requirement) => (
                        <li
                            key={requirement}
                            className="flex gap-2 items-center justify-between text-gray-400 border border-gray-200 px-2 rounded-sm bg-gray-50"
                        >
                            <span>{requirement}</span>
                            <IconBtn
                                onClick={() =>
                                    handleDeleteRequirement(requirement)
                                }
                            >
                                <CloseOutlined className="text-xs! text-gray-400! " />
                            </IconBtn>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CourseRequirements;
