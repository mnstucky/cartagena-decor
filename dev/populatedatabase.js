const { MongoClient } = require("mongodb");

const url = MONGO_URL;
const client = new MongoClient(url, { useUnifiedTopology: true });

const dbName = "cluster0";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const col = db.collection("inventory");

        let itemDoc = {
            "name": "One of a kind serving and decorative wood trays. Hand-painted.",
            "hightlights": ["Handmade", "Materials: Wood, Bamboo"],
            "description": "Three trays as unique as they can be! - Bread serving tray: Bamboo adds an extra special touch to this serving and decorative tray. Perfect for serving baked goods or as a decorative piece. This tray was handmade and hand-painted. - Snack small tray: This colorful petite wood tray is perfect for serving your favorite snacks. Hand-painted. - Serving wood try: This is a very unique tray. Perfect to serve snacks and foods. Hand-painted. All our trays are hand washable, please don't wash it in a dishwasher. The trays can hold hot and cold foods; not microwave safe.",
            "mainimage": "IMG_9388.JPG",
            "otherimages": ["IMG_9388.JPG", "IMG_9391.JPG", "IMG_9392.JPG", "IMG_9414.JPG", "IMG_9417.JPG", "IMG_9419.JPG", "IMG_9422.JPG", "IMG_9424.JPG", "IMG_9427.JPG", "IMG_9433.JPG", "IMG_9439.JPG", "IMG_9441.JPG"]
        }

        const p = await col.insertOne(itemDoc);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);