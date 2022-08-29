   import mongoose  from "mongoose";
   import config from "config";

   export default function connect(){
        const dbUri = config.get("dbUri") as string;
        
        return mongoose.connect(dbUri, {
        })
        .then(()=> {
             console.log("DB conected");
        }).catch((error)=>{
             console.log("DB error"+error);
             process.exit(1);
        })
   }