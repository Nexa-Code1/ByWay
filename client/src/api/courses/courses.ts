import api from "../api";
import { catchError } from "../catchError";
import type { IFilterCoursesBy } from "@/types";

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
