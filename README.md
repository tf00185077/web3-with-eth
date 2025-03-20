This is a [Next.js](https://nextjs.org) project
Backend is in the `backend` folder and need submodules to be initialized
```bash
# install backend
git submodule update --init --recursive
```
Follow the env.local.example to create your own .env.local file
And all is run with docker compose

## Getting Started 
(local and without docker)
run the development frontend and backend:

# frontend (in root folder)
```bash
pnpm install
pnpm dev
```

# backend (in a different terminal and move to backend folder)
```bash
pnpm install
pnpm dev
```

## Docker
Make sure you have correct .env settings in the root folder

```bash
docker compose up 
```


