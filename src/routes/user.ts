import express, { Request, Response } from 'express';
import { userModel } from '../db'; // Assuming userModel is the model for your users
const userRouter = express.Router();

interface SignupRequestBody {
  username: string;
  password: string;
}


userRouter.post('/signup', async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      username,
    });

    if (existingUser) {
      res.status(403).json({
        message: 'User already exists',
      })
      return;
    }

    await userModel.create({
      username,
      password,
    });

    res.status(200).json({
      message: 'User created successfully',
    });
    return
  } catch (error) {

    console.error('Error during signup:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
    return
  }
});

export default userRouter;
