
export const errorHandler=(err:any)=>{
    let message=''
   if(err.code===11000){
    return {message:"EMAIL IS ALREADY REGISTERED",statusCode:400}
   }
   if(err.name==='CastError'){
    return {message:"PROVIDED ID IS NOT VALID",statusCode:400}
   }
   if(err.name==='ValidationError'){
        for(const key in err.errors){
           message += err.errors[key].message;
           message += ','
        }
        return {message:message.slice(0,message.length-2),statusCode:400}
   }
   return {message:err.message,statusCode:500}
}