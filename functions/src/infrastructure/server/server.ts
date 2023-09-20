import * as express from "express";
import helmet from "helmet";
import * as cors from "cors";

interface Options {
  port: number | string;
  routes: express.Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number | string;
  private readonly routes: express.Router;

  constructor(options: Options) {
    const {port, routes} = options;

    this.port = port;
    this.routes = routes;
  }

  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(helmet());
    this.app.use(cors({
      origin: "*",
    }));
  }

  setupRoutes() {
    this.app.use(this.routes);
  }

  getInstance() {
    this.setupMiddlewares();
    this.setupRoutes();
    console.log(`server listen in port ${this.port}`);
    return this.app;
  }
}
