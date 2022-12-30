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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_service_1 = require("../domain/blogs-service");
const input_validation_1 = require("../middlewares/input-validation");
const blogs_query_repository_1 = require("../repositories/blogs-query-repository");
const posts_service_1 = require("../domain/posts-service");
const posts_query_repository_1 = require("../repositories/posts-query-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
    let sortDirectionString = req.query.sortDirection ? req.query.sortDirection.toString() : "desc";
    let pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
    let pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    let searchNameTerm = req.query.searchNameTerm ? req.query.searchNameTerm.toString() : null;
    const returnedBlogs = yield blogs_query_repository_1.blogsQueryRepository.getAllBlogs(sortDirectionString, sortBy, pageNumber, pageSize, searchNameTerm);
    res.status(200).send(returnedBlogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_query_repository_1.blogsQueryRepository.getBlogById(req.params.id);
    if (!blog) {
        res.send(404);
    }
    else {
        res.send(blog);
    }
}));
exports.blogsRouter.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sortBy = req.query.sortBy ? req.query.sortBy.toString() : "createdAt";
    let sortDirectionString = req.query.sortDirection ? req.query.sortDirection.toString() : "desc";
    let pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1;
    let pageSize = req.query.pageSize ? +req.query.pageSize : 10;
    const blogId = req.params.id;
    const blog = yield blogs_query_repository_1.blogsQueryRepository.getBlogById(blogId);
    if (!blog) {
        res.send(404);
    }
    const returnedPosts = yield posts_query_repository_1.postsQueryRepository.getAllPosts(sortDirectionString, sortBy, pageNumber, pageSize);
    res.status(200).send(returnedPosts);
}));
exports.blogsRouter.post('/:id/posts', input_validation_1.basicAuthorisation, input_validation_1.titleValidation, input_validation_1.shortDescriptionValidation, input_validation_1.contentValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content } = req.body;
    const blogId = req.params.id;
    const blog = yield blogs_query_repository_1.blogsQueryRepository.getBlogById(blogId);
    if (!blog) {
        res.send(404);
    }
    const newPost = yield posts_service_1.postsService.createPost(title, shortDescription, content, blogId);
    res.status(201).send(newPost);
}));
exports.blogsRouter.post('/', input_validation_1.basicAuthorisation, input_validation_1.nameValidation, input_validation_1.descriptionValidation, input_validation_1.websiteUrlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const newBlog = yield blogs_service_1.blogsService.createBlogs(name, description, websiteUrl);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.delete('/:id', input_validation_1.basicAuthorisation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_service_1.blogsService.deleteBlogById(req.params.id);
    if (isDeleted) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
exports.blogsRouter.put('/:id', input_validation_1.basicAuthorisation, input_validation_1.nameValidation, input_validation_1.descriptionValidation, input_validation_1.websiteUrlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, description, websiteUrl } = req.body;
    let isUpdated = yield blogs_service_1.blogsService.UpdateBlogById(id, name, description, websiteUrl);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
