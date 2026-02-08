import { Outlet } from "react-router";

import CreateCourseNav from "./components/CreateCourseNav";

function CreateCourse() {
    return (
        <div>
            <CreateCourseNav />
            <Outlet />
        </div>
    );
}

export default CreateCourse;
