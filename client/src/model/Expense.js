// Format that the file should have.

const Headers = 
{   
    header0: ["Date", "Category", "SubCategory", "Expense Amount", "Account", "Payee", "Notes", "Device"],
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
                    message:`Expense header(${values}) appears to be an Expense`,
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
                        message:`Expense header(${values}) matches a correct header format (${Headers["header"+i]})`,
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
        message:`Expense header(${values}) doesn't match possible header formats (${JSON.stringify(Headers)})`,
        success:false
    };    
}

const Expense = {
    date:new Date(),
    category:"",
    subCategory:"",
    expenseAmount:Number(0.0),
    account:"",
    payee:"",
    notes:"",
    device:"",
    error:"",
    message: "",
    success:false
};

function getExpense(values){
    
    const newExpense = Expense;
    // Set Date
    if(values[0]){
        newExpense.date = Date.parse(values[0]);
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set Category
    if(values[1]){
        newExpense.category = values[1];
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set SubCategory
    if(values[2]){
        newExpense.subCategory = values[2];
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set expenseAmount
    if(values[3]){
        newExpense.expenseAmount = Number(values[3]);
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set Account
    if(values[4]){
        newExpense.account = values[4];
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set Payee
    if(values[5]){
        newExpense.payee = values[5];
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set Notes
    if(values[6]){
        newExpense.notes = values[6];
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }
    // Set Device
    if(values[7]){
        newExpense.device = values[7];
    }else{
        newExpense.error = `Parsing error`;
        newExpense.message = `Passed values (${values}) invalid`;
    }

    // Check values
    if(isNaN(newExpense.date)){
        newExpense.error = `Parsing error`;
        newExpense.message = `Expected date received (${values[0]})\n`;
    }
    if(isNaN(newExpense.expenseAmount)){
        newExpense.error = `Parsing error`;
        newExpense.message = `Expected amount received (${values[3]})\n`;
    }
    
    if(newExpense.error.length === 0){
        newExpense.success = true;
    }

    return newExpense;
}

export {
    checkHeaders,
    getExpense,
    Expense,
    Headers    
}