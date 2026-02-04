# ---------- frontend ----------
FROM node:lts-alpine AS client
WORKDIR /client

COPY client/package*.json ./
RUN npm ci --no-audit --no-fund --verbose

COPY client/ .
RUN npm run build

# ---------- server ----------
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app/server

COPY server/mvnw .
COPY server/.mvn .mvn
RUN chmod +x mvnw

COPY server/ .

COPY --from=client /client/dist src/main/resources/static/
RUN ./mvnw package -DskipTests

# ---------- runtime ----------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN adduser --system appuser
USER appuser
COPY --from=build /app/server/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]