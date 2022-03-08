// Format that the file should have.

const Headers = 
{   
    header0: ["Name"],
    header1: ["Type"],
    header2: ["Date", "Description", "Amount", "Balance", "Notes"],
    numHeaders: 3
};

function checkHeaders(values){    
    // Check each header
    for(let i=0; i<Headers.numHeaders; i++){    
        
        // Is Same length as the header ?
        if(values.length && values.length === Headers["header"+i].length){    
            
            // If single field just verify it isn't blank.
            if((values.length === 1)&&(values[0].trim().length > 0)){
                return { 
                    message:`Account header(${values}) appears to be an Account Name/Type`,
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
                        message:`Account header(${values}) matches a correct header format (${Headers["header"+i]})`,
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
        message:`Account header(${values}) doesn't match possible header formats (${JSON.stringify(Headers)})`,
        success:false
    };    
}

const Account = {
    name:"",
    type:"",
    date:new Date(),
    description:"",
    amount:Number(0.0),
    balance:Number(0.0),
    notes:"",
    error:"",
    message: "",
    success:false
};

function getAccount(values){
    
    const newAccount = Account;
    // Set Name
    if(values[0]){
        newAccount.name = values[0];
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }
    // Set Type
    if(values[1]){
        newAccount.type = values[1];
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }
    // Set Date
    if(values[2]){
        newAccount.date = Date.parse(values[2]);
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }
    // Set Description
    if(values[3]){
        newAccount.description = values[3];
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }
    // Set amount
    if(values[4]){
        newAccount.amount = Number(values[4]);
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }
    // Set balance
    if(values[5]){
        newAccount.amount = Number(values[4]);
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }
    // Set notes
    if(values[6]){
        newAccount.notes = values[6];
    }else{
        newAccount.error = `Parsing error`;
        newAccount.message = `Passed values (${values}) invalid`;
    }

    // Check values
    if(isNaN(newAccount.date)){
        newAccount.error = `Parsing error`;
        newAccount.message = `Expected date received (${values[2]})\n`;
    }
    if(isNaN(newAccount.amount)){
        newAccount.error = `Parsing error`;
        newAccount.message = `Expected amount received (${values[4]})\n`;
    }
    if(isNaN(newAccount.balance)){
        newAccount.error = `Parsing error`;
        newAccount.message = `Expected balance received (${values[5]})\n`;
    }
    
    if(newAccount.error.length === 0){
        newAccount.success = true;
    }

    return newAccount;
}

export {
    checkHeaders,
    getAccount,
    Account,
    Headers    
}