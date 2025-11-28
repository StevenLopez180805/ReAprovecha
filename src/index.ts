import App from "./infrastructure/web/app";
import { ServerBootstrap } from './infrastructure/bootstrap/server.bootstrap';
import { connectDB } from "./infrastructure/config/data-base";

const serverBootstrap = new ServerBootstrap(App);

(
  async() => {
    try {
      const instances = [
        connectDB(),
        serverBootstrap.initialize()
      ];
      await Promise.all(instances);
    } catch (error) {
      console.log({error});
      process.exit(1);
    }
  }
)();