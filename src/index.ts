import express from "express"
import userRouter from "./routes/user"
import contentRouter from "./routes/content"
const app = express()

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/content', contentRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
