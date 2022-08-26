<h1> REST API with Node.js, Mongoose && TypeScript </h1>


# Techs:
- Node.js
- MongoDB with Mongoose
- Typescript
- Express and express middleware

# Scope of project 
- The project have as goal create a User and make secure authentication, User can create many posts  after is logged into system. 

# How to use 
- Dowload the project in Github
- Install dependeces (yarn add or npm install)
- Set the environment variable into 'config' folder
. Create file named 'default' into root folder of project and paste e set values in this environment variables:</br>
    export default {</br>
        port: ,</br>
        host: ,</br>
        dbUri: ,</br>
        saltWorkFactor: ,</br>
        acessTokenTtl: ,</br>
        refreshTokenTtl:,</br>
        privateKey:,</br>
    }</br>
- Execute the command to run the project 'npm run dev'