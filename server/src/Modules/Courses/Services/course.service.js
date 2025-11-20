import coursesModel from "../../../DB/Models/courses.model.js";
import categoryModel from "../../../DB/Models/categories.model.js";
import { COURSE_STATUS, USER_ROLES } from "../../../Constants/constants.js";

export const createCourse = async (req, res) => {
  const { id } = req.user;
  const {
    title,
    subTitle,
    content,
    price,
    description,
    requirements,
    category,
  } = req.body;

  const course = await coursesModel.create({
    title,
    subTitle,
    instructor: id,
    content,
    price,
    description,
    requirements,
    category,
  });

  res.status(201).json({ message: "Course created successfully", course });
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    subTitle,
    content,
    price,
    description,
    requirements,
    category,
  } = req.body;

  const course = await coursesModel.findById(id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Unauthorized, you are not the instructor of this course",
    });
  }

  await coursesModel.updateOne(
    { _id: id },
    {
      title,
      subTitle,
      content,
      price,
      description,
      requirements,
      category,
    }
  );

  res.status(200).json({ message: "Course updated successfully" });
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const course = await coursesModel.findById(id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Unauthorized, you are not the instructor of this course",
    });
  }

  await coursesModel.deleteOne({ _id: id });

  res.status(200).json({ message: "Course deleted successfully" });
};

export const getCourseDetails = async (req, res) => {
  const { id } = req.params;

  const course = await coursesModel.findById(id).populate([
    {
      path: "category",
      select: "name slug",
    },
    {
      path: "instructor",
      select: "firstName lastName email image",
    },
    {
      path: "content.lessons",
      select: "section_ID title description link duration isCompleted",
    },
  ]);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res
    .status(200)
    .json({ message: "Course details fetched successfully", course });
};

export const getAllCourses = async (req, res) => {
  const { price, category, title, sort, page = 1, limit = 10 } = req.query;

  const query = {};

  if (price) {
    if (price.includes("-")) {
      const [min, max] = price.split("-");
      query.price = { $gte: Number(min), $lte: Number(max) };
    } else {
      query.price = Number(price);
    }
  }

  if (category) {
    const foundCategory = await categoryModel.findOne({ slug: category });

    if (!foundCategory) {
      return res.status(400).json({
        message: "Invalid category slug",
        category,
      });
    }

    query.category = foundCategory._id;
  }

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  let courses = await coursesModel
    .find(query)
    .populate([
      {
        path: "category",
        select: "name slug",
      },
      {
        path: "instructor",
        select: "firstName lastName email image",
      },
      {
        path: "content.lessons",
        select: "section_ID title description link duration isCompleted",
      },
    ])
    .select(
      "title subTitle image price discount category instructor isFavourite"
    );

  if (sort) {
    const [field, order] = sort.split("-");
    const sortValue = order === "desc" ? -1 : 1;

    if (field === "price") {
      courses = courses.sort((a, b) => (a.price - b.price) * sortValue);
    }

    if (field === "time") {
      courses = courses.sort(
        (a, b) => (new Date(a.createdAt) - new Date(b.createdAt)) * sortValue
      );
    }
  }

  const totalCourses = courses.length;
  const paginatedCourses = courses.slice(skip, skip + limitNumber);

  res.status(200).json({
    message: "Courses fetched successfully",
    courses: paginatedCourses,
    pagination: {
      totalCourses,
      totalPages: Math.ceil(totalCourses / limitNumber),
      currentPage: pageNumber,
      nextPage: pageNumber * limitNumber < totalCourses ? pageNumber + 1 : null,
      prevPage: pageNumber > 1 ? pageNumber - 1 : null,
    },
  });
};

export const publishCourse = async (req, res) => {
  const { id } = req.params;

  const course = await coursesModel.findById(id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  if (course.instructor.toString() !== req.user.id) {
    return res.status(401).json({
      message: "Unauthorized, you are not the instructor of this course",
    });
  }

  await coursesModel.updateOne(
    { _id: id },
    { status: COURSE_STATUS.PUBLISHED }
  );

  res.status(200).json({ message: "Course published successfully" });
};

export const getInstructorCourses = async (req, res) => {
  const { instructorId } = req.params;

  let statusFilter = {};

  if (req.user.id !== instructorId) {
    statusFilter.status = COURSE_STATUS.PUBLISHED;
  }

  if (req.user.id === instructorId && req.query.status) {
    statusFilter.status = req.query.status;
  }

  const courses = await coursesModel.find({
    instructor: instructorId,
    ...statusFilter,
  });

  if (!courses || courses.length === 0) {
    return res.status(404).json({ message: "Courses not found" });
  }

  res.status(200).json({
    message: "Courses fetched successfully",
    courses,
  });
};
