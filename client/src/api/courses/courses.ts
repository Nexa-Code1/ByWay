import axios from "axios";

import { catchError } from "../catchError";
import type { IFilterCoursesBy } from "@/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function handleGetAllCourses(
    filter: IFilterCoursesBy,
    token: string
) {
    try {
        let url = "courses/get-courses";
        const filterArr = Object.entries(filter);
        if (filterArr.length > 0) {
            const joinedFilterArr = filterArr
                .map((el) => `${el[0]}=${el[1]}`)
                .join("&");
            url += `?${joinedFilterArr}`;
        }

        const res = await axios.get(`${BASE_URL}${url}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetCourseDetails(token: string, id?: string) {
    try {
        if (!id) throw new Error("course id is required");
        const res = await axios.get(`${BASE_URL}courses/get-course/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
