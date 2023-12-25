FROM amazoncorretto:17

RUN mkdir -p /app/src
WORKDIR /app/src

COPY . .

RUN ./gradlew
RUN ./gradlew shadowJar
RUN cp ./build/libs/server-all.jar /app

WORKDIR /app
RUN rm -rf /app/src
COPY .env .

ENTRYPOINT ["java", "-Xmx512M", "-jar", "./server-all.jar"]
