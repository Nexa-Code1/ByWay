import type { ICourseLessonData } from "@/types";
import api from "../api";
import { catchError } from "../catchError";

export async function handleCreateLesson(
    courseId: string,
    sectionId: string,
    lessonData: ICourseLessonData
) {
    const formData = new FormData();
    formData.append("link", lessonData.link);
    formData.append("title", lessonData.title);
    formData.append("description", lessonData.description);

    try {
        const res = await api.post(
            `lessons/create-lesson/${courseId}/${sectionId}`,
            formData
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdateLesson(
    courseId: string,
    sectionId: string,
    lessonId: string,
    updatedLesson: ICourseLessonData
) {
    try {
        const res = await api.put(
            `lessons/update-lesson/${courseId}/${sectionId}/${lessonId}`,
            updatedLesson
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteLesson(lessonId: string) {
    try {
        const res = await api.delete(`lessons/delete-lesson/${lessonId}`);
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
