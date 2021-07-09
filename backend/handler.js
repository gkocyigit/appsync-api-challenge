'use strict';

const AWS = require('aws-sdk')
AWS.config.update({
   region:"eu-central-1"
})
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.getStudents = async (event) => {
   console.log(event);
   var params={
      TableName:"Student"
   }

   await dynamo.scan(params,function(err,data){
      console.log(JSON.stringify(data.Items))
      if(err){
         return {"error": "There is an error while retrieving students"}
      }else{
         result=data.Items.map((x)=>new {"name":x.name,"score":x.score})
         console.log(result);
         return result;
      }
   })
};

module.exports.getStudent = async (event) => {
   console.log(JSON.stringify(event));
   return { name: 'Gokhan', score: '100' };
};

module.exports.addStudent = (event) => {
   console.log(JSON.stringify(event));
   var student={name:event["arguments"]["name"]}
   if ("score" in event["arguments"]){
      student["score"]=event["arguments"]["score"]
   }
   console.log(student)
   var params={
      TableName:"Student",
      Item:student,
   }

   dynamo.put(params).promise()
   .then(()=>{
      return student
   })
   .catch((err)=>{
      console.log(err);
      return {"error": "There is an error while adding new student"}
   })
};

