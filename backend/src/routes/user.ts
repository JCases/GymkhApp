import { NextFunction, Request, Response, Router } from 'express';
import userBackend from '../backend/userBackend';
import { Errors } from '../web/src/shared';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.signIn(email, password).then(r => res.json(r)).catch(next);
  }

  public rehydrateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (token === 'Bearer undefined') return res.status(401).end();

    userBackend.rehydrateToken(req.params.token).then(r => {
      if (r.error) return res.status(401).end();
      res.json(r);
    }).catch(next);
  }

  public init() {
    this.router.post('/auth', this.signIn);
    this.router.get('/auth/rehydrate', this.rehydrateToken);
  }
}

const userRoutes = new UserRouter();
export default userRoutes.router;
