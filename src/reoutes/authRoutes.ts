import express, { Express, NextFunction, Request, Response } from "express";

const authRoutes = express.Router();

authRoutes.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("im here");
});

authRoutes.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send(req.body);
});

export default authRoutes;
