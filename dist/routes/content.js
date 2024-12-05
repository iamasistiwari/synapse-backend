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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const contentRouter = express_1.default.Router();
contentRouter.get('/getContent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const data = yield db_1.contentModel.find({
            userId
        });
        res.json({
            data
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(411).json({
            message: 'Cannot find your content'
        });
    }
}));
contentRouter.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, type, link, tags, userId } = req.body;
    try {
        const response = yield db_1.contentModel.create({
            title,
            description,
            type,
            link,
            createdAt: new Date(),
            tags,
            userId
        });
        res.status(200).json({
            message: 'Content added successfully',
            res: response
        });
        return;
    }
    catch (error) {
        console.error('Error during adding content:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
        return;
    }
}));
contentRouter.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        const response = yield db_1.contentModel.deleteOne({
            _id: contentId
        });
        res.json({
            response
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(411).json({
            message: 'Cannot able to delete your content'
        });
    }
}));
exports.default = contentRouter;
