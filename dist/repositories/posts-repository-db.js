"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const blogs_repository_db_1 = require("./blogs-repository-db");
const db_1 = require("./db");
exports.postsRepository = {
    createPost(title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundBlog = yield blogs_repository_db_1.blogsRepository.getBlogById(blogId);
            const newPost = {
                id: new Date().toISOString(),
                title: title,
                shortDescription: shortDescription,
                content: content,
                blogId: blogId,
                blogName: foundBlog.name,
                createdAt: new Date().toISOString()
            };
            yield db_1.postsCollection.insertOne(Object.assign({}, newPost));
            return newPost;
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield db_1.postsCollection.findOne({ id: id }, { projection: { _id: 0 } });
            if (post) {
                return post;
            }
            else {
                return null;
            }
        });
    },
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.postsCollection.find({}, { projection: { _id: 0 } }).toArray();
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield db_1.postsCollection.deleteOne({ id: id });
            return result.deletedCount === 1;
        });
    },
    UpdatePostById(id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundBlog = yield blogs_repository_db_1.blogsRepository.getBlogById(blogId);
            if (!foundBlog) {
                return false;
            }
            let result = yield db_1.postsCollection.updateOne({ id: id }, { $set: { title: title, shortDescription: shortDescription, content: content, blogId: blogId } });
            return result.matchedCount === 1;
        });
    }
};
