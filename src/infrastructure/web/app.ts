import express from "express";
import UserRoutes from "../routes/UserRoutes";
import PublicationRoutes from "../routes/PublicationRoutes";

class App{
  private app: express.Application;

  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares():void{
    this.app.use(express.json());
  }

  private routes():void{
    this.app.use("/api", UserRoutes);
    this.app.use("/api", PublicationRoutes);
  }

  getApp(){
    return this.app;
  }
}

export default new App().getApp();