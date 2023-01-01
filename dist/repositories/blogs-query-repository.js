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
exports.blogsQueryRepository = void 0;
const db_1 = require("./db");
const mongodb_1 = require("mongodb");
function blogsMapperToBlogType(blog) {
    return {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        id: blog._id.toString()
    };
}
exports.blogsQueryRepository = {
    getAllBlogs(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sortDirection = "desc", sortBy = "createdAt", pageNumber = 1, pageSize = 10, searchNameTerm = null } = query;
            const sortDirectionNumber = sortDirection === "desc" ? -1 : 1;
            const skippedBlogsNumber = (+pageNumber - 1) * +pageSize;
            if (searchNameTerm) {
                const countAllWithSearchTerm = yield db_1.blogsCollection.countDocuments({ name: { $regex: searchNameTerm, $options: 'i' } });
                const blogsDb = yield db_1.blogsCollection
                    .find({ name: { $regex: searchNameTerm, $options: 'i' } })
                    .sort({ [sortBy]: sortDirectionNumber })
                    .skip(skippedBlogsNumber)
                    .limit(+pageSize)
                    .toArray();
                const blogsView = blogsDb.map(blogsMapperToBlogType);
                return {
                    pagesCount: Math.ceil(countAllWithSearchTerm / pageSize),
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount: countAllWithSearchTerm,
                    items: blogsView
                };
            }
            const countAll = yield db_1.blogsCollection.countDocuments();
            let blogsDb = yield db_1.blogsCollection
                .find({})
                .sort({ [sortBy]: sortDirectionNumber })
                .skip(skippedBlogsNumber)
                .limit(+pageSize)
                .toArray();
            const blogsView = blogsDb.map(blogsMapperToBlogType);
            return {
                pagesCount: Math.ceil(countAll / pageSize),
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount: countAll,
                items: blogsView
            };
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id)) {
                return null;
            }
            let _id = new mongodb_1.ObjectId(id);
            let blog = yield db_1.blogsCollection.findOne({ _id: _id });
            if (!blog) {
                return null;
            }
            return blogsMapperToBlogType(blog);
        });
    },
};
