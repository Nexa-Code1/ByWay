import { PlusOutlined } from "@ant-design/icons";

import IconBtn from "@/components/shared/IconBtn";

function EditSectionName() {
    return (
        <InputModal>
            <IconBtn>
                <PlusOutlined />
            </IconBtn>
        </InputModal>
    );
}

export default EditSectionName;
