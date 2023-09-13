import('@client').then(client =>
  new client.default().login(process.env.DISCORD_TOKEN),
)
