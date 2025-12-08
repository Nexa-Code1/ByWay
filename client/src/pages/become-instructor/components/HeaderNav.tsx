import NavBreadCrumb from "@/components/shared/NavBreadCrumb";

function HeaderNav() {
    return (
        <div className="bg-primary-100 py-6 px-2 flex flex-col items-center justify-center">
            <p className="text-primary-700 text-lg font-semibold mb-1">
                Become an Instructor
            </p>
            <NavBreadCrumb items={[{ title: "Become Instructor" }]} />
        </div>
    );
}

export default HeaderNav;
