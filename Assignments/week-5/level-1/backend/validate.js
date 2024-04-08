const zod = require('zod')

const createCard = zod.object({
    name : zod.string().min(2),
    desc: zod.string().min(5),
    interestList: zod.array(zod.string()).min(1),
    socialMedia: zod.object({
        github: zod.string().url().min(1),
        twitter: zod.string().url().optional(), 
        linkedin: zod.string().url().optional(),
        portfolio: zod.string().optional()
    })
})

module.exports = createCard;