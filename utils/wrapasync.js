// module.exports=  (fn) =>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch(next);
//     }
// }
module.exports = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            console.error("Async error:", err); // Logs the error details
            next(err); // Passes the error to Express error handler
        });
    };
};
