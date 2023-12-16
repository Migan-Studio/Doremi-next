package kr.co.migan.doremi.plugins

import io.github.cdimascio.dotenv.dotenv
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.jetbrains.exposed.sql.Database

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
                post("/create") {
                    val guild = call.receive<GuildRequest>()
                    guildManager.create(guild)
                    call.respond(HttpStatusCode.Created)
                }

                get("/{guildId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid id")
                    val guild = guildManager.read(guildId)

                    if (guild == null) {
                        call.respond(HttpStatusCode.NotFound)
                    } else {
                        call.respond(HttpStatusCode.OK, guild)
                    }
                }

                delete("/{guildId}") {
                    val guildId = call.parameters["guildId"] ?: throw IllegalArgumentException("Invalid id")
                    guildManager.delete(guildId)
                    call.respond(HttpStatusCode.OK)
                }
            }

            route("/warns") {
                post("/create") {
                    val warn = call.receive<WarnRequest>()
                    warnManager.create(warn)
                    call.respond(HttpStatusCode.Created)
                }

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

                delete("/{id}") {
                    val id = call.parameters["id"] ?: throw IllegalArgumentException("Invalid id")
                    warnManager.delete(id)
                    call.respond(HttpStatusCode.OK)
                }
            }

            route("/tickets") {
                post("/create") {
                    val ticket = call.receive<TicketRequest>()
                    ticketManager.create(ticket)
                    call.respond(HttpStatusCode.Created)
                }

                get("/{ticketId}") {
                    val ticketId = call.parameters["ticketId"] ?: throw IllegalArgumentException("Invalid id")
                    val ticket = ticketManager.read(ticketId)

                    if (ticket == null) {
                        call.respond(HttpStatusCode.NotFound)
                    } else {
                        call.respond(HttpStatusCode.OK, ticket)
                    }
                }

                delete("/{ticketId}") {
                    val ticketId = call.parameters["ticketId"] ?: throw IllegalArgumentException("Invalid id")
                    ticketManager.delete(ticketId)
                    call.respond(HttpStatusCode.OK)
                }

                patch("/{channelId}") {
                    val channelId = call.parameters["channelId"] ?: throw IllegalArgumentException("Invalid id")
                    val ticket = call.receive<TicketUpdateRequest>()
                    ticketManager.update(channelId, ticket)
                    call.respond(HttpStatusCode.OK)
                }
            }
        }
    }
}
