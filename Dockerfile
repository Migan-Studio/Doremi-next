FROM node:20.9.0

# Setting directory
RUN mkdir /app
WORKDIR /app

# Copy code
COPY . .

# Run validate dependency and build
RUN yarn install
RUN yarn build

RUN rm -r src

ENTRYPOINT ["yarn", "start"]