import authRouter from "../Modules/Auth/auth.controller.js";
import userRouter from "../Modules/Users/user.controller.js";
import categoriesRouter from "../Modules/Categories/categories.controller.js";
import coursesRouter from "../Modules/Courses/course.controller.js";
import sectionsRouter from "../Modules/Sections/section.controller.js";
import lessonsRouter from "../Modules/Sections/Lessons/lesson.controller.js";
import cartRouter from "../Modules/Cart/cart.controller.js";

const routerHandler = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "Hello in ByWay project!" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/courses", coursesRouter);
  app.use("/api/sections", sectionsRouter);
  app.use("/api/lessons", lessonsRouter);
  app.use("/api/cart", cartRouter);

  app.all(/.*/, (req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
};

export default routerHandler;
