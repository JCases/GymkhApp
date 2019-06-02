import * as bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize-typescript';
import Environment from './../utils/environment';

import Company from './company.model';
import Gymkhana from './gymkhana.model';
import Phase from './phase.model';
import Status from './status.model';
import User from './user.model';
import UsersGymkhanas from './usersGymkhanas.model';

interface ISequelizeModels {
  User: typeof User;
  Gymkhana: typeof Gymkhana;
  Company: typeof Company;
  Phase: typeof Phase;

  UsersGymkhana: typeof UsersGymkhanas;
  Status: typeof Status;
}

class Database {
  private mModels: ISequelizeModels;
  private mSequelize: Sequelize;

  constructor() {
    this.mSequelize = new Sequelize(Environment.dbName!, Environment.dbUser!, Environment.dbPass!, {
      ...Environment.dbConfig,
      storage: ':memory:',
      sync: { force: false },
      modelPaths: [`${__dirname}*/*.model.ts`],
    });

    this.mModels = ({} as ISequelizeModels);
    this.mModels = this.getModels();

    this.mSequelize.sync().then(async (result: any) => {
      if ((await this.mModels.User.count()) === 0) {
        // FIXME: Example Inserts in Database
        await this.mModels.User.create({ email: 'admin@admin.com', password: bcrypt.hashSync('admin'), nick: 'admin' });
      }
    });
  }

  public getModels(): ISequelizeModels { return (this.mSequelize as any).models; }
  public getSequelize() { return this.mSequelize; }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
export const db = database;
