const router = require("express").Router();
const { Stat } = require("../model/Stat");

// API routes
// Get stored Stats
// API route: /api/stat/ (get)
router.get("/", async(req,res)=>{
    console.log("Getting saved Stats");
    
    Stat.find({}).sort({category: -1})
        .then((dbResult) => {
            res.status(200).json(dbResult);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});
// API route: /api/stat/:id (get)
router.get("/:id", async(req,res)=>{
    let statId = req.params.id;
    console.log(`Getting saved Stat ${statId}`);
    
    Stat.findById(statId)
        .then((dbResult) => {
            res.status(200).json(dbResult);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// Create Stats
// API route: /api/stat/ (post)
router.post("/", async(req,res)=>{
    console.log("Posting new Stat");
    const newStat = new Stat(req.body);
    Stat.create(newStat)
        .then((dbResult) => {
            res.status(200).json(dbResult)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});
// API route: /api/stat/bulk (post)
router.post("/bulk", async(req,res)=>{
    console.log("Posting new Stats");

    Stat.insertMany(req.body)
        .then(dbResult=> {
            res.status(200).json(dbResult)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Update Stats
// API route: /api/stat/:id (put)
router.put("/:id", async(req,res)=>{
    let statId = req.params.id;
    console.log(`Updating Stat ${statId}`);
    console.log(`Request: _id:${statId}, body:${req.body}`);
    Stat.findByIdAndUpdate(
        {_id: statId},
        req.body
        )
        .then(dbResult => {
            res.status(200).json(dbResult); // Returns the pre-updated entry
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// API route: /api/stat/:id (delete)
router.delete("/:id", async(req,res)=>{
    let statId = req.params.id;
    console.log(`Deleting Stat ${statId}`);
    
    Stat.findByIdAndDelete(statId)
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
        message: 'Bad API Request - 👋🌎🌍🌏'
    });
});
    
module.exports = router;