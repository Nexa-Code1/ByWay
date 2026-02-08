import { Button } from "antd";
import { useNavigate } from "react-router";

import AppSubmitBtn from "@/components/shared/AppSubmitBtn";

type FormActionsProps = {
    isLoading: boolean;
    cancelLink: string;
    submitText: string;
};

function FormActions({ isLoading, cancelLink, submitText }: FormActionsProps) {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4 justify-end">
            <Button
                className="border-orange-100! text-orange-100! hover:-translate-y-0.5"
                onClick={() => navigate(cancelLink)}
                disabled={isLoading}
            >
                Cancel
            </Button>
            <AppSubmitBtn
                type="primary"
                className="w-28! bg-orange-100!"
                isLoading={isLoading}
            >
                {submitText}
            </AppSubmitBtn>
        </div>
    );
}

export default FormActions;
