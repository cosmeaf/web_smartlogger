# Etapa de construção
FROM node:14 AS build

# Metadados
LABEL version="1.0"
LABEL description="Projeto ReactJS para o SmartLogger"
LABEL maintainer="contato@smartlogger.com.br"

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json ./
COPY package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copiar os arquivos construídos para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta 4000
EXPOSE 4000

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
