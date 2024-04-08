let n = new Promise(function (resolve) {
    resolve()
    console.log(n);     // does not return anything as 'n' is not fully initialized because the resolver function is still executing. The Promise object n is not fully constructed until the execution of the resolver function completes.
})
n.then(function() {
    console.log(n);         // Promise { undefined }
    console.log("hi there");
})