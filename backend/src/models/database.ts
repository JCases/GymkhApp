import * as bcrypt from 'bcryptjs';
import path from 'path';
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

  // :memory:
  constructor() {
    this.mSequelize = new Sequelize(Environment.dbName!, Environment.dbUser!, Environment.dbPass!, {
      ...Environment.dbConfig,
      storage: path.resolve(__dirname, 'database.db'),
      sync: { force: false },
      modelPaths: [`${__dirname}*/*.model.ts`],
    });

    this.mModels = ({} as ISequelizeModels);
    this.mModels = this.getModels();

    this.mSequelize.sync().then(async (result: any) => {
      if ((await this.mModels.User.count()) === 0) {
        // FIXME: Example Inserts in Database
        const user = await this.mModels.User.create({ email: 'admin@admin.com', password: bcrypt.hashSync('admin'), nick: 'admin' });
        const company = await this.mModels.Company.create({ name: 'TestCompany', image: '' });
        const gymkhana = await company.createGymkhana({ name: 'TestGymkhana', description: '12', start: new Date(), end: new Date(), image: '', city: 'Alicante' });
        await user.addGymkhana(gymkhana);
        const phase = await gymkhana.createPhase({ name: 'TestPhase', description: 'Test', phaseOrder: 1, image: '' });
        await user.addPhase(phase);
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
