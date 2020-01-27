const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
   user:{
       type: Schema.Types.ObjectId,
       ref: 'users'//so that user connected to the post ,so that user can delete there stuff 
   },
   text:{
       type:String,
       required:true
   },
   name:{
       type:String
   },
    // we are doing this because if the user delete his account then the post that he shared dont get affected
    //name and avatar of the user still be visible on the post whether the account is deleted or not 
   avatar:{
        type: String,
   },
   likes:[{
        user:{
            type: Schema.Types.ObjectId,
            ref:'users'
            //that way we can know which like came from which user
            //and only one like can be given to a singular post
        }
    }

   ],comments:[
       {
           user:{
            type: Schema.Types.ObjectId,
            ref:'users'
           },
           text:{
            type: String,

           },
           name:{
            type: String,

           },
           avatar:{
            type: String,
           },
           date:{
               type: Date,
               default:Date.now
           }

       }
   ],
   date:{
       type: Date,
       default:Date.now

   }
   

});

module.exports = Post = mongoose.model('post',PostSchema); 