import * as bcrypt from 'bcryptjs';
import { models } from '../models/database';
import jwtHelper from '../utils/jwt';

import { Errors, IGymkhana, IPhase, IUser } from '../shared';

class UserBackend {
  public async signIn(email: string, password: string) {
    try {
      const user = await models.User.findOne({ where: { email } });
      if (user) {
        if (bcrypt.compareSync(password, user.password!)) {
          user.token = jwtHelper.encode({ id: user.id, type: 'user' }, '60 days');
          return { result: user };
        } else  return { error: { code: Errors.incorrectCredentials } };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async rehydrateToken(token: string) {
    try {
      const valid = jwtHelper.verify(token.substring(7));
      if (valid) {
        const user = await models.User.findByPk(valid.id);
        if (user) {
          user.token = jwtHelper.encode({ id: user.id, type: 'user' });
          return { result: user };
        } else return { error: { code: Errors.notLogged } };
      } else return { error: { code: Errors.notLogged } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async register(nick: string, email: string, password: string) {
    try {
      const passwordEncrypted = bcrypt.hashSync(password);
      const user = { nick, email, password: passwordEncrypted };
      const addUser = await models.User.create(user);
      if (addUser) {
        addUser.token = jwtHelper.encode({ id: addUser.id, type: 'user' }, '60 days');
        return { result: addUser };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async updateUser(user: IUser) {
    try {
      const userDB = await models.User.findByPk(user.id!);
      if (userDB) {
        const updateUser = await userDB.update(user);
        return { result: updateUser };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async addGymkhana(user: IUser, gymkhana: IGymkhana) {
    try {
      const gymkhanaDB = await models.Gymkhana.findByPk(gymkhana.id!);
      const userDB = await models.User.findByPk(user.id!);
      if (gymkhanaDB && userDB) {
        userDB.addGymkhana(gymkhanaDB);
        return { result: true };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async getGymkhanas(user: IUser) {
    try {
      const userDB = await models.User.findByPk(user.id!);
      if (userDB) {
        const gymkhanas = await userDB.getGymkhanas();
        return { result: gymkhanas };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async addPhase(user: IUser, phase: IPhase) {
    try {
      const userDB = await models.User.findByPk(user.id!);
      const phaseDB = await models.Phase.findByPk(phase.id!);
      if (userDB && phaseDB) {
        await userDB.addPhase(phaseDB);
        return { result: true };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }

  public async lastPhase(user: IUser) {
    try {
      const userDB = await models.User.findByPk(user.id!);
      if (userDB) {
        const lastStatus = await userDB.getPhases();
        if (lastStatus.length > 0) return { result: lastStatus[0] };
        else return { error: { code: Errors.notFound } };
      } else return { error: { code: Errors.incorrectRequest } };
    } catch (e) { return { error: { code: Errors.unexpected } }; }
  }
}

const userBackend = new UserBackend();
export default userBackend;
