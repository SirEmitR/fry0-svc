export const serverError = (res, e) => {
    res.status(500).json({
        message: 'Internal Server Error',
        error: e
    });
}