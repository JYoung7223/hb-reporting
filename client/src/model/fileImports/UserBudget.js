// Format that the file should have.

const Headers = 
{   
    header0: ["Category", "SubCategory", "Budget Amount", "Expense Amount", "Balance"],
    numHeaders: 1
};

function checkHeaders(values){    
    // Check each header
    for(let i=0; i<Headers.numHeaders; i++){    
        
        // Is Same length as the header ?
        if(values.length && values.length === Headers["header"+i].length){    
            
            // If single field just verify it isn't blank.
            if((values.length === 1)&&(values[0].trim().length > 0)){
                return { 
                    message:`UserBudget header(${values}) appears to be an UserBudget`,
                    success:true
                };
            }
            // If multiple fields needs to check field titles
            for(let j=0; j<Headers["header"+i].length; j++){        
                // title doesn't match break to next header.
                if(values[j].toLowerCase() !== Headers["header"+i][j].toLocaleLowerCase()){
                    break;            
                }
                // if it is the last item in header and we reached this point, then we have a full match
                if(j === Headers["header"+i].length-1){
                    return { 
                        message:`UserBudget header(${values}) matches a correct header format (${Headers["header"+i]})`,
                        success:true
                    };
                }
            }
            // If reached here, one of the titles didn't match.            
        }
    }
    // Went through each header and non match values passed
    return { 
        error:"Parsing error",
        message:`UserBudget header(${values}) doesn't match possible header formats (${JSON.stringify(Headers)})`,
        success:false
    };    
}

const UserBudget = {
    category:"",
    subCategory:"",
    budgetAmount:Number(0.0),
    expenseAmount:Number(0.0),
    balance:Number(0.0),
    error:"",
    message: "",
    success:false
};

function getUserBudget(values){
    
    const newUserBudget = UserBudget;
     // Set Category
    if(values[0]){
        newUserBudget.category = values[0];
    }else{
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Passed values (${values}) invalid`;
    }
    // Set SubCategory
    if(values[1]){
        newUserBudget.subCategory = values[1];
    }else{
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Passed values (${values}) invalid`;
    }
    // Set BudgetAmount
    if(values[2]){
        newUserBudget.budgetAmount = Number(values[2]);
    }else{
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Passed values (${values}) invalid`;
    }
    // Set ExpenseAmount
    if(values[3]){
        newUserBudget.expenseAmount = Number(values[3]);
    }else{
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Passed values (${values}) invalid`;
    }
    // Set Balance
    if(values[4]){
        newUserBudget.balance = Number(values[4]);
    }else{
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Passed values (${values}) invalid`;
    }
    

    // Check values
    if(isNaN(newUserBudget.budgetAmount)){
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Expected amount received (${values[2]})\n`;
    }
    if(isNaN(newUserBudget.expenseAmount)){
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Expected amount received (${values[3]})\n`;
    }
    if(isNaN(newUserBudget.balance)){
        newUserBudget.error = `Parsing error`;
        newUserBudget.message = `Expected amount received (${values[4]})\n`;
    }
    
    if(newUserBudget.error.length === 0){
        newUserBudget.success = true;
    }

    return newUserBudget;
}

export {
    checkHeaders,
    getUserBudget,
    UserBudget,
    Headers    
}