// Format that the file should have.

const Headers = 
{   
    header0: ["Date", "From", "To", "Amount", "Notes", "Device"],
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
                    message:`Transfer header(${values}) appears to be an Transfer`,
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
                        message:`Transfer header(${values}) matches a correct header format (${Headers["header"+i]})`,
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
        message:`Transfer header(${values}) doesn't match possible header formats (${JSON.stringify(Headers)})`,
        success:false
    };    
}

const Transfer = {
    date:new Date(),
    from:"",
    to:"",
    amount:Number(0.0),
    notes:"",
    device:"",
    error:"",
    message: "",
    success:false
};

function getTransfer(values){
    
    const newTransfer = Transfer;
    // Set Date
    if(values[0]){
        newTransfer.date = Date.parse(values[0]);
    }else{
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Passed values (${values}) invalid`;
    }
    // Set From
    if(values[1]){
        newTransfer.from = values[1];
    }else{
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Passed values (${values}) invalid`;
    }
    // Set To
    if(values[2]){
        newTransfer.to = values[2];
    }else{
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Passed values (${values}) invalid`;
    }
    // Set Amount
    if(values[3]){
        newTransfer.amount = Number(values[2]);
    }else{
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Passed values (${values}) invalid`;
    }
    // Set Notes
    if(values[4]){
        newTransfer.notes = values[4];
    }else{
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Passed values (${values}) invalid`;
    }
    // Set Device
    if(values[5]){
        newTransfer.device = values[5];
    }else{
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Passed values (${values}) invalid`;
    }

    // Check values
    if(isNaN(newTransfer.date)){
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Expected date received (${values[0]})\n`;
    }
    if(isNaN(newTransfer.amount)){
        newTransfer.error = `Parsing error`;
        newTransfer.message = `Expected amount received (${values[3]})\n`;
    }
    
    if(newTransfer.error.length === 0){
        newTransfer.success = true;
    }

    return newTransfer;
}

export {
    checkHeaders,
    getTransfer,
    Transfer,
    Headers    
}