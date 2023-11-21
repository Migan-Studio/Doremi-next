FROM node:20.9.0

# Setting directory
RUN makedir /app
WORKDIR /app

# Copy code
COPY . .

# Run validate dependency and build
RUN yarn install --immutable --immutable-cache
RUN yarn build

RUN rm -r src

ENTRYPOINT ["yarn", "start"]