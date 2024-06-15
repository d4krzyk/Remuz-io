# Etap 1: Budowanie aplikacji React
FROM node:20 AS build

WORKDIR /app

# Skopiowanie plików projektu do kontenera
COPY . .

# Instalacja zależności
RUN npm install

# Budowanie aplikacji
RUN npm run build

# Etap 2: Uruchamianie aplikacji za pomocą npm serve
FROM node:20 AS serve

# Ustawienie katalogu roboczego na folder zbudowanej aplikacji
WORKDIR /app

# Skopiowanie zbudowanych plików do kontenera
COPY --from=build /app/build /app/build

# Instalacja serve
RUN npm install -g serve

# Eksponowanie portu
EXPOSE 3000

# Komenda startowa aplikacji
CMD ["serve", "-s", "build", "-l", "3000"]