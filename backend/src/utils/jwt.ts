import jwt from 'jsonwebtoken';
import Environment from './environment';

class JWTHelper {
  public encode(data: any, expiresIn = '8h') {
    return jwt.sign(data, Environment.secret, { expiresIn, issuer: Environment.issuer });
  }

  public verify(token: string): any {
    try {
      return jwt.verify(token, Environment.secret, { issuer: Environment.issuer, ignoreExpiration: false });
    } catch (ex) { return false; }
  }
}

const jwtHelper = new JWTHelper();
export default jwtHelper;
