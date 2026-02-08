import api from "../api";
import { catchError } from "../catchError";
import type {
    CourseStatusType,
    ICourseDataBasicInfo,
    IFilterCoursesBy,
} from "@/types";

export async function handleGetAllCourses(filter: IFilterCoursesBy) {
    try {
        let url = "courses/get-courses";
        const filterArr = Object.entries(filter);
        if (filterArr.length > 0) {
            const joinedFilterArr = filterArr
                .map((el) => `${el[0]}=${el[1]}`)
                .join("&");
            url += `?${joinedFilterArr}`;
        }

        const res = await api.get(url);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetCourseDetails(id?: string) {
    try {
        if (!id) throw new Error("course id is required");
        const res = await api.get(`courses/get-course/${id}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleCreateNewCourse(
    newCourseData: ICourseDataBasicInfo,
) {
    try {
        const data = new FormData();

        // Add text fields
        data.append("title", newCourseData.title);
        data.append("subTitle", newCourseData.subTitle);
        data.append("content", JSON.stringify(newCourseData.content));
        data.append("price", newCourseData.price.toString());
        data.append("description", newCourseData.description);
        data.append("requirements", JSON.stringify(newCourseData.requirements));
        data.append("category", newCourseData.category);
        if (newCourseData.image) data.append("image", newCourseData.image);

        const res = await api.post(`courses/create-course`, data);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdateCourse(
    courseId: string,
    updatedCourseData: ICourseDataBasicInfo,
) {
    try {
        const res = await api.put(
            `courses/update-course/${courseId}`,
            updatedCourseData,
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteCourse(courseId: string) {
    try {
        const res = await api.delete(`courses/delete-course/${courseId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handlePublishCourse(courseId: string) {
    try {
        const res = await api.patch(`courses/publish-course/${courseId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetInstructorCourses({
    status,
    limit,
    page,
    instructorId,
}: {
    status: CourseStatusType | "";
    limit: number;
    page: number;
    instructorId?: string;
}) {
    try {
        if (!instructorId) throw new Error("instructor id is required");

        let url = `courses/get-instructor-courses/${instructorId}`;
        const filterArr = Object.entries({ status, limit, page });
        if (filterArr.length > 0) {
            const joinedFilterArr = filterArr
                .map((el) => `${el[0]}=${el[1]}`)
                .join("&");
            url += `?${joinedFilterArr}`;
        }

        const res = await api.get(url);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
