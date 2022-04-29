//把posts 拉出到route
const postsRoute = require("./routes/postsRoute");

//將連線拆出去,需再重新引入
require("./connections/connect")


const requestListener = async function (req, res) {
    postsRoute(req,res)
}

module.exports = requestListener;