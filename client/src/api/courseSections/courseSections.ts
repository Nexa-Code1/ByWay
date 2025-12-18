import api from "../api";
import { catchError } from "../catchError";

export async function handleCreateCourseSection(
    section: string,
    courseId: string
) {
    try {
        const res = await api.post(`sections/create-section/${courseId}`, {
            section,
        });
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleUpdateCourseSection(
    courseId: string,
    sectionId: string,
    updateSection: string
) {
    try {
        const res = await api.patch(
            `sections/update-section/${courseId}/${sectionId}`,
            {
                section: updateSection,
            }
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}

export async function handleDeleteCourseSection(
    courseId: string,
    sectionId: string
) {
    try {
        const res = await api.delete(
            `sections/delete-section/${courseId}/${sectionId}`
        );
        return res.data;
    } catch (err) {
        catchError(err);
    }
}
