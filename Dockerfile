# Usar imagem base leve com Node.js
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro (para aproveitar cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

RUN npm i strapi-advanced-uuid

# Copiar o restante do código
COPY . .

# Expor a porta padrão do Strapi
EXPOSE 1337

# Comando para rodar em modo dev
CMD ["npm", "run", "develop"]