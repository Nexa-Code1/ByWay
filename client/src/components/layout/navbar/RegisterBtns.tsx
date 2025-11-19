import { useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "antd";

import AuthContainer from "../../auth/AuthContainer";
import type { AuthType } from "../../../types";

function RegisterBtns() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [, setSearchParams] = useSearchParams();

    function handleOpenAuthModal(auth: AuthType) {
        setIsModalOpen(true);
        setSearchParams({ auth });
    }

    return (
        <AuthContainer isModalOpen={isModalOpen} onModalOpen={setIsModalOpen}>
            <Button
                shape="round"
                size="middle"
                className="w-20 lg:w-24 text-gray-800! bg-gray-100! border-gray-100! hover:scale-105"
                onClick={() => handleOpenAuthModal("login")}
            >
                Log in
            </Button>
            <Button
                shape="round"
                size="middle"
                className="w-20 lg:w-24 bg-orange-100! text-primary-100! border-orange-100! hover:scale-105"
                onClick={() => handleOpenAuthModal("signup")}
            >
                Sign up
            </Button>
        </AuthContainer>
    );
}

export default RegisterBtns;
