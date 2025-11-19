import authRouter from "../Modules/Auth/auth.controller.js";
import userRouter from "../Modules/Users/user.controller.js";
import categoriesRouter from "../Modules/Categories/categories.controller.js";
import coursesRouter from "../Modules/Courses/course.controller.js";

const routerHandler = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "Hello in ByWay project!" });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/courses", coursesRouter);

  app.all(/.*/, (req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
};

export default routerHandler;
