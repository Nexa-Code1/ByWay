import { Breadcrumb } from "antd";
import type {
    BreadcrumbItemType,
    BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router";

type Item = Partial<BreadcrumbItemType & BreadcrumbSeparatorType>;

type NavBreadCrumbProps = {
    className?: string;
    items: Item[];
};

function itemRender(currentRoute: Item, _params: unknown, items: Item[]) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
        <span className="inline-block max-w-40 truncate-line">
            {currentRoute.title}
        </span>
    ) : (
        <Link to={currentRoute.path || "/"}>{currentRoute.title}</Link>
    );
}

function NavBreadCrumb({ items, className }: NavBreadCrumbProps) {
    return (
        <Breadcrumb
            itemRender={itemRender}
            separator=">"
            items={[
                {
                    title: "Home",
                    path: "/",
                },
                ...items,
            ]}
            className={className}
        />
    );
}

export default NavBreadCrumb;
