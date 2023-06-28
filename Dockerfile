# base image
FROM node:lts

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy package.json and package-lock.json files
COPY package*.json ./

# install dependencies
RUN npm ci

# copy prisma folder
COPY prisma ./prisma/

# wait for the postgres-db container to be ready
HEALTHCHECK --interval=5s CMD pg_isready -U prisma -h postgres-db || exit 1

# generate prisma client
RUN npx prisma generate


# copy source files
COPY . .

# expose port 3000
EXPOSE 3000

# run the application in development mode
CMD ["npm", "run", "dev"]