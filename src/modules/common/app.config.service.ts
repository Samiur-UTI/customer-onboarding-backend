import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { APP_CONTEXT, ApplicationConfig } from 'config/config.types';

@Injectable()
export class AppConfigService {
  private applicationConfig: ApplicationConfig;

  constructor() {
    this.applicationConfig = config as unknown as ApplicationConfig;
  }

  public getAppConfig(): ApplicationConfig {
    return this.applicationConfig;
  }

  public isDevelopment(): boolean {
    return this.applicationConfig.context !== APP_CONTEXT.PROD;
  }

  public isProduction(): boolean {
    return this.applicationConfig.context === APP_CONTEXT.PROD;
  }

  public getDbUrl(): string {
    return this.applicationConfig.db.url;
  }

  public getJwtConfig(): { secret: string; expiresIn: string } {
    return this.applicationConfig.jwt;
  }
}
