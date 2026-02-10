import { NavLink } from "react-router";
import { CheckCircleOutlined } from "@ant-design/icons";

import { createCourseNavLinks } from "@/utils/navLinks";
import { useNewCourseContext } from "@/instructor/context/NewCourseContext";

function CreateCourseNav() {
    const { hasBasicInfo, hasCourseContent } = useNewCourseContext();

    const isTabDisabled = (tabKey: string) => {
        switch (tabKey) {
            case "curriculum":
                return !hasBasicInfo;
            case "publish-course":
                return !hasBasicInfo || !hasCourseContent;
            default:
                return false;
        }
    };

    return (
        <ul className="flex justify-between items-center gap-8 border-b-2 border-b-gray-200 mb-8 touch-pan-x whitespace-nowrap overflow-auto scroll-m-0">
            {createCourseNavLinks.map((link) => {
                const disabled = isTabDisabled(link.key);
                return (
                    <li key={link.key}>
                        <NavLink
                            to={disabled ? "#" : link.path}
                            className={({ isActive }: { isActive: boolean }) =>
                                `${
                                    disabled
                                        ? "text-gray-400 cursor-not-allowed"
                                        : isActive
                                          ? "text-primary-700 border-b-2 border-b-orange-100"
                                          : "text-gray-600 hover:text-primary-700"
                                } font-medium px-4 pb-[calc(15px)] flex items-center gap-2`
                            }
                            onClick={(e) => {
                                if (disabled) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            {link.icon}
                            <span>{link.label.en}</span>

                            {link.key === "curriculum" && hasCourseContent ? (
                                <CheckCircleOutlined className="text-primary-main!" />
                            ) : link.key === "basic-information" &&
                              hasBasicInfo ? (
                                <CheckCircleOutlined className="text-primary-main!" />
                            ) : null}
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    );
}

export default CreateCourseNav;
