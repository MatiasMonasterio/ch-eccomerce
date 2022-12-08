## Get Started
### Prerequisites
You need to be using:

- Git - [Download & Install Git](https://git-scm.com/downloads)
- Node - [Download & Install Node](https://nodejs.org/es/download/)
- Node Version Manager - [Dowload & Install NVM](https://github.com/nvm-sh/nvm)

### Environment Variables
This project works with two `.env` files on website and server workspace. You can copy `.env.example` and fill in the necessary fields.

### Run locally
You need Node v16.15.0 Set versions manually or with nvm:
```bash
nvm use
```

Install the required libraries and packages dependencies
```bash
npm install
```

Run the project in development
```bash
npm run dev:website
npm run dev:server
```

### Production
You can create a production build with
```bash
npm run build:website
npm run build:server
```