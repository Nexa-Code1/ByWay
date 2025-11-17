import authRouter from "../Modules/Auth/auth.controller.js";

const routerHandler = (app) => {
  app.get("/", (req, res) => {
    res.send("Hello in ByWay project!");
  });

  app.use("/api/auth", authRouter);

  app.all(/.*/, (req, res) => {
    res.status(404).json({ message: "Route not found" });
  });
};

export default routerHandler;
