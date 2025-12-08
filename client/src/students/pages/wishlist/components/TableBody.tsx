import { Link } from "react-router";
import { StarFilled } from "@ant-design/icons";

import ListItemImg from "@/components/shared/ListItemImg";
import type { IWishlist, IWishlistItem } from "@/types";
import CourseActions from "@/components/shared/CourseActions";

type TableBodyProps = {
    wishlist: IWishlist[];
};

function TableBody({ wishlist }: TableBodyProps) {
    return (
        <tbody>
            {wishlist.map(
                ({ course_ID: item }: { course_ID: IWishlistItem }) => (
                    <tr key={item._id} className="border-t border-b-inherit">
                        <td className="flex gap-4 p-4">
                            <Link to={`/courses/${item._id}`}>
                                <ListItemImg
                                    image={item.image}
                                    alt={item.title}
                                />
                            </Link>
                            <div className="flex flex-col gap-2">
                                <p className="flex items-center gap-2">
                                    <StarFilled className="text-orange-100!" />
                                    <span className="text-sm font-medium">
                                        {item.rate.toFixed(1)}
                                    </span>
                                </p>
                                <Link
                                    to={`/courses/${item._id}`}
                                    className="flex-1"
                                >
                                    <p className="font-medium">{item.title}</p>
                                </Link>
                                <p className="text-gray-700">
                                    Course by: {item.instructor.firstName}{" "}
                                    {item.instructor.lastName}
                                </p>
                            </div>
                        </td>
                        <td className="text-primary-700 font-semibold">
                            {item.price} EGP
                        </td>
                        <td className="px-4">
                            <CourseActions
                                courseDetails={item}
                                btnColorClass="bg-orange-100!"
                            />
                        </td>
                    </tr>
                )
            )}
        </tbody>
    );
}

export default TableBody;
