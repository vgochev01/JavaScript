const router = require('express').Router();
const { body, validationResult } = require('express-validator');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post(
    '/register',
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('repass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords don\'t match');
        }

        return true;
    }),
    async (req, res) => {
        console.log(req.body);
        const { errors } = validationResult(req);

        try {
            if (errors.length > 0) {
                throw new Error('Validation error');
            }

            await req.auth.register(req.body.username, req.body.password);

            res.redirect('/');
        } catch (err) {
            console.log(err.message);
            const ctx = {
                errors,
                userData: {
                    username: req.body.username
                }
            };

            res.render('register', ctx);
        }
    });

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        };

        res.render('login', ctx);
    }
});

router.get('/logout', (req, res) => {
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;