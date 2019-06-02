import * as path from 'path';

export default class Environment {
  public static isProd = process.env.NODE_ENV === 'production';
  public static logFolder = process.env.LOG_FOLDER || path.resolve('./logs');
  public static port = 3005;
  public static host = 'localhost';

  public static secret = 'D2FSfsdhjFSADeSFSAD2dsfsd8';
  public static issuer = 'gymkhapp2020';

  public static dialect = 'sqlite';

  // FIXME: Update with Docker Info
  public static dbName = 'gymkhapp' || process.env.DB_NAME;
  public static dbPass = 'root' || process.env.DB_USER;
  public static dbUser = 'root' || process.env.DB_PASS;

  public static dbConfig: any = {
    host: Environment.host || process.env.DB_HOST,
    port: Environment.port || process.env.DB_PORT,
    dialect: Environment.dialect,
    ...(Environment.dialect !== 'sqlite' && { timezone: 'Europe/Dublin' }), // Without TimeZone if dialect is 'sqlite'
    isolationLevel: 'READ COMMITTED', // Needs this to lock transactions
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },
  };
}
