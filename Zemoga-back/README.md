#Back end Zemoga-Vote-App

##### Created by Oscar Arcos

you can run the back end locally by following the steps below

1. Create a .env file in the main folder with the following information:
    ```
//CONFIG
    
    PORT=4000
    CORS=*
    
    //MONGO
    DB_USER=db_user_zemogatest 
    DB_PASSWORD=olyKL4keZNUV2Bxm
    DB_HOST=cluster0.zcbnz.mongodb.net
    DB_NAME=zemogatest
```
This is because the back is connected to a *mongo atlas* instance and requires the access data.
2. Run the command:
`npm install`
This is because you need to install all the necessary node dependencies for the project to work.

3. Run the command
`npm run dev`
This final command allows us to run the local server.