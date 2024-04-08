const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username });
    // console.log(existingUser);
    if (username && password && existingUser === null) {
        await User.create({
            username,
            password
        })
        res.json({
            message: 'User created successfully'
        })
    } else {
        res.json({
            message: 'Error occured'
        })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const allCourses = await Course.find({})
    // console.log(allCourses);
    if (allCourses.length !== 0) {
        res.json(allCourses)
    } else {
        res.json({
            message: "Currently no courses available."
        })
    }
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({
        username
    }, {
        "$push" : {
           purchasedCourse: courseId,
        }
    })
        .then((response) => {
            // console.log(response);
            res.json({
                message: 'Course purchased successfully'
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                message: 'Invalid course'
            })
        })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username : req.headers.username,
    })

    const courses = await Course.find({
        _id : {
            "$in" : user.purchasedCourse
        }
    })
    res.json(courses)
});

module.exports = router