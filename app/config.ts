interface IConfig {
  environment: 'development' | 'production';
  development_url: string;
  production_url: string;
}

export default <IConfig>{
  environment: 'development',
  development_url: 'http://localhost:3000',
  production_url: 'https://curation.space',
};
