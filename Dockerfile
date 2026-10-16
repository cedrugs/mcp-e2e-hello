FROM node:22-alpine
WORKDIR /app
COPY package.json server.js ./
USER node
ENV PORT=3000 HOST=0.0.0.0
EXPOSE 3000
CMD ["node", "server.js"]
