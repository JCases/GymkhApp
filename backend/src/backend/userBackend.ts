import * as bcrypt from 'bcryptjs';
import { models } from '../models/database';
import jwtHelper from '../utils/jwt';

import { Errors } from '../shared';

class UserBackend {
  public async signIn(email: string, password: string) {
    const user = await models.User.findOne({ where: { email } });
    if (user) {
      if (bcrypt.compareSync(password, user.password!)) {
        user.token = jwtHelper.encode({ id: user.id, type: 'user' }, '60 days');
        return { result: user };
      } else  return { error: { code: Errors.incorrectCredentials } };
    } else return { error: { code: Errors.incorrectCredentials } };
  }

  public async rehydrateToken(token: string) {
    const valid = jwtHelper.verify(token.substring(7));
    if (valid) {
      const user = await models.User.findByPk(valid.id);
      if (user) {
        user.token = jwtHelper.encode({ id: user.id, type: 'user' });
        return { result: user };
      } else return { error: { code: Errors.notLogged } };
    } else return { error: { code: Errors.notLogged } };
  }
}

const userBackend = new UserBackend();
export default userBackend;
