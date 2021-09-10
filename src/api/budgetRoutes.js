const router = require("express").Router();

// API routes

// API route: /api/budget/ (get)
router.get("/", async(req,res)=>{
    console.log("Getting saved Budgets");
    let results = "Successfull Get Call";

    res.status(200).json({
        Results:results
    });
});

// API route: /api/budget/ (post)
router.post("/", async(req,res)=>{
    console.log("Posting new Budgets");
    let results = "Successfull Post Call";

    res.status(200).json({
        Results:results
    });
});

// API route: /api/budget/:id (delete)
router.delete("/:id", async(req,res)=>{
    let budgetId = req.params.id;
    console.log(`Deleting Budget ${budgetId}`);
    let results = `Successfull Delete Budget ${budgetId} Call `;
    
    res.status(200).json({
        Results:results
    });
});
  
// Default route: any route not previously taken
router.get("*", (req, res) => {
    console.log("Default get Request");
    
    res.status(400).json({
        message: 'Bad API Request - 👋🌎🌍🌏'
    });
});
    
module.exports = router;