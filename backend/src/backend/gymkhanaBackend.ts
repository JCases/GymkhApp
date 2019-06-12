import moment from 'moment';
import { Op } from 'sequelize';

import { models } from '../models/database';

import { Errors, IGymkhana } from '../shared';

class GymkhanaBackend {
  public async getGymkhanas(city: string) {
    try {
      const gymkhanas = await models.Gymkhana.findAll({
        where: { city, start: { [Op.gte]: moment() } },
        order: [['start', 'DESC']],
      });
      if (gymkhanas.length > 0) return { result: gymkhanas };
      else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async getPhases(gymkhana: IGymkhana) {
    try {
      const gymkhanaDB = await models.Gymkhana.findByPk(gymkhana.id!);
      if (gymkhanaDB) {
        const phases = await gymkhanaDB.getPhases();
        return { result: phases };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }
}

const gymkhanaBackend = new GymkhanaBackend();
export default gymkhanaBackend;
