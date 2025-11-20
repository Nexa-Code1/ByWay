import { useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "antd";

import AuthContainer from "../../auth/AuthContainer";
import type { AuthType } from "../../../types";

const defaultBtnColors = "bg-orange-100! border-orange-100! text-primary-100!";

type RegisterBtnsProps = {
    shape?: "round" | "default" | "circle";
    displaySignupBtn?: boolean;
};

function RegisterBtns({
    shape = "default",
    displaySignupBtn = true,
}: RegisterBtnsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setSearchParams] = useSearchParams();

    function handleOpenAuthModal(auth: AuthType) {
        setIsModalOpen(true);
        setSearchParams({ auth });
    }

    return (
        <AuthContainer isModalOpen={isModalOpen} onModalOpen={setIsModalOpen}>
            <Button
                shape={shape}
                size="middle"
                className={`w-20 lg:w-24 ${
                    displaySignupBtn
                        ? "bg-gray-100! border-gray-100! text-gray-800!"
                        : defaultBtnColors
                } hover:scale-105`}
                onClick={() => handleOpenAuthModal("login")}
            >
                Log in
            </Button>
            {displaySignupBtn && (
                <Button
                    shape={shape}
                    size="middle"
                    className={`w-20 lg:w-24 ${defaultBtnColors} hover:scale-105`}
                    onClick={() => handleOpenAuthModal("signup")}
                >
                    Sign up
                </Button>
            )}
        </AuthContainer>
    );
}

export default RegisterBtns;
