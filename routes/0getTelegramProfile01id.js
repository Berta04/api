import connectDB from "./../utils/connectDB.js";
import checkParams from "../middlewares/checkParamsTelegramID.js";

export default {
    type: "get",
    middlewares: [checkParams],
    start: async (req, res) => {
        let { dbClient, prodDB } = await connectDB("telegramProduction");
        let usersCollection = prodDB.collection("users");

        let user = await usersCollection.findOne({
            telegramId: parseInt(req.params.id)
        }, {
            _id: 1,
            tokens: 1,
            username: 1,
            name: 1,
            surname: 1
        });

        if (user) {
            await res.json({
                status: "success",
                data: user
            });
        }
        else {
            await res.json({
                status: "error",
                message: "user not found"
            });
        }

        await dbClient.close();
    }
}