package kr.co.migan.doremi.plugins

import kotlinx.coroutines.Dispatchers
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction

@Serializable
data class GuildData(val id: Int, val owner_id: String, val guild_id: String)

@Serializable
data class GuildRequest(val owner_id: String, val guild_id: String)

class GuildManager(private val database: Database) {
    object Guilds : Table("guild") {
        val id = integer("id").autoIncrement()
        val owner_id = varchar("owner_id", length = 20)
        val guild_id = varchar("guild_id", length = 20)
        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Guilds)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(guild: GuildRequest): Int = dbQuery {
        Guilds.insert {
            it[owner_id] = guild.owner_id
            it[guild_id] = guild.guild_id
        }[Guilds.id]
    }

    suspend fun read(guildId: String): GuildData? {
        return dbQuery {
            Guilds.select { Guilds.guild_id eq guildId }
                .map { GuildData(it[Guilds.id], it[Guilds.owner_id], it[Guilds.guild_id]) }
                .singleOrNull()
        }
    }

    suspend fun delete(guildId: String) = dbQuery {
        Guilds.deleteWhere { Guilds.guild_id.eq(guildId) }
    }
}
