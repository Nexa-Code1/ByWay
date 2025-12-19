import { NavLink } from "react-router";
import { useCookies } from "react-cookie";
import { CheckCircleOutlined } from "@ant-design/icons";

import { createCourseNavLinks } from "@/utils/navLinks";
import type { ICourseDetails } from "@/types";

type CreateCourseNavProps = {
    courseDetails: ICourseDetails;
};

function CreateCourseNav({ courseDetails }: CreateCourseNavProps) {
    const [cookies] = useCookies(["draftCourseId"]);
    const { draftCourseId } = cookies;

    return (
        <ul className="flex justify-between items-center gap-8 border-b-2 border-b-gray-200 mb-8 touch-pan-x whitespace-nowrap overflow-auto scroll-m-0">
            {createCourseNavLinks.map((link) => {
                const isDisabled =
                    (link.key === "curriculum" && !draftCourseId) ||
                    (link.key === "publish-course" &&
                        (!draftCourseId || !courseDetails?.content.length));

                const isCompleted =
                    (link.key === "basic-information" && draftCourseId) ||
                    (link.key === "curriculum" &&
                        courseDetails?.content.length > 0);

                return (
                    <li key={link.key}>
                        {isDisabled ? (
                            <div className="font-medium text-sm md:text-base px-4 pb-[calc(15px)] flex items-center gap-2 text-gray-400 cursor-not-allowed">
                                {link.icon}
                                <span>{link.label.en}</span>
                            </div>
                        ) : (
                            <NavLink
                                to={link.path}
                                className={({
                                    isActive,
                                }: {
                                    isActive: boolean;
                                }) =>
                                    `${
                                        isActive
                                            ? "text-primary-700 border-b-2 border-b-orange-100"
                                            : "text-gray-600"
                                    } font-medium px-4 pb-[calc(15px)] flex items-center gap-2`
                                }
                            >
                                {link.icon}
                                <span>{link.label.en}</span>
                                {isCompleted && (
                                    <CheckCircleOutlined className="text-primary-main!" />
                                )}
                            </NavLink>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

export default CreateCourseNav;
