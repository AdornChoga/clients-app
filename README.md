# Clients App

## Getting Started

- Prerequisites:

  1. Node
  2. Git
  3. Mongodb [installation](https://www.mongodb.com/docs/manual/installation/)

- Project setup

  1. Clone this repository
  2. Navigate into the `clients-app` directory
  3. Open your terminal and run `npm install` to install backend dependencies
  4. Run `npm install --prefix ./client` to install client dependencies

## Running the app

> - Run `npm run build` to build the application
> - Run `npm run dev` to start the server
> - Go to [http://localhost:5000](http://localhost:5000) to interact with
>   the build version of the app which is statically being served by the backend.
> - If you want to play with code and see the changes
>   live go to [http://localhost:3000](http://localhost:3000)
> - Everytime you make changes to the code and want to see the changes live
>   in the "build version" of the application be sure to run
>   `npm run build` and start the server again.

<hr />

## Database

> - The database (`clients_app`) of this application will be created
>   automatically locally when you run the app, so there is no configuration needed.
> - If running the application on local database is being problematic
>   replace the value of `DB_URI` in the [.env](./.env) file with the
>   following MongoDB Atlas URI (no further configuration needed):
>   `mongodb+srv://adorn:clientsAppPwd@clientsapp.orvjscj.mongodb.net/clients_app?retryWrites=true&w=majority`.
> - The local database URI (which is currently set) is `mongodb://localhost:27017/clients_app`.

<hr />

## API Documentation

> To see the app's API documentation go to [http://localhost:5000/api-docs](http://localhost:5000/api-docs).
> while the server is running.

## Author

👤 **Adorn Choga**

- Website: [adorn-choga](https://adorn-choga.netlify.app)
- GitHub: [AdornChoga](https://github.com/AdornChoga)
- Twitter: [@adornchoga](https://twitter.com/adorn_choga)
- LinkedIn: [@adornchoga](https://www.linkedin.com/in/adorn-choga)
