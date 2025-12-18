import { Button } from "antd";
import type { MouseEventHandler, ReactNode } from "react";

type IconBtnProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLElement>;
};

function IconBtn({ children, onClick }: IconBtnProps) {
    return (
        <Button
            className="bg-transparent! border-0! shadow-none! p-2! hover:text-orange-100! text-base!"
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default IconBtn;
