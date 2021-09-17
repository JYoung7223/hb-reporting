// Stats will contain the information about the system.

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const StatSchema = new Schema(
    {
        id:{
            type: String
        },
        name:{
            type: String,
            trim: true,
            unique: true,
            required: "Please enter stat 'name'",
            default: ""
        },
        type:{
            type: String,
            trim: true,
            required: "Please select stat 'type' (count, average, max, min)",
            default: ""
        },
        value:{
            type: Number,
            required: "Please enter 'value' of stat.",
            default: 0
        },
        subBudget:[
            {
                type: Schema.Types.ObjectId,
                ref:"Budget"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Stat = Mongoose.model("Stat", StatSchema);

module.exports = {
    Stat,
    StatSchema
};