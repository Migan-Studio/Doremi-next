import { Pool, createPool } from 'mysql2/promise'
import config from '../../config.json'
import type { GuildData } from '@types'
import { type Snowflake } from 'discord.js'

class GuildTable {
  public constructor(private _database: Pool) {}

  public async all() {
    return await this._database.execute<GuildData[]>(`select * from guild;`)
  }

  public async insert(data: { owner_id: Snowflake }) {
    const db = await this._database.getConnection()

    try {
      await db.beginTransaction()
      await db.execute(`insert into guild (owner_id) values (?);`, [
        data.owner_id,
      ])
      await db.commit()
    } catch (err) {
      console.error(err)
      await db.rollback()
    } finally {
      db.release()
    }
  }

  public async delete(key: Snowflake) {
    const db = await this._database.getConnection()

    try {
      await db.beginTransaction()
      await db.execute(`delete from guild where guild_id = ?;`, [key])
      await db.commit()
    } catch (err) {
      console.error(err)
      await db.rollback()
    } finally {
      db.release()
    }
  }
}

class WarnTable {
  public constructor(private _database: Pool) {}

  public async all() {
    return await this._database.execute<GuildData[]>(`select * from warn;`)
  }

  public async insert(data: {
    warn_count: number
    guild_id: Snowflake
    user_id: Snowflake
  }) {
    const db = await this._database.getConnection()

    try {
      await db.beginTransaction()
      await db.execute(
        `insert into warn (warn_count, guild_id, user_id) values (?, ?, ?);`,
        [data.warn_count, data.guild_id, data.user_id],
      )
      await db.commit()
    } catch (err) {
      console.error(err)
      await db.rollback()
    } finally {
      db.release()
    }
  }

  public async delete(key: Snowflake) {
    const db = await this._database.getConnection()

    try {
      await db.beginTransaction()
      await db.execute(`delete from warn where guild_id = ?;`, [key])
      await db.commit()
    } catch (err) {
      console.error(err)
      await db.rollback()
    } finally {
      db.release()
    }
  }
}
export class Database {
  private _database = createPool({
    ...config.mysql,
    keepAliveInitialDelay: 10000,
    enableKeepAlive: true,
  })

  private _guild = new GuildTable(this._database)
  private _warn = new WarnTable(this._database)

  public get guild() {
    return this._guild
  }

  public get warn() {
    return this._warn
  }
}
