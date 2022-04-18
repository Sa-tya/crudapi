const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: { type: String , default:'Not given'},
    cnum: { type: String , default:'9999999999'},
    // cdate: { type: Date },
    // udate: { type: Date, default: null }
  
});

module.exports = mongoose.model("client", clientSchema);