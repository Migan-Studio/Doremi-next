import config from '../config.json'
import('@client').then(client => new client.default().login(config.bot.token))
