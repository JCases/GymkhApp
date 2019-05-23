import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import './models/database';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  private middlewares() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private routes() {
    // TODO: Routes -> this.app.use('/v1/user', userRoutes);
  }

  // FIXME: Change to Logget (Create and Import Logger Files)
  private errorHandler() {
    console.error('Setting up error handler');
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error(err.message, err.stack);
      res.status(500).end('Unexpected error');
    });
  }
}
const app = new App();
export default app.app;
