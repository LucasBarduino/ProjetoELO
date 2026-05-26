# --------------- STAGE 1: BUILD ---------------
FROM node:24-alpine AS build
WORKDIR /app

# Copia manifests de dependencias primeiro (cache!)
COPY package.json package-lock.json ./
RUN npm install

# Copia o codigo e faz o build de producao
COPY . .
RUN npm run build

# --------------- STAGE 2: SERVE COM NGINX ---------------
FROM nginx:alpine AS final

# Copia os arquivos estaticos gerados para o diretorio do Nginx
# O builder moderno (@angular/build:application) gera em dist/treinamento/browser
COPY --from=build /app/dist/treinamento/browser /usr/share/nginx/html

# Configuracao customizada para SPA - fallback para index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
