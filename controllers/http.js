const error = require("../Handlers/errorHandle");
const success = require("../Handlers/successHandle");

const http = {
    cors({req,res}){
        success.cors({res,req});
    },
    notFound({req,res}){
        const message = "找不到路由"
        error.errorHandle({res, message});
    }
}

module.exports = http;