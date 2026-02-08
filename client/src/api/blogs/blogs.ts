import api from "../api";
import { catchError } from "../catchError";
import type { IFilterBlogsBy } from "@/types";

export async function handleCreateBlog(formData: FormData) {
    try {
        const res = await api.post("blogs/create-blog", formData);

        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetBlogs(filter: IFilterBlogsBy) {
    try {
        let url = "blogs/get-blogs";
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

export async function handleGetBlogDetails(id?: string) {
    try {
        if (!id) throw new Error("blog id is required");
        const res = await api.get(`blogs/get-blog/${id}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleGetInstructorBlogs({
    instructorId,
    page,
    limit,
}: {
    instructorId?: string;
    page?: number;
    limit?: number;
}) {
    try {
        if (!instructorId) throw new Error("instructor id is required");

        let url = `blogs/get-instructor-blogs/${instructorId}`;
        const filterArr = Object.entries({ limit, page });
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

export async function handleUpdateBlog({
    id,
    formData,
}: {
    id: string;
    formData: FormData;
}) {
    try {
        if (!id) throw new Error("blog id is required");
        const res = await api.put(`blogs/update-blog/${id}`, formData);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteBlog(id: string) {
    try {
        if (!id) throw new Error("blog id is required");
        const res = await api.delete(`blogs/delete-blog/${id}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
