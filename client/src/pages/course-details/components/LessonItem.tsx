import { useState, useRef } from "react";
import { PlaySquareOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import type { ICourseSectionLesson } from "@/types";
import { formatDuration } from "@/utils/helper";

type LessonItemProps = { lesson: ICourseSectionLesson; index: number };

function LessonItem({ lesson, index }: LessonItemProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setIsModalOpen(false);
    };

    return (
        <li
            key={lesson._id}
            className="flex items-center justify-between gap-2"
        >
            {index === 0 ? (
                <>
                    <button
                        className="text-start flex-1 text-primary-500 cursor-pointer hover:text-primary-600 transition-colors space-x-2"
                        onClick={showModal}
                    >
                        <PlaySquareOutlined />
                        <span>{lesson.title}</span>
                    </button>
                    <Modal
                        title={lesson.title}
                        closable={{
                            "aria-label": "Course Video Modal Close Button",
                        }}
                        open={isModalOpen}
                        onCancel={handleCancel}
                        footer={null}
                    >
                        <video
                            ref={videoRef}
                            className="w-full h-full"
                            controls
                        >
                            <source src={lesson.link} type="video/mp4" />
                        </video>
                    </Modal>
                </>
            ) : (
                <>
                    <PlaySquareOutlined />
                    <p className="text-start flex-1" onClick={showModal}>
                        {lesson.title}
                    </p>
                </>
            )}

            <p>{formatDuration(lesson.duration || 0)}</p>
        </li>
    );
}

export default LessonItem;
