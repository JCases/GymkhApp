import { NextFunction, Request, Response, Router } from 'express';
import gymkhanaBackend from '../backend/gymkhanaBackend';
import { Errors } from './../shared';

export class GymkhanaRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getGymkhanas(req: Request, res: Response, next: NextFunction) {
    const { city } = req.params;
    if (!city) return res.json({ error: { code: Errors.incorrectRequest } });
    gymkhanaBackend.getGymkhanas(city).then(r => res.json(r)).catch(next);
  }

  public getPhases(req: Request, res: Response, next: NextFunction) {
    const { gymkhana } = req.body;
    if (!gymkhana) return res.json({ error: { code: Errors.incorrectRequest } });
    gymkhanaBackend.getPhases(gymkhana).then(r => res.json(r)).catch(next);
  }

  public init() {
    this.router.get('/:city', this.getGymkhanas);
    this.router.post('/phases', this.getPhases);
  }
}

const gymkhanaRoutes = new GymkhanaRouter();
export default gymkhanaRoutes.router;
