import wishlistModel from "../../../DB/Models/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  const exists = await wishlistModel.findOne({
    student_ID: id,
    course_ID: courseId,
  });

  if (exists) {
    return res.status(400).json({
      message: "Course already in wishlist",
    });
  }

  const wishlist = await wishlistModel.create({
    student_ID: id,
    course_ID: courseId,
  });

  res.status(201).json({
    message: "Course added to wishlist",
  });
};

export const getMyWishlist = async (req, res) => {
  const { id } = req.user;

  let wishlist = await wishlistModel.find({ student_ID: id }).populate({
    path: "course_ID",
    select: "title subTitle image price discount category instructor",
    populate: [
      { path: "instructor", select: "firstName lastName image" },
      { path: "category", select: "name slug" },
    ],
  });

  const validWishlist = wishlist.filter((item) => item.course_ID !== null);

  if (validWishlist.length !== wishlist.length) {
    await wishlistModel.deleteMany({
      student_ID: id,
      course_ID: null,
    });
  }

  res.status(200).json({
    message: "Wishlist fetched successfully",
    wishlist: validWishlist,
  });
};

export const deleteFromWishlist = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  const deleted = await wishlistModel.findOneAndDelete({
    student_ID: id,
    course_ID: courseId,
  });

  if (!deleted) {
    return res.status(404).json({
      message: "Course not found in wishlist",
    });
  }

  res.status(200).json({
    message: "Course removed from wishlist",
  });
};

export const clearWishlist = async (req, res) => {
  const { id } = req.user;

  await wishlistModel.deleteMany({ student_ID: id });

  res.status(200).json({
    message: "Wishlist cleared successfully",
  });
};
