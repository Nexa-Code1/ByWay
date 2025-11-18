import usersModel from "../../../DB/Models/users.model.js";
import fs from "fs";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
  const { _id } = req.user;

  const user = await usersModel.findById(_id).select("-password -__v");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "User profile fetched successfully", user });
};

export const getUserProfileById = async (req, res) => {
  const { id } = req.params;

  const user = await usersModel.findById(id).select("-password -__v");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res
    .status(200)
    .json({ message: "User profile fetched successfully", user });
};

export const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { firstName, lastName, headLine, bio, language, links, isPrivate } =
    req.body;

  const user = await usersModel.findByIdAndUpdate(
    _id,
    {
      firstName,
      lastName,
      headLine,
      bio,
      language,
      links,
      isPrivate,
    },
    { new: true }
  );

  return res.status(200).json({ message: "User profile updated successfully" });
};

export const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await usersModel.findById(_id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatched = bcrypt.compareSync(currentPassword, user.password);
  const isPasswordReMatched = bcrypt.compareSync(newPassword, user.password);

  if (!isPasswordMatched) {
    return res.status(400).json({ message: "Invalid current password" });
  }

  if (isPasswordReMatched) {
    return res
      .status(400)
      .json({ message: "New password is same as current password" });
  }

  user.password = bcrypt.hashSync(newPassword, +process.env.SALT);

  await user.save();

  return res
    .status(200)
    .json({ message: "User password updated successfully" });
};

export const uploadImage = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const imageURL =
    `${req.protocol}://${req.get("host")}/` + req.file.path.replace(/\\/g, "/");

  const user = await usersModel.findById(_id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.image) {
    const oldImagePath = user.image.replace(
      `${req.protocol}://${req.get("host")}/`,
      ""
    );
    fs.unlinkSync(oldImagePath);
  }

  await usersModel.updateOne({ _id }, { image: imageURL });

  return res
    .status(200)
    .json({ message: "Profile image uploaded successfully" });
};

export const deleteImage = async (req, res) => {
  const { _id } = req.user;

  const user = await usersModel.findByIdAndUpdate(_id, {
    $unset: { image: 1 },
  });

  if (user.image) {
    const oldImagePath = user.image.replace(
      `${req.protocol}://${req.get("host")}/`,
      ""
    );
    fs.unlinkSync(oldImagePath);
  }

  return res
    .status(200)
    .json({ message: "Profile image deleted successfully" });
};
