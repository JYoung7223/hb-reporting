// Format that the file should have.

const Headers = 
{   
    header0: ["Date", "Description", "Income Amount", "Account", "Notes", "Device"],
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
                    message:`Income header(${values}) appears to be an Income`,
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
                        message:`Income header(${values}) matches a correct header format (${Headers["header"+i]})`,
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
        message:`Income header(${values}) doesn't match possible header formats (${JSON.stringify(Headers)})`,
        success:false
    };    
}

const Income = {
    date:new Date(),
    description:"",
    incomeAmount:Number(0.0),
    account:"",
    notes:"",
    device:"",
    error:"",
    message: "",
    success:false
};

function getIncome(values){
    
    const newIncome = Income;
    // Set Date
    if(values[0]){
        newIncome.date = Date.parse(values[0]);
    }else{
        newIncome.error = `Parsing error`;
        newIncome.message = `Passed values (${values}) invalid`;
    }
    // Set Description
    if(values[1]){
        newIncome.description = values[1];
    }else{
        newIncome.error = `Parsing error`;
        newIncome.message = `Passed values (${values}) invalid`;
    }
    // Set IncomeAmount
    if(values[2]){
        newIncome.incomeAmount = Number(values[2]);
    }else{
        newIncome.error = `Parsing error`;
        newIncome.message = `Passed values (${values}) invalid`;
    }
    // Set Account
    if(values[3]){
        newIncome.account = values[3];
    }else{
        newIncome.error = `Parsing error`;
        newIncome.message = `Passed values (${values}) invalid`;
    }
    // Set Notes
    if(values[4]){
        newIncome.notes = values[4];
    }else{
        newIncome.error = `Parsing error`;
        newIncome.message = `Passed values (${values}) invalid`;
    }
    // Set Device
    if(values[5]){
        newIncome.device = values[5];
    }else{
        newIncome.error = `Parsing error`;
        newIncome.message = `Passed values (${values}) invalid`;
    }

    // Check values
    if(isNaN(newIncome.date)){
        newIncome.error = `Parsing error`;
        newIncome.message = `Expected date received (${values[0]})\n`;
    }
    if(isNaN(newIncome.incomeAmount)){
        newIncome.error = `Parsing error`;
        newIncome.message = `Expected amount received (${values[2]})\n`;
    }
    
    if(newIncome.error.length === 0){
        newIncome.success = true;
    }

    return newIncome;
}

export {
    checkHeaders,
    getIncome,
    Income,
    Headers    
}