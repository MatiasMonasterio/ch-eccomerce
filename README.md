## Get Started
### Prerequisites
You need to be using:

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node - [Download & Install Node](https://nodejs.org/es/download/)
- Node Version Manager - [Dowload & Install NVM](https://github.com/nvm-sh/nvm)
- Yarn - [Dowliad & Intall Yarn](https://yarnpkg.com/)
- Docker Compose - [Dowload & Install Docker](https://docs.docker.com/compose/)

### Environment Variables
This project works with three `.env` files on client, server and root. You can copy `.env.example` and use the default environment settings.

### Docker Compose
In the case of using mongo as storage, this project is ready to work with docker-compose to initialize the necessary stack during the development process.
To start working, run the following commands:

```bash
docker-compose build
docker-compose up -d
```

### Run locally
You need Node v16.15.0 Set versions manually or with nvm:
```bash
nvm use
```

Install the required libraries and packages dependencies
```bash
yarn install
```

Run the development server
```bash
yanr dev
```

### Production
You can create a production build with
```bash
yarn build
```