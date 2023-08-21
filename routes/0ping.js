export default {
    type: "get",
    middlewares: [],
    start: async (req, res) => {
        await res.json({
            status: "online",
        });
    }
}