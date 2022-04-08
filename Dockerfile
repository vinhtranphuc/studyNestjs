FROM 364595936796.dkr.ecr.ap-northeast-1.amazonaws.com/node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm ci \
    && npm run build \
    && npm prune --production

# ---

FROM 364595936796.dkr.ecr.ap-northeast-1.amazonaws.com/node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/
#COPY --from=builder /home/node/src/ /home/node/src/

CMD ["npm", "run", "start:prod"]