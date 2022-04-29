const mongoose = require("mongoose");
const POST = require("../models/posts");
const error = require("../Handlers/errorHandle");
const success = require("../Handlers/successHandle");
const HttpController = require("../controllers/http");
const PostController = require("../controllers/posts");


const postsRoute = async (req, res) => {
    let body = "";
    req.on("data", chuck => {
        body += chuck;
    })

    if (req.url == "/posts" && req.method == "GET") {
        PostController.getPosts({res,req})
    } else if (req.url == "/posts" && req.method == "POST") {
        req.on("end", async () => {
            PostController.postPosts({req,res,body});
        })
    } else if (req.url == "/posts" && req.method == "DELETE") {
        PostController.deletePosts(req,res,"all");
    } else if (req.url == "/posts" && req.method == "OPTIONS") {
        HttpController.cors({req,res})
    } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
        req.on("end", async () => {
            PostController.patchPosts({body,res,req});
        })
    } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
        const id = req.url.split("/").pop();
        PostController.deletePosts(req,res,id)
    } else {
        HttpController.notFound(req,res);
    }
}
module.exports = postsRoute