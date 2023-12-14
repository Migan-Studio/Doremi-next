package kr.co.migan.doremi.plugins

import kotlinx.coroutines.Dispatchers
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.kotlin.datetime.datetime
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.*

@Serializable
data class WarnData(
    val id: String,
    val guild_id: String,
    val user_id: String,
    val reason: String,
    val created_at: LocalDateTime
)

@Serializable
data class WarnRequest(
    val guild_id: String,
    val user_id: String,
    val reason: String
)

class WarnManager(private val database: Database) {
    object Warns : Table("warn") {
        val id = varchar("id", 36)
        val guild_id = varchar("guild_id", 20)
        val user_id = varchar("user_id", 20)
        val reason = varchar("reason", 500)
        val created_at = datetime("created_at")
        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Warns)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(warn: WarnRequest): String = dbQuery {
        Warns.insert {
            it[id] = UUID.randomUUID().toString()
            it[guild_id] = warn.guild_id
            it[user_id] = warn.user_id
            it[reason] = warn.reason
            it[created_at] = java.time.LocalDateTime.now().toKotlinLocalDateTime()
        }[Warns.id]
    }

    suspend fun read(guildId: String, userId: String): WarnData? {
        return dbQuery {
            Warns.select { (Warns.guild_id eq guildId) and (Warns.user_id eq userId) }
                .map {
                    WarnData(
                        it[Warns.id],
                        it[Warns.guild_id],
                        it[Warns.user_id],
                        it[Warns.reason],
                        it[Warns.created_at]
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun delete(id: String) {
        dbQuery {
            Warns.deleteWhere { Warns.id eq id }
        }
    }
}
