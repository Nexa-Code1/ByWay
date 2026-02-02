import wishlistModel from "../../../DB/Models/wishlist.model.js";
import cartModel from "../../../DB/Models/cart.model.js";

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

  const wishlist = await wishlistModel.find({ student_ID: id }).populate({
    path: "course_ID",
    select: "title subTitle image price discount instructor isFavourite rate",
    populate: [{ path: "instructor", select: "firstName lastName" }],
  });

  // ✅ Get cart correctly
  const cart = await cartModel
    .findOne({ student_ID: id })
    .select("courses.course");

  const cartCourseIds =
    cart?.courses
      ?.filter((item) => item.course?._id)
      .map((item) => item.course._id.toString()) || [];

  const validWishlist = wishlist.filter((item) => item.course_ID);

  if (validWishlist.length !== wishlist.length) {
    await wishlistModel.deleteMany({
      student_ID: id,
      course_ID: null,
    });
  }

  const formattedWishlist = validWishlist.map((item) => {
    const course = item.course_ID.toObject();

    const isInCart = cartCourseIds.includes(course._id.toString());

    return {
      ...item.toObject(),
      course_ID: {
        ...course,
        isFavourite: true,
        isInCart,
      },
    };
  });

  res.status(200).json({
    message: "Wishlist fetched successfully",
    wishlist: formattedWishlist,
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
