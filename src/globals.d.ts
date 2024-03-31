export {}; // Make this a module

declare global {
  interface IAppConfig {
    appPath: string;
    rendererPath: string,
    preloadPath: string,
    resourcesPath: string;
  }
  var APP_CONFIG: IAppConfig;
}
