const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainPageSchema = Schema({
  mainImgPath: String,
  textHistoria: String,
  idLineaTiempo : [{ type: Schema.Types.ObjectId, ref: "lineaTiempo"  }] ,
  textVision: String,
  textMision: String,
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("mainPage", mainPageSchema);
