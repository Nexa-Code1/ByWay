import { useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { Button } from "antd";

import type { AuthType } from "@/types";
import AuthContainer from "@/components/auth/AuthContainer";

const defaultBtnColors = "bg-orange-100! border-orange-100! text-primary-100!";

type RegisterBtnsProps = {
    shape?: "round" | "default" | "circle";
    displaySignupBtn?: boolean;
    loginBtnLabel?: ReactNode;
    className?: string;
};

function RegisterBtns({
    shape = "default",
    displaySignupBtn = true,
    loginBtnLabel = "Log in",
    className = `w-20 lg:w-24 ${
        displaySignupBtn
            ? "bg-gray-100! border-gray-100! text-gray-800!"
            : defaultBtnColors
    } hover:scale-105`,
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
                className={className}
                onClick={() => handleOpenAuthModal("login")}
            >
                {loginBtnLabel}
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
