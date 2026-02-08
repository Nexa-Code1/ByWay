import { useNavigate } from "react-router";
import { Button, Dropdown, type MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";

import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useDeleteBlog } from "@/hooks/blogs/useDeleteBlog";

type BlogControlMenuProps = {
    blogId: string;
};

function BlogControlMenu({ blogId }: BlogControlMenuProps) {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["draftBlogId"]);

    const { deleteBlog } = useDeleteBlog();

    function editBlogHandler() {
        setCookie("draftBlogId", blogId);
        navigate("/instructor/create-blog", { state: { blogId } });
    }

    const items: MenuProps["items"] = [
        {
            label: (
                <Button
                    type="text"
                    className="p-0! bg-transparent!"
                    onClick={editBlogHandler}
                >
                    Edit Blog
                </Button>
            ),
            key: "1",
        },
        {
            label: (
                <ConfirmationModal
                    triggerBtnType="text"
                    triggerBtnStyles="p-0! bg-transparent!"
                    triggerBtnLabel="Delete Blog"
                    onConfirm={() => deleteBlog(blogId)}
                />
            ),
            key: "2",
        },
    ];

    return (
        <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                <MoreOutlined />
            </a>
        </Dropdown>
    );
}

export default BlogControlMenu;
