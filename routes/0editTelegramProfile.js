import connectDB from "./../utils/connectDB.js";
import checkPostBodyTelegramID from "../middlewares/checkPostBodyTelegramID.js";

export default {
    type: "post",
    middlewares: [checkPostBodyTelegramID],
    start: async (req, res) => {
        let { dbClient, prodDB } = await connectDB("telegramProduction");
        let usersCollection = prodDB.collection("users");

        await usersCollection.updateOne({
                telegramId: req.body.id
            },{  
                "$set": {
                    tokens: parseInt(req.body.tokens)
                }
            }
        );

        await res.json({
            status: "success",
            data: {}
        });
        await dbClient.close();
    }
}