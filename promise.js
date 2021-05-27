

//  class promise
// resolve , reject
// then

class Promise {
    constructor(resolve, reject) {

    }


    resolve(){}

    reject(){}

    then() {}

    catch() {}

}

 async function a (promise) {
    try {
        let value = await promise;
        console.log(value);
        return value;
    } catch(e) {
        console.log("ERROR:", e)
    } 
  
}

 let b = new Promise((resolve, reject) => {
   setTimeout(() => {
        resolve("urvashi")
   },500)
});

a(b)

