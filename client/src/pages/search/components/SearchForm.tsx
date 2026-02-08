import { useSearchParams } from "react-router";
import { Form, Input, Button, type FormProps } from "antd";

type SearchFormProps = {
    placeholder: string;
    className?: string;
};

type SearchFormData = {
    search: string;
};

function SearchForm({
    placeholder,
    className = "col-span-4",
}: SearchFormProps) {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const searchTitle = searchParams.get("searchTitle");

    const onFinish: FormProps<SearchFormData>["onFinish"] = (
        values: SearchFormData,
    ) => {
        setSearchParams((prev) => {
            prev.set("searchTitle", values.search.trim());
            return prev;
        });
    };

    return (
        <Form
            form={form}
            name="search"
            initialValues={{ search: searchTitle || "" }}
            onFinish={onFinish}
            autoComplete="off"
            className={className}
        >
            <div className="flex items-center w-full bg-white rounded-md h-10! [&_.ant-form-item-explain-error]:absolute! [&_.ant-form-item-explain-error]:font-semibold! [&_.ant-form-item-explain-error]:text-error-800!">
                <Form.Item<SearchFormData>
                    name="search"
                    className="w-full! mb-0!"
                >
                    <Input
                        placeholder={placeholder}
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
