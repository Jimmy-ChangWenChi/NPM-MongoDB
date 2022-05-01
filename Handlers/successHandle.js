const Header = require("../Header/Headers")

// function successHanlde(res,posts,message){
//     res.writeHead(200,Header);
//     res.write(JSON.stringify({
//         "status":"success",
//         "message":message,
//         "data":posts,
//     }))
//     res.end();//少打這一行 連線會一直持續
// }


const success = {
    cors({req,res}){
        res.writeHead(200,Header);
        res.end();
    },
    successHandle({res, allPosts, message}){ //這裡接受值的變數, 要跟傳的變數一樣, 否則會找不到資料。
        res.writeHead(200,Header);
        //console.log(allPosts);  
        res.write(JSON.stringify({
            "status":"success",
            "message":message,
            allPosts,
        }))
        res.end();//少打這一行 連線會一直持續
    }
}

module.exports = success;
