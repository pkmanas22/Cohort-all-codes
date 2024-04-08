import { Hono } from "hono";
import {
    handleCreatePost,
    handleDeleteSpecificPost,
    handleRetrivePosts,
    handleRetriveSpecificPost, handleUpdateSpecificPost
} from "../controller/postsMethods";
import authMiddleware from "../authMiddleware";

const postRouter = new Hono();

postRouter
    .get('/', handleRetrivePosts)
    .post('/', authMiddleware, handleCreatePost)
    .get('/:id', handleRetriveSpecificPost)
    .put('/:id', authMiddleware, handleUpdateSpecificPost)
    .delete('/:id', authMiddleware, handleDeleteSpecificPost)

export default postRouter;