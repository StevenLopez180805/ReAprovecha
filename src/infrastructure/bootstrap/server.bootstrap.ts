import express from 'express';
import http from 'http';
import envs from '../config/environment-vars';

export class ServerBootstrap{
  private app: express.Application;

  constructor(app:express.Application){
    this.app = app;
  }

  initialize = ():Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      const port = Number(envs.PORT ?? 4000)
      server.listen(port)
      .on("listening", () => {
          console.log(`El servidor esta corriendo en el puerto ${port}`);
          resolve(true);
      })
      .on("error", err => {
        console.log(`Se ha generado un error ${err}`);
        resolve(false);
      });
    });
  }
}