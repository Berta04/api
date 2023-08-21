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
            message: "no id body found"
        });
        return;
    }

    if (!req.body.username) {
        await res.json({
            status: "error",
            message: "no username body found"
        });
        return;
    }


    next();
}