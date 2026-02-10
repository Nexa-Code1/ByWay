# Course Management API Documentation

## New Enhanced Endpoints

### 1. Create Course with Content

**POST** `/api/courses/create-course-with-content`

Creates a new course with sections and lessons in a single request.

**Request Body:**

```json
{
    "title": "Course Title",
    "subTitle": "Course Subtitle",
    "price": 99.99,
    "description": "Course description",
    "requirements": ["Requirement 1", "Requirement 2"],
    "category": "category_id",
    "courseContent": [
        {
            "section": "Section 1 Name",
            "lessons": [
                {
                    "title": "Lesson 1 Title",
                    "description": "Lesson description",
                    "videoUrl": "https://cloudinary-url/video.mp4",
                    "duration": 1200
                },
                {
                    "title": "Lesson 2 Title",
                    "description": "Lesson description",
                    "videoUrl": "https://cloudinary-url/video2.mp4",
                    "duration": 900
                }
            ]
        },
        {
            "section": "Section 2 Name",
            "lessons": [
                {
                    "title": "Lesson 3 Title",
                    "description": "Lesson description",
                    "videoUrl": "https://cloudinary-url/video3.mp4",
                    "duration": 1500
                }
            ]
        }
    ]
}
```

**File Upload:** Course image (required)

**Response:**

```json
{
    "message": "Course created successfully with content",
    "course": {
        // Full course object with populated sections and lessons
    }
}
```

---

### 2. Update Course with Content

**PUT** `/api/courses/update-course-with-content/:id`

Updates a course and its content (sections and lessons) in a single request.

**Request Body:** Same structure as create endpoint, but lessons can include `_id` for updates:

```json
{
    "title": "Updated Course Title",
    "subTitle": "Updated Subtitle",
    "price": 149.99,
    "description": "Updated description",
    "requirements": ["Updated Requirement 1"],
    "category": "updated_category_id",
    "courseContent": [
        {
            "section": "Updated Section 1",
            "lessons": [
                {
                    "_id": "existing_lesson_id",
                    "title": "Updated Lesson Title",
                    "description": "Updated description",
                    "videoUrl": "https://new-cloudinary-url/video.mp4",
                    "duration": 1300
                },
                {
                    "title": "New Lesson Title",
                    "description": "New lesson description",
                    "videoUrl": "https://cloudinary-url/new-video.mp4",
                    "duration": 800
                }
            ]
        }
    ]
}
```

**File Upload:** Optional new course image

**Response:**

```json
{
    "message": "Course updated successfully with content",
    "course": {
        // Updated course object with populated sections and lessons
    }
}
```

---

### 3. Enhanced Publish Course

**PATCH** `/api/courses/publish-course/:id`

Publishes a course with enhanced validation to ensure course completeness.

**Validations:**

- Course must have at least one section
- Each section must have at least one lesson
- All lessons must have a title and video content

**Response:**

```json
{
    "message": "Course published successfully"
}
```

**Error Responses:**

```json
{
    "message": "Course must have at least one section to be published"
}
```

```json
{
    "message": "Section 'Section Name' must have at least one lesson to be published"
}
```

```json
{
    "message": "All lessons must have a title and video content before publishing"
}
```

---

## Usage Notes

### Course Status Flow

1. **Draft** - Default status when creating courses
2. **Published** - Status after successful publish validation

### Video/Image Handling

- Videos and images should be uploaded to Cloudinary first
- Pass the Cloudinary URLs in the `videoUrl` field
- Course image is uploaded via multipart form data
- The system maintains the same Cloudinary integration as existing endpoints

### Content Management

- **Create:** Use `create-course-with-content` for initial course creation
- **Update:** Use `update-course-with-content` to modify course structure
- **Delete:** Lessons not included in update requests are automatically deleted
- **Order:** Section and lesson order is maintained by the array order in `courseContent`

### Backward Compatibility

- Original endpoints (`create-course`, `update-course`) remain functional
- New endpoints enhance functionality without breaking existing integrations
- Both approaches can be used in the same application

---

## Example Workflow

1. **Create Course Draft:**

    ```bash
    POST /api/courses/create-course-with-content
    ```

2. **Update Content:**

    ```bash
    PUT /api/courses/update-course-with-content/:id
    ```

3. **Publish Course:**
    ```bash
    PATCH /api/courses/publish-course/:id
    ```

This streamlined workflow allows instructors to create comprehensive courses with all content in a single request, update content structure efficiently, and publish only when the course is complete and validated.
