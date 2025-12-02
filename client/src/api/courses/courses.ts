import axios from "axios";

import { catchError } from "../catchError";
import type { IFilterCoursesBy } from "@/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

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
        console.log(url);

        const res = await axios.get(`${BASE_URL}${url}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
