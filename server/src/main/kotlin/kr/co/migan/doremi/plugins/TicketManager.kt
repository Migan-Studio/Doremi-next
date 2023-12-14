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
data class TicketData(
    val id: String,
    val user_id: String,
    val channel_id: String,
    val closed: Boolean,
    val guild_id: String,
    val created_at: LocalDateTime
)

@Serializable
data class TicketRequest(
    val user_id: String,
    val channel_id: String,
    val guild_id: String
)

@Serializable
data class TicketUpdateRequest(
    val closed: Boolean
)

class TicketManager(private val database: Database) {
    object Tickets : Table("ticket") {
        val id = varchar("id", 36)
        val user_id = varchar("user_id", 20)
        val channel_id = varchar("channel_id", 20)
        val closed = bool("closed").default(false)
        val guild_id = varchar("guild_id", 20)
        val created_at = datetime("created_at")
        override val primaryKey = PrimaryKey(id)
    }

    init {
        transaction(database) {
            SchemaUtils.create(Tickets)
        }
    }

    private suspend fun <T> dbQuery(block: suspend () -> T): T =
        newSuspendedTransaction(Dispatchers.IO) { block() }

    suspend fun create(ticket: TicketRequest): String = dbQuery {
        Tickets.insert {
            it[id] = UUID.randomUUID().toString()
            it[user_id] = ticket.user_id
            it[guild_id] = ticket.guild_id
            it[channel_id] = ticket.channel_id
            it[created_at] = java.time.LocalDateTime.now().toKotlinLocalDateTime()
        }[Tickets.id]
    }

    suspend fun read(channelId: String): TicketData? {
        return dbQuery {
            Tickets.select { Tickets.channel_id eq channelId }
                .map {
                    TicketData(
                        it[Tickets.id],
                        it[Tickets.user_id],
                        it[Tickets.channel_id],
                        it[Tickets.closed],
                        it[Tickets.guild_id],
                        it[Tickets.created_at]
                    )
                }
                .singleOrNull()
        }
    }

    suspend fun update(channelId: String, closed: Boolean) {
        dbQuery {
            Tickets.update({ Tickets.channel_id eq channelId }) {
                it[Tickets.closed] = closed
            }
        }
    }

    suspend fun delete(channelId: String) {
        dbQuery {
            Tickets.deleteWhere { Tickets.channel_id.eq(channelId) }
        }
    }
}
