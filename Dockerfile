FROM node:22-bookworm-slim

RUN apt-get update
RUN apt install -y \
  libnss3 \
  libdbus-1-3 \
  libatk1.0-0 \
  libgbm-dev \
  libasound2 \
  libxrandr2 \
  libxkbcommon-dev \
  libxfixes3 \
  libxcomposite1 \
  libxdamage1 \
  libatk-bridge2.0-0 \
  libpango-1.0-0 \
  libcairo2 \
  libcups2

WORKDIR /app

COPY package-lock.json package.json ./

RUN corepack enable && corepack prepare --activate
RUN npm ci

COPY . ./

RUN npx remotion browser ensure

ENTRYPOINT ["npm","run","render-chunk","--"]