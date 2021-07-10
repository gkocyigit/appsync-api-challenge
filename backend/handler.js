'use strict';

const AWS = require('aws-sdk')
AWS.config.update({
   region:"eu-central-1"
})
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.getStudents = async (event) =>  {
   var params={
      TableName:"Student"
   }

   return new Promise((resolve,reject)=>{
      dynamo.scan(params,function(err,data){
         if(err){
            console.log(err)
            reject({"error": "There is an error while retrieving students"})
         }
         resolve(data.Items);
      })
   })
};

module.exports.getStudent = async (event) => {

   var params={
      TableName:"Student",
      Key:{
         "name":event["arguments"]["name"]
      }
   }

   return new Promise((resolve,reject)=>{
      dynamo.get(params,function(err,data){
         if(err){
            console.log(err)
            reject({"error": "There is an error while retrieving students"})
         }
         resolve(data.Items);
      })
   })
};

module.exports.addStudent = async (event) => {
   var student={name:event["arguments"]["name"]}
   if ("score" in event["arguments"]){
      student["score"]=event["arguments"]["score"]
   }
   var params={
      TableName:"Student",
      Item:student,
   }

   return new Promise((resolve,reject)=>{
      dynamo.put(params).promise()
      .then(()=>{
         resolve(student)
      })
      .catch((err)=>{
         console.log(err);
         reject({"error": "There is an error while adding new student"})
      })
   })
   
};

