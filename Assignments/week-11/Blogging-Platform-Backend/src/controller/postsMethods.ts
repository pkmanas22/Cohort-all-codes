import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

import { string, z } from "zod";

async function handleRetrivePosts(c: any) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const allPosts = await prisma.post.findMany();

    if (allPosts.length > 0) {
        return c.json({
            allPosts
        })
    } else {
        return c.json({
            msg: "There is no posts available right now"
        })
    }
}

const createPostSchema = z.object({
    title: z.string().min(1, { message: "Title can not be blank" }),
    body: z.string().optional(),
    tags: z.array(string()).max(10, { message: "Maximum 10 tags can be added" })
})
async function handleCreatePost(c: any) {
    const bodyData = await c.req.json();
    const res = createPostSchema.safeParse(bodyData);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userId = c.req.userId;

    if (res.success) {
        const tagObj = res.data.tags.map(each => ({
            tagName : each
        }))

        const post = await prisma.post.create({
            data: {
                title: res.data.title,
                body: res.data.body || "",
                userId,
                tags: {
                    create: tagObj
                }
            }
        })

        return c.json({
            msg: "Post successfully created",
            title: post.title
        })
    } else {
        c.status(400)
        const errMsg = res.error.issues[0].message;
        return c.json({
            errMsg
        })
    }
}

async function handleRetriveSpecificPost(c: any) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param('id');
    const userId = c.req.userId;
    
    const post = await prisma.post.findUnique({
        where: {
            id,
        },
        include: {
            tags: true,
        },
    })

    if (post) {
        const tags = post.tags.map(each => each.tagName)
        if (post.userId === userId) {
            return c.json(post)
        }
        return c.json({
            title: post.title,
            body: post.body,
            tags,
        })
    } else {
        return c.json({
            errMsg: "Invalid post ID"
        })
    }
}

const updatePostSchema = z.object({
    title: z.string().min(1, { message: "Title can not be blank" }),
    body: z.string().optional()
})
async function handleUpdateSpecificPost(c: any) {
    const bodyData = await c.req.json();
    const res = updatePostSchema.safeParse(bodyData);

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    if (!res.success) {
        c.status(400)
        const errMsg = res.error.issues[0].message;
        return c.json({
            errMsg
        })
    }

    const id = c.req.param('id');
    const userId = c.req.userId;

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    })

    if (post) {
        if (post.userId === userId) {
            const updatedPost = await prisma.post.update({
                where: {
                    id
                },
                data: {
                    title: res.data.title,
                    body: res.data.body || "",
                }
            })
            return c.json({
                id: updatedPost.id,
                title: updatedPost.title,
                body: updatedPost.body,
            })
        }
        return c.json({
            title: post.title,
            body: post.body
        })
    } else {
        return c.json({
            errMsg: "Invalid post ID"
        })
    }
    /*try {
        const updatedPost = await prisma.post.update({
            where: {
                id,
                userId
            },
            data: {
                title: res.data.title,
                body: res.data.body || "",
            }
        })
        return c.json({
            id: updatedPost.id,
            title: updatedPost.title,
            body: updatedPost.body,
        })
    } catch (error) {
        
        return c.json({
            errMsg: "You are not authorize to update"
            
        })
    }*/
}

async function handleDeleteSpecificPost(c: any) {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const id = c.req.param('id');
    const userId = c.req.userId;

    try {
        const post = await prisma.post.delete({
            where: {
                id,
                userId
            }
        })
        return c.json({
            msg: 'Post deleted successfully'
        })
    } catch (error) {
        return c.json({
            errMsg: "You are not authorize to update or Invalid post id"
        })
    }

}

export {
    handleRetrivePosts,
    handleCreatePost,
    handleRetriveSpecificPost,
    handleUpdateSpecificPost,
    handleDeleteSpecificPost,
}