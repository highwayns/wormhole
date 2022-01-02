# lp_ui

## 前提条件

-Docker
-NodeJS v14 +

このリポジトリのルートから次を実行します


```bash
DOCKER_BUILDKIT=1 docker build --target node-export -f Dockerfile.proto -o type=local,dest=. .
DOCKER_BUILDKIT=1 docker build -f solana/Dockerfile.wasm -o type=local,dest=. solana
npm ci --prefix ethereum
npm ci --prefix sdk/js
npm run build --prefix sdk/js
```

The remaining steps can be run from this folder

## Install

```bash
npm ci
```

## Develop

```bash
npm start
```
