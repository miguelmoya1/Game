import { Sequelize, SyncOptions } from 'sequelize';
import {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  PROD,
} from '../app.constants';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { runMigrations } from 'sequelize-do-migrations';
import { highLiteSQL } from '../shared/tools/sequelize-color';
import { Colors } from '../shared/tools/colors';
import { setAssociations } from './associations';
import { createModels } from './createModels';
import { setDefaultValues } from './defaultValues';

@Injectable()
export class DbService implements OnModuleInit {
  private sequelize!: Sequelize;
  public readonly options: SyncOptions = {
    force: false,
  };

  constructor() {
    this.setSequelize();
  }

  async onModuleInit() {
    this.time('DATABASE');
    await this.createExtensions();
    this.createAllModels();
    this.setAssociations();
    await this.sequelize.sync(this.options);
    await runMigrations(this.sequelize, { showLogs: true });
    await this.createDefaultValues();
    this.time('DATABASE', true);
  }

  private async createExtensions() {
    this.time('CREATE EXTENSIONS...');
    await this.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    this.time('CREATE EXTENSIONS...', true);
  }

  private setAssociations() {
    this.time('SETTING THE ASSOCIATIONS...');
    setAssociations();
    this.time('SETTING THE ASSOCIATIONS...', true);
  }

  private createAllModels() {
    this.time('CREATING THE MODELS...');
    createModels(this.sequelize);
    this.time('CREATING THE MODELS...', true);
  }

  private async createDefaultValues() {
    this.time('CREATING THE DEFAULT VALUES...');
    await setDefaultValues();
    this.time('CREATING THE DEFAULT VALUES...', true);
  }

  private setSequelize() {
    this.time('INITIALIZING DATABASE...');
    try {
      this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: !PROD ? (text) => console.log(highLiteSQL(text)) : undefined,
        pool: {
          max: 20,
          min: 1,
          acquire: 30000,
          idle: 10000,
        },
      });
    } catch (e) {
      console.log(e);
    }
    this.time('INITIALIZING DATABASE...', true);
  }

  private time(message: string, timeEnd = false) {
    timeEnd
      ? console.timeEnd(`${Colors.FgBlue}${message}${Colors.Reset}`)
      : console.time(`${Colors.FgBlue}${message}${Colors.Reset}`);
  }
}
