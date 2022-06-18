//Err handler
const errorHandles = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message:err?.message,
        stack:process.env.NODE_ENV ==='production'?null: err.stack
    }) 
}  

//Not found 
const notFound = (req, res, next) => {
    const error = new Error(`Not found ${req.originalUrl}`);
    res.status(404);
    next(error);
}

module.exports = {errorHandles , notFound}; 

