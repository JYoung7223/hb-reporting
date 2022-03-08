// System Budget will contain the budget amounts & percentages to compare the users budget against

const SystemBudget = {
    id:"",
    category:"",
    type:"",
    low:Number(0.0),
    high:Number(0.0),
    subBudget: [],
    createDt:new Date(),
    modifiedDt:new Date(),
    modifiedId:""
};

export {    
    SystemBudget    
}