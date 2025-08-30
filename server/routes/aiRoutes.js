import express from 'express';
import{auth} from "../middlewares/auth.js"
import { BlogTitles, Chat, GenerateImages, RemoveBackground, RemoveObject, ReviewResume } from '../controllers/aiController.js';
import { upload } from '../configs/multer.js';


const aiRouter = express.Router();

aiRouter.post('/chat', auth, Chat)
aiRouter.post('/blog-titles', auth, BlogTitles)
aiRouter.post('/generate-images', auth, GenerateImages)
aiRouter.post('/remove-background', upload.single('image'), auth, RemoveBackground)
aiRouter.post('/remove-object', upload.single('image'), auth, RemoveObject)
aiRouter.post('/review-resume', upload.single('resume'), auth, ReviewResume)

export default aiRouter