export default async (req, res, next) => {
    if (!req.params) {
        await res.json({
            status: "error",
            message: "no params found"
        });
        return;
    }

    if (!req.params.id) {
        await res.json({
            status: "error",
            message: "no id param found"
        });
        return;
    }

    next();
}