export default async (req, res, next) => {
    if (!req.body) {
        await res.json({
            status: "error",
            message: "no body found"
        });
        return;
    }

    if (!req.body.id) {
        await res.json({
            status: "error",
            message: "no user ID body found"
        });
        return;
    }

    if (!req.body.tokens) {
        await res.json({
            status: "error",
            message: "no tokens body found"
        });
        return;
    }


    next();
}