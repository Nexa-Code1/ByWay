import { createContext, useContext, useReducer } from "react";

import type {
    ICourseDataBasicInfo,
    ICourseContent,
    ICourseSectionLesson,
    NewCourseContextType,
    NewCourseState,
    NewCourseAction,
} from "@/types";
import { generateObjectId } from "@/utils/helper";

// Initial state
const initialState: NewCourseState = {
    // Basic course info
    title: "",
    subTitle: "",
    price: 100,
    description: "",
    requirements: [],
    category: "",
    image: null,
    imagePreview: null,

    // Course content
    courseContent: [],

    // Course state
    isEditMode: false,
    draftCourseId: null,
};

// Reducer function
function newCourseReducer(
    state: NewCourseState,
    action: NewCourseAction,
): NewCourseState {
    switch (action.type) {
        case "SET_BASIC_INFO":
            return {
                ...state,
                title: action.payload.title ?? state.title,
                subTitle: action.payload.subTitle ?? state.subTitle,
                price: action.payload.price ?? state.price,
                description: action.payload.description ?? state.description,
                requirements: action.payload.requirements ?? state.requirements,
                category: action.payload.category ?? state.category,
                image: action.payload.image ?? state.image,
                imagePreview: action.payload.imagePreview ?? state.imagePreview,
            };

        case "SET_COURSE_CONTENT":
            return {
                ...state,
                courseContent: action.payload ?? state.courseContent,
            };

        case "ADD_SECTION": {
            const newSection: ICourseContent = {
                _id: generateObjectId(),
                section: "New Section",
                lessons: [],
            };
            return {
                ...state,
                courseContent: [...state.courseContent, newSection],
            };
        }

        case "UPDATE_SECTION":
            return {
                ...state,
                courseContent: state.courseContent.map((section) =>
                    section._id === action.payload.sectionId
                        ? { ...section, section: action.payload.sectionName }
                        : section,
                ),
            };

        case "DELETE_SECTION":
            return {
                ...state,
                courseContent: state.courseContent.filter(
                    (section) => section._id !== action.payload,
                ),
            };

        case "ADD_LESSON":
            return {
                ...state,
                courseContent: state.courseContent.map((section) =>
                    section._id === action.payload.sectionId
                        ? {
                              ...section,
                              lessons: [
                                  ...section.lessons,
                                  action.payload.lesson,
                              ],
                          }
                        : section,
                ),
            };

        case "UPDATE_LESSON":
            return {
                ...state,
                courseContent: state.courseContent.map((section) =>
                    section._id === action.payload.sectionId
                        ? {
                              ...section,
                              lessons: section.lessons.map((l) =>
                                  l._id === action.payload.lessonId
                                      ? { ...l, ...action.payload.lesson }
                                      : l,
                              ),
                          }
                        : section,
                ),
            };

        case "DELETE_LESSON":
            return {
                ...state,
                courseContent: state.courseContent.map((section) =>
                    section._id === action.payload.sectionId
                        ? {
                              ...section,
                              lessons: section.lessons.filter(
                                  (l) => l._id !== action.payload.lessonId,
                              ),
                          }
                        : section,
                ),
            };

        case "SET_EDIT_MODE":
            return {
                ...state,
                isEditMode: action.payload.isEdit,
                draftCourseId: action.payload.draftId ?? null,
            };

        case "RESET_COURSE":
            return initialState;

        case "REORDER_CONTENT":
            return {
                ...state,
                courseContent: action.payload,
            };

        case "REORDER_LESSONS":
            return {
                ...state,
                courseContent: state.courseContent.map((section) =>
                    section._id === action.payload.sectionId
                        ? {
                              ...section,
                              lessons: action.payload.lessons,
                          }
                        : section,
                ),
            };

        default:
            return state;
    }
}

const NewCourseContext = createContext<NewCourseContextType>({
    state: initialState,
    updateBasicInfo: () => {},
    updateCourseContent: () => {},
    addSection: () => {},
    updateSection: () => {},
    deleteSection: () => {},
    addLesson: () => {},
    updateLesson: () => {},
    deleteLesson: () => {},
    setEditMode: () => {},
    resetCourse: () => {},
    reorderCourseContent: () => {},
    reorderLessons: () => {},
    hasBasicInfo: false,
    hasCourseContent: false,
    canPublish: false,
});

function NewCourseProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(newCourseReducer, initialState);

    const updateBasicInfo = (info: Partial<ICourseDataBasicInfo>) => {
        dispatch({ type: "SET_BASIC_INFO", payload: info });
    };

    const updateCourseContent = (content: ICourseContent[]) => {
        dispatch({ type: "SET_COURSE_CONTENT", payload: content });
    };

    const addSection = () => {
        dispatch({ type: "ADD_SECTION" });
    };

    const updateSection = (sectionId: string, sectionName: string) => {
        dispatch({
            type: "UPDATE_SECTION",
            payload: { sectionId, sectionName },
        });
    };

    const deleteSection = (sectionId: string) => {
        dispatch({ type: "DELETE_SECTION", payload: sectionId });
    };

    const addLesson = (sectionId: string, lesson: ICourseSectionLesson) => {
        dispatch({ type: "ADD_LESSON", payload: { sectionId, lesson } });
    };

    const updateLesson = (
        sectionId: string,
        lessonId: string,
        lesson: Partial<ICourseSectionLesson>,
    ) => {
        dispatch({
            type: "UPDATE_LESSON",
            payload: { sectionId, lessonId, lesson },
        });
    };

    const deleteLesson = (sectionId: string, lessonId: string) => {
        dispatch({ type: "DELETE_LESSON", payload: { sectionId, lessonId } });
    };

    const setEditMode = (isEdit: boolean, draftId?: string) => {
        dispatch({ type: "SET_EDIT_MODE", payload: { isEdit, draftId } });
    };

    const resetCourse = () => {
        dispatch({ type: "RESET_COURSE" });
    };

    const reorderCourseContent = (content: ICourseContent[]) => {
        dispatch({ type: "REORDER_CONTENT", payload: content });
    };

    const reorderLessons = (
        sectionId: string,
        lessons: ICourseSectionLesson[],
    ) => {
        dispatch({ type: "REORDER_LESSONS", payload: { sectionId, lessons } });
    };

    // Validation functions
    const hasBasicInfo = !!(
        state.title &&
        state.subTitle &&
        state.description &&
        state.category &&
        state.price > 0 &&
        (state.image || (state.isEditMode && state.imagePreview))
    );

    const hasCourseContent = state.courseContent.length > 0;

    const hasLessonsInAllSections = state.courseContent.every(
        (section) => section.lessons && section.lessons.length > 0,
    );

    const canPublish =
        hasBasicInfo &&
        hasCourseContent &&
        hasLessonsInAllSections &&
        !!state.imagePreview;

    return (
        <NewCourseContext.Provider
            value={{
                state,
                updateBasicInfo,
                updateCourseContent,
                addSection,
                updateSection,
                deleteSection,
                addLesson,
                updateLesson,
                deleteLesson,
                setEditMode,
                resetCourse,
                reorderCourseContent,
                reorderLessons,
                hasBasicInfo,
                hasCourseContent,
                canPublish,
            }}
        >
            {children}
        </NewCourseContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNewCourseContext() {
    const context = useContext(NewCourseContext);
    if (!context) {
        throw new Error(
            "useNewCourseContext must be used within a NewCourseProvider",
        );
    }
    return context;
}

export default NewCourseProvider;
