# Etap 1: Budowanie aplikacji React
FROM node:20 AS build

WORKDIR /remuz-io

# Skopiowanie plików projektu do kontenera
COPY . .

# Instalacja zależności
RUN npm install

# Budowanie aplikacji
RUN npm run build

# Etap 2: Uruchamianie aplikacji za pomocą npm serve
FROM node:20 AS serve

# Ustawienie katalogu roboczego na folder zbudowanej aplikacji
WORKDIR /remuz-io

# Skopiowanie zbudowanych plików do kontenera
COPY --from=build /remuz-io/build /remuz-io/build

# Instalacja serve
RUN npm install -g serve

# Eksponowanie portu
EXPOSE 3000

# Komenda startowa aplikacji
CMD ["serve", "-s", "build", "-l", "3000"]