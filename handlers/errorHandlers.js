/*
    404 NOT FOUND
 */

exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: "Route Not Found",
    });
}

/*
    Production Error Handler
 */

exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: "Internal Server Error",
    });
}

/*
    Development Error
 */

exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack
    };

    req.status(err.status || 500).json(errorDetails);
}

exports.mongooseErrors = (err, req, res, next) => {
    if(!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors);

    let message = ""
    errorKeys.forEach((key) => (message +=err.errors[key].message + ", "));

    message = message.substr(0, message.length - 2);
    res.status(400).json({
        message,
    });
};