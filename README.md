# Doremi

### Make your comfort [discord](https://discord.com) guild.

- PerioDis' (previous Migan Studio) discord bot.
- This is [doremi](https://discord.com/oauth2/authorize?client_id=704999866094452816&permissions=8&scope=applications.commands%20bot)'s next version.
- [This is previous doremi version.](https://github.com/Migan-Studio/Doremi)

## Using

- This is use licence at `GNU AGPL-3.0`.
- Require `Node.JS 16.9.0 higher` and `yarn`.
- Require `Amazon Correcto 17`.

### Clone

```shell
git clone https://github.com/Migan-Studio/Doremi-next.git
```

### Server

#### Setting environment file

1. Copy from `.env.example` to `.env`
2. Insert your mariadb server's info.

#### Build

```shell
# Work in server directory
cd server
# If you using Windows, use ./gradlew.bat
./gradlew
./gradlew shadowJar
```

#### Run

```shell
# Work in server directory
cd server
java -jar ./build/libs/server-all.jar
```

### Bot

#### Setting config file

1. Copy from `config.example.json` to `config.json`
2. Insert config file (If you don't have [koreanbots](https://koreanbots.dev) token, delete it).

#### Install dependencies

```shell
# Work in bot directory
cd bot
yarn install
```

#### Build

```shell
# Work in bot directory
cd bot
yarn build
```

#### Run

```shell
# Work in bot directory
cd bot
yarn start
```
