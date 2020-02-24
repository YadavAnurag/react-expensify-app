const promise = new Promise((resolve, reject)=>{
  const num = Math.random();
  setTimeout(()=>{
    if(num % 2 === 0){
      resolve(num);
    }else{
      reject(num);
    }
  }, 3000)
});

// const anotherPromise = new Promise((resolve, reject)=>{
//   const num = Math.random();
//   setTimeout(()=>{
//     if(num % 2 === 0){
//       resolve(num);
//     }else{
//       reject(num);
//     }
//   }, 3000)
// });

promise.then((data)=>{
  console.log('this is ', data);
}).catch((data)=>{
  console.log('promise not worked', data);
});

