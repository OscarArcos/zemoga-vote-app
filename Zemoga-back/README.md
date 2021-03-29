# Back end Zemoga-Vote-App

##### Created by Oscar Arcos

you can run the back end locally by following the steps below

Create a .env file in the main folder with the following information:

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

```bash
# install all the necessary node dependencies for the project to work
$ npm install

# allows us to run the local server
$ npm run dev

```
