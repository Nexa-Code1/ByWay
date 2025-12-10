import { useState, type ReactNode } from "react";
import { Button, Modal } from "antd";
import type { ButtonType } from "antd/es/button";
import type { UseMutateFunction } from "@tanstack/react-query";

type ConfirmationModalProps = {
    triggerBtnType: ButtonType;
    triggerBtnStyles: string;
    triggerBtnLabel: ReactNode;
    onConfirm: UseMutateFunction<unknown, Error, void, unknown>;
};

function ConfirmationModal({
    triggerBtnType,
    triggerBtnStyles,
    triggerBtnLabel,
    onConfirm,
}: ConfirmationModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        onConfirm();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button
                onClick={showModal}
                type={triggerBtnType}
                className={triggerBtnStyles}
            >
                {triggerBtnLabel}
            </Button>
            <Modal
                title="Are you sure?"
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>
                    This action can not be undone. Please confirm if you want to
                    proceed.
                </p>
            </Modal>
        </>
    );
}

export default ConfirmationModal;
