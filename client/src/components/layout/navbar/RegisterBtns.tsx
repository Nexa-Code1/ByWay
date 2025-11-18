import { Button } from "antd";

function RegisterBtns() {
    return (
        <div className="hidden md:flex items-center gap-2">
            <Button
                shape="round"
                size="middle"
                className="w-20 lg:w-24 text-gray-800! border-white! hover:scale-105"
            >
                Log in
            </Button>
            <Button
                shape="round"
                size="middle"
                className="w-20 lg:w-24 bg-orange-100! text-primary-100! border-orange-100! hover:scale-105"
            >
                Sign up
            </Button>
        </div>
    );
}

export default RegisterBtns;
