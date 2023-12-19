package kr.co.migan.doremi.plugins

import io.github.cdimascio.dotenv.dotenv
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Database

@Serializable
data class Response(val code: String, val message: String)

@Serializable
data class ResponseData<T>(val code: String, val data: T, val message: String)

fun Application.configureDatabases() {
    val dotenv = dotenv()
    val database = Database.connect(
        url = "jdbc:mariadb://${dotenv["MYSQL_HOST"]}:${dotenv["MYSQL_PORT"]}/${dotenv["MYSQL_DATABASE"]}",
        user = dotenv["MYSQL_USERNAME"],
        driver = "org.mariadb.jdbc.Driver",
        password = dotenv["MYSQL_PASSWORD"]
    )

    val guildManager = GuildManager(database)
    val warnManager = WarnManager(database)
    val ticketManager = TicketManager(database)

    routing {
        route("/v1") {
            route("/guilds") {
                get("/{guildId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid id")
                    val guild = guildManager.read(guildId)

                    if (guild == null) {
                        call.respond(HttpStatusCode.NotFound)
                    } else {
                        call.respond(HttpStatusCode.OK, guild)
                    }
                }
            }

            route("/warns") {
                get("/{guildId}/{userId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid guildId")
                    val userId =
                        call.parameters["userId"] ?: throw IllegalArgumentException("Invalid userId")
                    val warn = warnManager.read(guildId, userId)

                    if (warn == null) {
                        call.respond(HttpStatusCode.NotFound)
                    } else {
                        call.respond(HttpStatusCode.OK, warn)
                    }
                }
            }

            route("/tickets") {
                get("/{ticketId}") {
                    val ticketId = call.parameters["ticketId"] ?: throw IllegalArgumentException("Invalid id")
                    val ticket = ticketManager.read(ticketId)

                    if (ticket == null) {
                        call.respond(HttpStatusCode.NotFound)
                    } else {
                        call.respond(HttpStatusCode.OK, ticket)
                    }
                }
            }
        }

        route("/v2") {
            route("/guilds") {
                post("/create") {
                    val data = call.receive<GuildRequest>()
                    val id = guildManager.create(data)
                    call.respond(HttpStatusCode.Created, Response("201", "Guild $id created."))
                }

                get("/{guildId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid id")
                    val guild = guildManager.read(guildId)

                    if (guild == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Guild not found."))
                    } else {
                        call.respond(
                            HttpStatusCode.OK,
                            ResponseData("200", guild, "Guild ${guild.id} found.")
                        )
                    }
                }

                delete("/{guildId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid id")
                    val guild = guildManager.read(guildId)

                    if (guild == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Guild not found.`"))
                    } else {
                        guildManager.delete(guildId)
                        call.respond(HttpStatusCode.OK, Response("200", "Guild ${guild.id} deleted."))
                    }
                }
            }

            route("/warns") {
                post("/create") {
                    val data = call.receive<WarnRequest>()
                    val id = warnManager.create(data)
                    call.respond(HttpStatusCode.Created, Response("201", "Warn $id created."))
                }

                get("/{guildId}/{userId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid guildId")
                    val userId = call.parameters["userId"] ?: throw IllegalArgumentException("Invalid userId")
                    val warn = warnManager.read(guildId, userId)

                    if (warn == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Warn not found."))
                    } else {
                        call.respond(
                            HttpStatusCode.OK,
                            ResponseData("200", warn, "Warn ${warn.id} found.")
                        )
                    }
                }

                delete("/{guildId}/{userId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid id")
                    val userId = call.parameters["userId"] ?: throw IllegalArgumentException("Invalid id")
                    val warn = warnManager.read(guildId, userId)

                    if (warn == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Warn not found.`"))
                    } else {
                        warnManager.delete(warn.id)
                        call.respond(HttpStatusCode.OK, Response("200", "Warn ${warn.id} deleted."))
                    }
                }
            }

            route("/tickets") {
                post("/create") {
                    val data = call.receive<TicketRequest>()
                    val id = ticketManager.create(data)
                    call.respond(HttpStatusCode.Created, Response("201", "Ticket $id created."))
                }

                get("/{channelId}") {
                    val channelId = call.parameters["channelId"] ?: throw IllegalArgumentException("Invalid id")
                    val ticket = ticketManager.read(channelId)

                    if (ticket == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Guild not found."))
                    } else {
                        call.respond(
                            HttpStatusCode.OK,
                            ResponseData("200", ticket, "Ticket ${ticket.id} found.")
                        )
                    }
                }

                delete("/{channelId}") {
                    val channelId = call.parameters["channelId"] ?: throw IllegalArgumentException("Invalid id")
                    val ticket = ticketManager.read(channelId)

                    if (ticket == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Ticket not found.`"))
                    } else {
                        ticketManager.delete(channelId)
                        call.respond(HttpStatusCode.OK, Response("200", "Ticket ${ticket.id} deleted."))
                    }
                }

                patch("/{channelId}") {
                    val channelId = call.parameters["channelId"] ?: throw IllegalArgumentException("Invalid id")
                    val data = call.receive<TicketUpdateRequest>()
                    val ticket = ticketManager.read(channelId)

                    if (ticket == null) {
                        call.respond(HttpStatusCode.NotFound, Response("404", "Ticket not found.`"))
                    } else {
                        ticketManager.update(channelId, data)
                        call.respond(HttpStatusCode.OK, Response("200", "Ticket ${ticket.id} updated."))
                    }
                }
            }
        }
    }
}
