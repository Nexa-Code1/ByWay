import { useSearchParams } from "react-router";
import { Form, Input, Button, type FormProps } from "antd";

type GetAllCoursesFilter = {
    search: string;
};

function SearchForm() {
    const [form] = Form.useForm();
    const [, setSearchParams] = useSearchParams();

    const onFinish: FormProps<GetAllCoursesFilter>["onFinish"] = (values) => {
        console.log(values);
        setSearchParams({ searchTitle: values.search.trim() });
        form.resetFields();
    };

    return (
        <Form
            form={form}
            name="search"
            initialValues={{ search: "" }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <div className="absolute top-1/2 left-1/2 -translate-1/2 flex items-center w-[95%] max-w-3xl bg-white rounded-md h-10! [&_.ant-form-item-explain-error]:absolute! [&_.ant-form-item-explain-error]:font-semibold! [&_.ant-form-item-explain-error]:text-error-800!">
                <Form.Item<GetAllCoursesFilter>
                    name="search"
                    rules={[
                        {
                            required: true,
                            message: "Please input course title!",
                        },
                    ]}
                    className="w-full! mb-0!"
                >
                    <Input
                        placeholder="Search your favourite course"
                        className="border-0! h-10!"
                    />
                </Form.Item>

                <Form.Item label={null} className="mb-0!">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="bg-primary-700! w-24! mx-1"
                    >
                        Search
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}

export default SearchForm;
