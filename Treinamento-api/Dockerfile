# --------------- STAGE 1: BUILD ---------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["treinamento-api.csproj", "./"]
RUN dotnet restore "treinamento-api.csproj"

COPY . .
RUN dotnet publish -c Release -o /app/publish

# --------------- STAGE 2: RUNTIME ---------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS final
WORKDIR /app

COPY --from=build /app/publish .

EXPOSE 5126
ENTRYPOINT ["dotnet", "treinamento-api.dll"]