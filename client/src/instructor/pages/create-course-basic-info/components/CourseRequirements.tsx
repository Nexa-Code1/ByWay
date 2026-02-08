import { useState, type Dispatch, type SetStateAction } from "react";
import { Button, Form, message } from "antd";
import Input from "antd/es/input/Input";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

import IconBtn from "@/components/shared/IconBtn";
import type { ICourseDataBasicInfo } from "@/types";

type CourseRequirementsProps = {
    requirements: string[];
    onSetRequirements: Dispatch<SetStateAction<string[]>>;
};

function CourseRequirements({
    requirements,
    onSetRequirements,
}: CourseRequirementsProps) {
    const [value, setValue] = useState("");

    function handleAddRequirement() {
        if (!value) return;
        if (requirements.includes(value))
            return message.error("Requirement is already exist.");
        onSetRequirements((prev) => [...prev, value.trim()]);
        setValue("");
    }

    function handleDeleteRequirement(requirement: string) {
        onSetRequirements((prev) =>
            prev.filter((item) => item !== requirement),
        );
    }

    return (
        <div className="mb-6">
            <Form.Item<ICourseDataBasicInfo>
                name="requirements"
                label="Requirements"
            >
                <div className="w-full! flex items-center">
                    <Input
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
            </Form.Item>
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
