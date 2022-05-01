const Error = require("../Handlers/errorHandle");
const success = require("../Handlers/successHandle");
const POST = require("../models/posts");

const posts = {
    async getPosts({req, res}) {
        const allPosts = await POST.find();
        //console.log(typeof allPosts);
        const message = "全部資料"
        //success.successHandle({res, allPosts, "全部資料"});
        success.successHandle({res, allPosts, message});
    },
    
    async postPosts({ req,res,body }) {
        try {
            const data = JSON.parse(body);

            if (data.name !== "" || data.tags !== "" || data.content !== "") {
                const allPosts = await POST.create(
                    {
                        name: data.name,
                        tags: data.tags,
                        content: data.content,
                        createAt: data.createAt,
                        likes: data.likes
                    }
                )
                const message = "新增成功"
                success.successHandle({res, allPosts, message});
            } else {
                const message = "資料有缺"
                Error.errorHandle({res, message});
            }
        } catch (error) {
            const message = error
            Error.errorHandle({res, message});
        }
    },
    async patchPosts({ body,res,req }) {
        try {
            const data = JSON.parse(body);
            const id = req.url.split("/").pop();
            // console.log('data is ' + data);
            // console.log('id is ' + id);
            if (data !== undefined) {
                await POST.findByIdAndUpdate(id, data);
                const allPosts = await POST.find();
                const message = "更新成功"
                //console.log(allPosts);
                success.successHandle({res, allPosts, message});
            } else {
                const message = "更新失敗"
                Error.errorHandle({res, message})
            }
        } catch (err) {
            
            Error.errorHandle({res, err})
        }
    },
    async deletePosts({ req, res, id }) {
        if (id !== "all") {
            await POST.findByIdAndDelete(id)
            const allPosts = await POST.find();
            const message = "單筆刪除成功"
            success.successHandle({res, allPosts, message});
        } else {
            const allPosts = await POST.deleteMany({})
            const message = "全部刪除成功"
            success.successHandle({res, allPosts, message});
        }
    },
}

module.exports = posts;