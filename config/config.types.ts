export enum APP_CONTEXT {
  DEV = 'development',
  PROD = 'production',
}

export interface ApplicationConfig {
  app: {
    name: string;
    port: number;
    apiBaseUrl: string;
  };
  db: {
    url: string;
  };
  redis: {
    url: string;
  };
  context: APP_CONTEXT;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}
