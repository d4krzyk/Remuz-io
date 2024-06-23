# Etap 1: Budowanie aplikacji React
FROM node:20 AS build

WORKDIR /app

# Skopiowanie plików projektu do kontenera
COPY . .

# Instalacja zależności
RUN npm install

# Budowanie aplikacji
RUN npm run build

