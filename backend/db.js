// const mongoose = require("mongoose");
// const mongoURI = "mongodb+srv://Vedant23:HMx0BTBWFHECnEIh@mongonew.g5a4spu.mongodb.net/mern_food_delivery";
// //const mongoURI = process.env.MONOGDB_URI;
// //const mongoURI = "mongodb://mankmern:mankmern@ac-cbaxhm8-shard-00-00.bicx37m.mongodb.net:27017,ac-cbaxhm8-shard-00-01.bicx37m.mongodb.net:27017,ac-cbaxhm8-shard-00-02.bicx37m.mongodb.net:27017/?ssl=true&replicaSet=atlas-2vvume-shard-0&authSource=admin&retryWrites=true&w=majority"

// // module.exports = function (callback) {
// //   mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
// //       // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
// //       if (err) console.log("---" + err)
// //       else {
// //           // var database =
// //           console.log("connected to mongo")
// //           const foodCollection = await mongoose.connection.db.collection("food_items");
// //           foodCollection.find({}).toArray(async function (err, data) {
// //               const categoryCollection = await mongoose.connection.db.collection("Categories");
// //               categoryCollection.find({}).toArray(async function (err, Catdata) {
// //                   callback(err, data, Catdata);
// //               })
// //           });
// //           // listCollections({name: 'food_items'}).toArray(function (err, database) {
// //           // });
// //           //     module.exports.Collection = database;
// //           // });
// //       }
// //   })
// // };


// const mongodb = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true });
//     console.log("connected");
//     const fetched_data = await mongoose.connection.db.collection("food_items");
//     fetched_data.find({}).toArray(async (err, data) => {
//       const foodCategory = await mongoose.connection.db.collection("foodCategory");
//       foodCategory.find({}).toArray(async function(err, catData){
//           if (err) {
//               console.log(err)
//           }
//           else {
//               global.food_items = data;
//               global.foodCategory = catData;
//           };
//       })

//     //   if (err) {
//     //     console.log(err);
//     //   } else {
//     //     global.food_items = data;
//     //   }

//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = mongodb;

const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://Vedant23:HMx0BTBWFHECnEIh@mongonew.g5a4spu.mongodb.net/mern_food_delivery";

const mongodb = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Fetch food items
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    console.log("Fetched food items:", fetched_data);

    // Fetch food categories
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
    console.log("Fetched food categories:", foodCategory);

    // Store fetched data in global variables
    global.food_items = fetched_data;
    global.foodCategory = foodCategory;

  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = mongodb;

