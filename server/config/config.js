const env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
  const config = require('./config.json')
  const configEnv = config[env]

  Object.keys(configEnv).forEach(key => process.env[key] = configEnv[key])
}