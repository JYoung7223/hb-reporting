// Format that the file should have.

const Headers = 
{   
    header0: ["Bills"],
    header1: ["Due Date", "Bill Type", "Payee/Account", "Amount", "Paid?"],
    numHeaders: 2
};

function checkHeaders(values){    
    // Check each header
    for(let i=0; i<Headers.numHeaders; i++){    
        
        // Is Same length as the header ?
        if(values.length && values.length === Headers["header"+i].length){    
            
            // check field titles
            for(let j=0; j<Headers["header"+i].length; j++){        
                // title doesn't match break to next header.
                if(values[j].toLowerCase() !== Headers["header"+i][j].toLocaleLowerCase()){
                    break;            
                }
                // if it is the last item in header and we reached this point, then we have a full match
                if(j === Headers["header"+i].length-1){
                    return { 
                        message:`Bill header(${values}) matches a correct header format (${Headers["header"+i]})`,
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
        message:`Bill header(${values}) doesn't match possible header formats (${JSON.stringify(Headers)})`,
        success:false
    };    
}

const Bill = {
    dueDate:new Date(),
    type:"",
    payee:"",
    amount:Number(0.0),
    paid:false,
    error:"",
    message: "",
    success:false
};

function getBill(values){
    
    const newBill = Bill;
    // Set Date
    if(values[0]){
        newBill.dueDate = Date.parse(values[0]);
    }else{
        newBill.error = `Parsing error`;
        newBill.message = `Passed values (${values}) invalid`;
    }
    // Set Type
    if(values[1]){
        newBill.type = values[1];
    }else{
        newBill.error = `Parsing error`;
        newBill.message = `Passed values (${values}) invalid`;
    }
    // Set Payee
    if(values[2]){
        newBill.payee = values[2];
    }else{
        newBill.error = `Parsing error`;
        newBill.message = `Passed values (${values}) invalid`;
    }
    // Set Amount
    if(values[3]){
        newBill.amount = Number(values[3]);
    }else{
        newBill.error = `Parsing error`;
        newBill.message = `Passed values (${values}) invalid`;
    }
    // Set Paid
    if(values[4] && values[4].toLowerCase() === "paid"){
        newBill.paid = true;
    }else{
        newBill.paid = false;
    }

    // Check values
    if(isNaN(newBill.dueDate)){
        newBill.error = `Parsing error`;
        newBill.message = `First column does not appear to be a date (${values[0]})\n`;
    }
    if(isNaN(newBill.amount)){
        newBill.error = `Parsing error`;
        newBill.message = `Fourth column does not appear to be an amount (${values[3]})\n`;
    }
    if(newBill.error.length === 0){
        newBill.success = true;
    }

    return newBill;
}

export {
    checkHeaders,
    getBill,
    Bill,
    Headers    
}