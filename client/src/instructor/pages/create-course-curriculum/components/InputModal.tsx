import { useState, type ReactNode } from "react";
import { Button, Modal } from "antd";

import IconBtn from "@/components/shared/IconBtn";

type InputModalProps = {
    onOk: () => void;
    icon: ReactNode;
    modalTitle: string;
    children: ReactNode;
};

function InputModal({ onOk, icon, modalTitle, children }: InputModalProps) {
    const [open, setOpen] = useState(false);

    const handleCancel = () => {
        setOpen(false);
    };

    const handleOk = () => {
        onOk();
        setOpen(false);
    };

    return (
        <>
            <IconBtn onClick={() => setOpen(true)}>{icon}</IconBtn>
            <Modal
                title={modalTitle}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="cancel"
                        type="text"
                        className="text-primary-700! font-medium! hover:bg-transparent!"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="save"
                        type="primary"
                        loading={false}
                        onClick={handleOk}
                        className="bg-orange-100!"
                    >
                        Save
                    </Button>,
                ]}
            >
                {children}
            </Modal>
        </>
    );
}

export default InputModal;
