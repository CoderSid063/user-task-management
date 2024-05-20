const { connectDB } = require("./db/database.js");
const { app } = require("./app.js");
const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR :", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((error) => {
    console.log("MONGOdb connection failed !!! ", error);
  });
