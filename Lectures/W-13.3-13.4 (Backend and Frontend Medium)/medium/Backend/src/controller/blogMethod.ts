import { Context } from "hono";
import prismaGenerator from "../prisma"
import { createPostSchema, updatePostSchema } from "@manaskp/commonmedium";

export const handleGetAllPublishedBlogs = async (c: Context) => {
    const prisma = await prismaGenerator(c.env.DATABASE_URL)
    const isLoggedIn = c.get('loggedIn');

    if (isLoggedIn) {
        const user = c.get('user');

        try {
            const allBlogs = await prisma.post.findMany({
                where: {
                    OR: [
                        {
                            authorId: user.id
                        },
                        {
                            published: true
                        }
                    ]
                },
                select: {
                    id: true,
                    title: true,
                    content: true,
                    author: {
                        select: {
                            name: true,
                        },
                    }
                }
            });
            // console.log(allBlogs);

            return c.json({ allBlogs, userName: user.name });
        } catch (error) {
            c.status(500)
            return c.json({ error });
        }
    }
    try {
        const allBlogs = await prisma.post.findMany({
            where: {
                published: true,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    },
                }
            }
        });
        return c.json({ allBlogs });
    } catch (error) {
        c.status(500)
        return c.json({ error });
    }

}

export const handleGetAllBlogs = async (c: Context) => {
    const prisma = await prismaGenerator(c.env.DATABASE_URL)

    try {
        const allBlogs = await prisma.post.findMany();

        return c.json(allBlogs);
    } catch (error) {
        c.status(500)
        return c.json({ error });
    }
}

export const handleMyAllBlogs = async (c: Context) => {
    const prisma = await prismaGenerator(c.env.DATABASE_URL)

    const user = c.get('user');
    console.log("user " + user);
    
    try {
        const allBlogs = await prisma.post.findMany({
            where: {
                authorId: user.id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    },
                }
            }
        });
        console.log(allBlogs);

        return c.json({ allBlogs, userName: user.name });
    } catch (error) {
        c.status(500)
        console.log(error);
        
        return c.json({ error });
    }
}

export const handleGetSpecificBlog = async (c: Context) => {
    const prisma = await prismaGenerator(c.env.DATABASE_URL)
    const blogId = c.req.param('blogId')
    // console.log(blogId);
    const isLoggedIn = c.get('loggedIn');
    const userName = isLoggedIn ? c.get('user').name : "";
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: blogId
            },
            select: {
                title: true,
                content: true,
                published: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        if (!blog) {
            c.status(403)
            return c.json({ error: 'Blog not found' })
        }
        return c.json({ blog, userName });
    } catch (error) {
        c.status(500)
        return c.json({ error });
    }
}

export const handleCreateNewBlog = async (c: Context) => {
    const prisma = await prismaGenerator(c.env.DATABASE_URL);

    const body = await c.req.json();
    // console.log(c.get("user"));

    const response = createPostSchema.safeParse(body);

    if (!response.success) {
        const errorObj: Record<string, string> = {};

        response.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            const value = issue.message;
            errorObj[key] = value;
        });

        c.status(400)
        return c.json(errorObj)
    }
    const {
        title,
        content,
    } = response.data;

    try {
        const blog = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: {
                        id: c.get("user").id
                    }
                }
            }
        })

        return c.json({
            msg: "Post created successfully",
            id: blog.id,
        })
    } catch (error) {
        c.status(411);
        return c.json({ error: "Erro while creating post" });
    }
}

export const handleUpdateBlog = async (c: Context) => {
    const prisma = await prismaGenerator(c.env.DATABASE_URL);

    const body = await c.req.json()
    // console.log(c.get("user"));
    const response = updatePostSchema.safeParse(body);

    if (!response.success) {
        const errorObj: Record<string, string> = {};

        response.error.issues.forEach(issue => {
            const key = issue.path.join('.');
            const value = issue.message;
            errorObj[key] = value;
        });

        c.status(400)
        return c.json(errorObj)
    }
    const {
        title,
        content,
        published
    } = response.data;

    try {
        const blog = await prisma.post.update({
            where: {
                id: c.req.param('blogId')
            },
            data: {
                title,
                content,
                published,
                author: {
                    connect: {
                        id: c.get("user").id
                    }
                }
            }
        })

        // console.log(blog);

        return c.json({
            msg: "Post updated successfully",
            id: blog.id,
        })
    } catch (error) {
        c.status(411);
        return c.json({ error: "Invalid blog id" });
    }
}