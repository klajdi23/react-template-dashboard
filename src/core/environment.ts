
const config: Map<string, any> = new Map<string, any>();

config.set("local", {
   apiEndpoint: "http://localhost:7500",
  env: 'local'
});

config.set("qa", {
  apiEndpoint: "",
  env: 'qa'
});

config.set("development", {
   apiEndpoint: "",
  env: 'development'
});

config.set("staging", {
  apiEndpoint: "",
  env: 'staging'
});

config.set("production", {
  apiEndpoint: "",
  env: 'production'
});



const env =  config.get( "local" as string);

export default env;
