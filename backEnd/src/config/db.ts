const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const uri = "mongodb+srv://school23:4oAiMqySIl2djq1j@cluster0.uvx62.mongodb.net/webchallenge?retryWrites=true&w=majority";

export const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};


