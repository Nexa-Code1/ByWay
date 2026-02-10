import { Button } from "antd";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";
import type { ReactNode } from "react";

type FormActionsProps = {
    isLoading: boolean;
    onCancel: () => void;
    submitLabel: ReactNode;
    disabled?: boolean;
};

function FormActions({
    isLoading,
    submitLabel,
    onCancel,
    disabled = false,
}: FormActionsProps) {
    return (
        <div className="flex gap-4 justify-end">
            <Button
                className="border-orange-100! text-orange-100! hover:-translate-y-0.5"
                onClick={onCancel}
                disabled={isLoading}
            >
                Cancel
            </Button>
            <AppSubmitBtn
                type="primary"
                className="w-34! bg-orange-100!"
                isLoading={isLoading}
                disabled={disabled}
            >
                {submitLabel}
            </AppSubmitBtn>
        </div>
    );
}

export default FormActions;
