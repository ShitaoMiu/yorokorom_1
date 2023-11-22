FROM openjdk:11 AS builder
EXPOSE 8080
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:11
COPY --from=builder backend/build/libs/yorokorom-servers-0.0.1-SNAPSHOT.jar /yorokorom-servers.jar
ENTRYPOINT [ "java", "-jar", "/yorokorom-servers.jar" ]  
VOLUME [ "/tmp" ]