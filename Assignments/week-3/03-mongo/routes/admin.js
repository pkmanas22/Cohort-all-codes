const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await Admin.findOne({username});
    // console.log(existingUser);
    if (username && password && existingUser === null) {
        await Admin.create({
            username,
            password
        })
        res.json({
            message: 'Admin created successfully'
        })
    } else {
        res.json({
            message: 'Error occured'
        })
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    if (title && description && price && imageLink) {
        Course.create({
            title,
            description,
            price,
            imageLink
        })
        .then((response) => {
            // console.log(response._id);
            res.json({
                message: 'Course created successfully',
                courseId: response._id
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: "Some error occured"
            })
        })
    }else{
        res.json({
            message : "Please provide all field"
        })
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({})
    // console.log(allCourse);
    if (allCourses.length !== 0) {
        res.json({
            courses : allCourses
        })
    }else{
        res.json({
            message : "Currently no courses available. Create a new course"
        })
    }
});

module.exports = router;