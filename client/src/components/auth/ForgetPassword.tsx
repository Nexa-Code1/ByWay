import { Button } from "antd";

import ModalHeader from "./ModalHeader";
import ForgetPasswordForm from "./ForgetPasswordForm";
import TextWithLink from "../shared/TextWithLink";

function ForgetPassword() {
    return (
        <>
            <ModalHeader />
            <ForgetPasswordForm>
                <Button
                    type="primary"
                    className="w-full bg-primary-600! hover:bg-primary-500! capitalize"
                >
                    reset password
                </Button>
            </ForgetPasswordForm>
            <TextWithLink text="Go back to" auth="login" buttonLabel="log in" />
        </>
    );
}

export default ForgetPassword;
