const Headers = require("../Header/Headers");

// function errorHandle(res, message) {
//     res.writeHead(400, Headers);
//     res.write(JSON.stringify({
//         "status": "false",
//         "massage": message
//     }))
//     res.end();
// }

const Error = {
    errorHandle({res, message}) {
        res.writeHead(400, Headers);
        res.write(JSON.stringify({
            "status": "false",
            "massage": message,
            "data":[]
        }))
        res.end();
    }
}


module.exports = Error;