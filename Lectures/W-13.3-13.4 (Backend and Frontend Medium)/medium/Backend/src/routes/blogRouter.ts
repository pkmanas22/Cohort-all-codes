import { Hono } from "hono";
import { handleCreateNewBlog, handleGetAllBlogs, handleGetAllPublishedBlogs, handleGetSpecificBlog, handleMyAllBlogs, handleUpdateBlog } from "../controller/blogMethod";
import { authMiddleware } from "../authMiddleware";

const blogRouter = new Hono();

blogRouter.use('/*', authMiddleware);

blogRouter.get('/published', handleGetAllPublishedBlogs);

blogRouter.get('/myblogs', handleMyAllBlogs);

blogRouter.get('/:blogId', handleGetSpecificBlog);

blogRouter.get('/', handleGetAllBlogs);

blogRouter.post('/', handleCreateNewBlog);

blogRouter.patch('/:blogId', handleUpdateBlog);

export default blogRouter;