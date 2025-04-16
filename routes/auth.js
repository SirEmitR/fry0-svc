import express from 'express';
const router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Auth route is working',
    });
});
export default router;