const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const RecordSchema = new Schema(

    {
        title : String,
        date : Date,
        name : String,
        fileId: Schema.Types.ObjectId
    }
);

const Record = model("Record", RecordSchema);

module.exports = Record;
