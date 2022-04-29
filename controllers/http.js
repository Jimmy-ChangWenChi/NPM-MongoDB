const error = require("../Handlers/errorHandle");
const success = require("../Handlers/successHandle");

const http = {
    cors({req,res}){
        success.cors({res,req});
    },
    notFound({req,res}){
        error.errorHandle(res, "找不到路由");
    }
}

module.exports = http;