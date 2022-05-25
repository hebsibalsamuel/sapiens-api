const mongoose = require("mongoose");

const ThemeDataSchema = new mongoose.Schema(
  {   
    userName: { type: String, required: true,unique: true},
    colorTheme: { type: String, required: true }
  }
    
);
const ThemeData = mongoose.model("ThemeData", ThemeDataSchema);
module.exports = ThemeData;