# Clients App

## Getting Started

- Prerequisites:

  1. Node
  2. Git
  3. Mongodb [installation](https://www.mongodb.com/docs/manual/installation/)

- Project setup

  1. Clone this repository
  2. Move into the `clients-app` directory(clone)
  3. Run `npm install`

There are two options to run this app locally:

## Development Mode

> To play with the app's code and see the changes live:
>
> - Change the value of `APP_ENV` in the [.env](./.env) file to `development` (without quotes).
> - Open your terminal and run `npm run dev`.
> - To build the changes made (only necessary if you then want to see the changes in `simulated production mode`)
>   run `npm run build`.

## Simulated Production Mode

> To interact with the build application (one exists already):
>
> - Confirm that the value of `APP_ENV` in the [.env](./.env)
>   file is `simulated_production` (without quotes).
> - If you have made some changes to the code and want them live in this mode, be sure to run `npm run build` first.
> - Run `npm start`.

<hr />

## Database

> - The database (`clients_app`) of this application will be created
>   automatically locally when you run the app in either
>   of the modes listed above so there is no configuration needed.
> - If running the application on local database is being problematic
>   replace the value of `DB_URI` in the [.env](./.env) file with the
>   following atlas URI (no further configuration needed):
>   `mongodb+srv://adorn:clientsAppPwd@clientsapp.orvjscj.mongodb.net/clients_app?retryWrites=true&w=majority`.
> - The local database URI (which is currently set) is `mongodb://localhost:27017/clients_app`.

<hr />

## API Documentation

> To see the app's API documentation go to [http://localhost:5000/api-docs](http://localhost:5000/api-docs).
> while the server is running ( either in `development` or `simulated production mode`).
