'use strict';

module.exports.getStudent = async (event) => {
   console.log(JSON.stringify(event));
   return { name: 'Gokhan', score: '100' };
};
