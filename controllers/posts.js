const mongoose = require("mongoose");
const error = require("../Handlers/errorHandle");
const success = require("../Handlers/successHandle");

const posts = {
    async getPosts({ req, res }) {
        const allPosts = await POST.find();
        success.successHanlde(res, allPosts, "全部資料");
    },
    async postPosts({ body, req, res }) {
        try {
            const data = JSON.parse(body);

            if (data !== undefined) {
                const newPost = await POST.create(
                    {
                        name: data.name,
                        tags: data.tags,
                        content: data.content,
                        createAt: data.createAt,
                        likes: data.likes
                    }
                )

                success.successHanlde(res, newPost, "新增成功");
            } else {
                error(res, "data error")
            }
        } catch (error) {
            error(res, error);
        }
    },
    patchPosts({req,res,body }) {
        try {
            const data = JSON.parse(body);
            const id = req.url.split("/").pop();
            if (data !== undefined) {
                await POST.findByIdAndUpdate(id, data);
                const allPosts = await POST.find();
                //console.log("測試")
                success.successHanlde(res, allPosts, "更新成功");
            } else {
                error(res, "更新失敗")
            }
        } catch (err) {
            error(res, "資料錯誤")
        }
    },
    deletePosts({ req, res, id }) {
        if (id !== "all") {
            await POST.findByIdAndDelete(id)
            const allPosts = await POST.find();
            success.successHanlde(res, allPosts, "單筆刪除成功");
        } else {
            const allPosts = await POST.deleteMany({})
            success.successHanlde(res, allPosts, "全部刪除成功");
        }
    },
}

module.exports = posts;