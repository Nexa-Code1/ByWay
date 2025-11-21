import cartModel from "../../../DB/Models/cart.model.js";
import coursesModel from "../../../DB/Models/courses.model.js";

export const getCartService = async (req, res) => {
  const { id } = req.user;

  const cart = await cartModel.findOne({ student_ID: id }).populate({
    path: "courses.course",
    select: "title subTitle instructor price discount category isFavourite",
    populate: [
      {
        path: "instructor",
        select: "firstName lastName image",
      },
      {
        path: "category",
        select: "name slug -_id",
      },
    ],
  });

  if (!cart) {
    return res.status(200).json({
      message: "Cart is empty",
      totalPrice: 0,
      cart: [],
    });
  }

  let totalCartPrice = 0;

  cart.courses = cart.courses.map((item) => {
    const course = item.course;

    const finalPrice = course.discount
      ? course.price - (course.price * course.discount) / 100
      : course.price;

    totalCartPrice += finalPrice * item.quantity;

    return item;
  });

  res.status(200).json({
    message: "Cart fetched successfully",
    totalCartPrice,
    cart,
  });
};

export const addToCart = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  let cart = await cartModel.findOne({ student_ID: id });

  if (!cart) {
    cart = await cartModel.create({
      student_ID: id,
      courses: [{ course: courseId, quantity: 1 }],
    });
    return res.json({ message: "Course added to cart", cart });
  }

  const item = cart.courses.find((c) => c.course.toString() === courseId);

  if (item) {
    return res.status(400).json({ message: "Course already exists in cart" });
  } else {
    cart.courses.push({ course: courseId, quantity: 1, totalPrice: 0 });
  }

  await cart.save();

  return res.json({ message: "Course added to cart" });
};

export const increaseQuantity = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  const cart = await cartModel.findOne({ student_ID: id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.courses.find((c) => c.course.toString() === courseId);

  if (!item)
    return res.status(404).json({ message: "Course not found in cart" });

  const course = await coursesModel.findById(courseId).select("price discount");

  const finalPrice = course.discount
    ? course.price - (course.price * course.discount) / 100
    : course.price;

  item.quantity += 1;
  item.totalPrice = item.quantity * finalPrice;

  await cart.save();

  res.json({ message: "Quantity increased", cart });
};

export const decreaseQuantity = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  const cart = await cartModel.findOne({ student_ID: id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.courses.find((c) => c.course.toString() === courseId);

  if (!item)
    return res.status(404).json({ message: "Course not found in cart" });

  const course = await coursesModel.findById(courseId).select("price discount");

  const finalPrice = course.discount
    ? course.price - (course.price * course.discount) / 100
    : course.price;

  if (item.quantity > 1) {
    item.quantity -= 1;
    item.totalPrice = item.quantity * finalPrice;
  } else {
    await cartModel.findOneAndUpdate(
      { student_ID: id },
      { $pull: { courses: { course: courseId } } }
    );
    return res.json({ message: "Course removed from cart" });
  }

  await cart.save();

  res.json({ message: "Quantity decreased", cart });
};

export const deleteCourseFromCart = async (req, res) => {
  const { id } = req.user;
  const { courseId } = req.params;

  const cart = await cartModel.findOne({ student_ID: id });

  if (!cart) {
    return res.status(404).json({ message: "Cart is empty" });
  }
  const itemIndex = cart.courses.findIndex(
    (c) => c.course.toString() === courseId
  );

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Course not found in cart" });
  }

  await cartModel.findOneAndUpdate(
    { student_ID: id },
    { $pull: { courses: { course: courseId } } }
  );

  return res.status(200).json({
    message: "Course removed from cart successfully",
  });
};

export const clearCart = async (req, res) => {
  const { id } = req.user;

  const cart = await cartModel.findOneAndDelete({ student_ID: id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  return res.status(200).json({
    message: "Cart cleared successfully",
  });
};
