import { NextFunction, Request, Response, Router } from 'express';
import userBackend from '../backend/userBackend';
import { Errors } from './../shared';

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

  public register(req: Request, res: Response, next: NextFunction) {
    const { nick, email, password } = req.body;
    if (!nick || !email || !password) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.register(nick, email, password).then(r => res.json(r)).catch(next);
  }

  public updateUser(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;
    if (!user) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.updateUser(user).then(r => res.json(r)).catch(next);
  }

  public addGymkhana(req: Request, res: Response, next: NextFunction) {
    const { user, gymkhana } = req.body;
    if (!user || !gymkhana) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.addGymkhana(user, gymkhana).then(r => res.json(r)).catch(next);
  }

  public getGymkhanas(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;
    if (!user) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.getGymkhanas(user).then(r => res.json(r)).catch(next);
  }

  public addPhase(req: Request, res: Response, next: NextFunction) {
    const { user, phase } = req.body;
    if (!user && phase) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.addPhase(user, phase).then(r => res.json(r)).catch(next);
  }

  public lastPhase(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;
    if (!user) return res.json({ error: { code: Errors.incorrectRequest } });
    userBackend.lastPhase(user).then(r => res.json(r)).catch(next);
  }

  public init() {
    this.router.post('/auth', this.signIn);
    this.router.get('/auth/rehydrate', this.rehydrateToken);
    this.router.post('/register', this.register);
    this.router.put('/update', this.updateUser);

    this.router.put('/gymkhana', this.addGymkhana);
    this.router.get('/gymkhana', this.getGymkhanas);

    this.router.put('/phase', this.addPhase);
    this.router.get('/phase', this.lastPhase);
  }
}

const userRoutes = new UserRouter();
export default userRoutes.router;
