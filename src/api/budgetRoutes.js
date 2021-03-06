const router = require("express").Router();
const { Budget } = require("../model/Budget");

// API routes
// Get stored budgets
// API route: /api/budget/ (get)
router.get("/", async(req,res)=>{
    console.log("Getting saved Budgets");
    
    Budget.find({}).sort({category: -1})
        .then((dbResult) => {
            res.status(200).json(dbResult);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
// API route: /api/budget/:id (get)
router.get("/:id", async(req,res)=>{
    let budgetId = req.params.id;
    console.log(`Getting saved Budget ${budgetId}`);
    
    Budget.findById(budgetId)
        .then((dbResult) => {
            res.status(200).json(dbResult);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Create budgets
// API route: /api/budget/ (post)
router.post("/", async(req,res)=>{
    console.log("Posting new Budget");
    const newBudget = new Budget(req.body);
    Budget.create(newBudget)
        .then((dbResult) => {
            res.status(200).json(dbResult)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
// API route: /api/budget/bulk (post)
router.post("/bulk", async(req,res)=>{
    console.log("Posting new Budgets");

    Budget.insertMany(req.body)
        .then(dbResult=> {
            res.status(200).json(dbResult)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Update Budgets
// API route: /api/budget/:id (put)
router.put("/:id", async(req,res)=>{
    let budgetId = req.params.id;
    console.log(`Updating Budget ${budgetId}`);
    console.log(`Request: _id:${budgetId}, body:${req.body}`);
    Budget.findByIdAndUpdate(
        {_id: budgetId},
        req.body
        )
        .then(dbResult => {
            res.status(200).json(dbResult); // Returns the pre-updated entry
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// API route: /api/budget/:id (delete)
router.delete("/:id", async(req,res)=>{
    let budgetId = req.params.id;
    console.log(`Deleting Budget ${budgetId}`);
    
    Budget.findByIdAndDelete(budgetId)
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((error)=>{
            res.status(500).json(error);
        });    
});
  
// Default route: any route not previously taken
router.get("*", (req, res) => {
    console.log("Default get Request");
    
    res.status(400).json({
        message: 'Bad API Request - ????????????????'
    });
});
    
module.exports = router;