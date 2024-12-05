import express, { Request, Response } from 'express';
import { contentModel } from '../db';
const contentRouter = express.Router();

interface contentBody {
    title: string,
    description: string,
    type: 'tweets' | 'videos' | 'documents' | 'links';
    link: string,
    createdAt: Date
    tags: String[],
    userId: string
}
contentRouter.get('/getContent', async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
        const data = await contentModel.find({
            userId
        })
        res.json({
            data
        })
        return
    } catch (error) {
        console.error(error)
        res.status(411).json({
            message: 'Cannot find your content'
        })
    }
})

contentRouter.post('/add', async (req: Request<{}, {}, contentBody>, res: Response) => {
    const { title, description, type, link, tags, userId } = req.body;

    try {
        const response = await contentModel.create({
            title,
            description,
            type,
            link,
            createdAt: new Date(),
            tags,
            userId
        })
        res.status(200).json({
            message: 'Content added successfully',
            res: response
        })
        return

    } catch (error) {

        console.error('Error during adding content:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
        return
    }
});
contentRouter.delete('/delete', async (req: Request, res: Response) => {
    const { contentId } = req.body

    try {
        const response = await contentModel.deleteOne({
            _id: contentId
        })
        res.json({
            response
        })
        return 
    } catch (error) {
        console.error(error)
        res.status(411).json({
            message: 'Cannot able to delete your content'
        })
    }
})

export default contentRouter;
