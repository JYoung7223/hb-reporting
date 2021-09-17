// Budget will contain the budget amounts & percentages to compare the users budget against

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const BudgetSchema = new Schema(
    {
        id:{
            type: String
        },
        category:{
            type: String,
            trim: true,
            unique: true,
            required: "Please enter budget 'category'",
            default: ""
        },
        type:{
            type: String,
            trim: true,
            required: "Please select budget 'type' (person, percent)",
            default: ""
        },
        low:{
            type: Number,
            required: "Please enter amount for budget 'low'.",
            default: 0
        },
        high:{
            type: Number,
            required: "Please enter amount for budget 'high'.",
            default: 100
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

const Budget = Mongoose.model("Budget", BudgetSchema);

module.exports = {
    Budget,
    BudgetSchema
};