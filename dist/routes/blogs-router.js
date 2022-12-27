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
const blogs_repository_db_1 = require("../repositories/blogs-repository-db");
const input_validation_1 = require("../middlewares/input-validation");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blogs_repository_db_1.blogsRepository.getAllBlogs();
    res.status(200).send(blogs);
}));
exports.blogsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_repository_db_1.blogsRepository.getBlogById(req.params.id);
    if (!blog) {
        res.send(404);
    }
    else {
        res.send(blog);
    }
}));
exports.blogsRouter.post('/', input_validation_1.basicAuthorisation, input_validation_1.nameValidation, input_validation_1.descriptionValidation, input_validation_1.websiteUrlValidation, input_validation_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const newBlog = yield blogs_repository_db_1.blogsRepository.createBlogs(name, description, websiteUrl);
    res.status(201).send(newBlog);
}));
exports.blogsRouter.delete('/:id', input_validation_1.basicAuthorisation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_repository_db_1.blogsRepository.deleteBlogById(req.params.id);
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
    let isUpdated = yield blogs_repository_db_1.blogsRepository.UpdateBlogById(id, name, description, websiteUrl);
    if (isUpdated) {
        res.send(204);
    }
    else {
        res.send(404);
    }
}));
