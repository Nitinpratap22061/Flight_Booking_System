# Flight Booking Service

A robust Node.js microservice for managing flight bookings. This service provides APIs to create, read, update and delete flight bookings, with error handling, logging, and asynchronous messaging capabilities.

## Features
- RESTful APIs for flight booking management
- Database persistence using Sequelize ORM
- Error handling with standardized responses
- Logging with Winston
- RabbitMQ integration for async operations
- Scheduled tasks using node-cron


`src` -> Inside the src folder all the actual source code regarding the project will reside, this will not include any kind of tests. (You might want to make separate tests folder)

Lets take a look inside the `src` folder

 - `config` -> In this folder anything and everything regarding any configurations or setup of a library or module will be done. For example: setting up `dotenv` so that we can use the environment variables anywhere in a cleaner fashion, this is done in the `server-config.js`. One more example can be to setup you logging library that can help you to prepare meaningful logs, so configuration for this library should also be done here. 

 - `routes` -> In the routes folder, we register a route and the corresponding middleware and controllers to it. 

 - `middlewares` -> they are just going to intercept the incoming requests where we can write our validators, authenticators etc. 

 - `controllers` -> they are kind of the last middlewares as post them you call you business layer to execute the budiness logic. In controllers we just receive the incoming requests and data and then pass it to the business layer, and once business layer returns an output, we structure the API response in controllers and send the output. 

 - `repositories` -> this folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

 - `services` -> contains the buiness logic and interacts with repositories for data from the database

 - `utils` -> contains helper methods, error classes etc.

### Setup the project

 - Download this template from github and open it in your favourite text editor. 
 - Go inside the folder path and execute the following command:
  ```
  npm install
  ```
 - In the root directory create a `.env` file and add the following env variables
    ```
        PORT=5000
        DB_SYNC=true
        AMQP_URL=amqp://localhost
    ```
 - go inside the `src` folder and execute the following command:
    ```
      npx sequelize init
    ```
 - By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder. 
 - If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
 - If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.

 - To run the server execute
 ```
 npm run dev
 ```

## API Documentation

### Create Booking
- **URL**: `/api/v1/bookings`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "flightId": "flight_123",
    "userId": "user_456",
    "noOfSeats": 2
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Successfully created the booking",
    "data": {
      "id": "booking_789",
      "flightId": "flight_123",
      "userId": "user_456",
      "noOfSeats": 2,
      "status": "BOOKED"
    },
    "error": {}
  }
  ```

### Get Booking
- **URL**: `/api/v1/bookings/:id`
- **Method**: `GET`
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Successfully fetched the booking",
    "data": {
      "id": "booking_789",
      "flightId": "flight_123",
      "userId": "user_456",
      "noOfSeats": 2,
      "status": "BOOKED"
    },
    "error": {}
  }
  ```

### Cancel Booking
- **URL**: `/api/v1/bookings/:id`
- **Method**: `PATCH`
- **Body**:
  ```json
  {
    "status": "CANCELLED"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Successfully cancelled the booking",
    "data": {
      "id": "booking_789",
      "status": "CANCELLED"
    },
    "error": {}
  }
  ```

## Error Responses
All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "data": {},
  "error": {
    "statusCode": 400/500,
    "explanation": "Detailed error message"
  }
}
```

## Dependencies
- Express: Web framework
- Sequelize: ORM for database operations
- Winston: Logging
- AMQP: Message queue integration
- Node-cron: Scheduled tasks
- Dotenv: Environment configuration

## Contributing
Feel free to raise issues or submit pull requests for improvements.
