import React, {useRef, useReducer } from "react";
import CSVReader from "react-csv-reader";
import FilesUploadConfig from "../init/FilesConfig.json";
import {Headers as billHeaders, checkHeaders as checkBillHeaders, getBill} from "../model/Bill";
import {Headers as accountHeaders, checkHeaders as checkAccountHeaders, getAccount} from "../model/Account";
import {Headers as expenseHeaders, checkHeaders as checkExpenseHeaders, getExpense} from "../model/Expense";
import {Headers as incomeHeaders, checkHeaders as checkIncomeHeaders, getIncome} from "../model/Income";
import {Headers as userBudgetHeaders, checkHeaders as checkUserBudgetHeaders, getUserBudget} from "../model/UserBudget";
import {Headers as transferHeaders, checkHeaders as checkTransferHeaders, getTransfer} from "../model/Transfer";

// import { API } from "../api/API";

function Home(){

    const initFilesConfig = FilesUploadConfig || [
        {
            label: "",
            id: "",
            name: "",
            style: {},
            csvParsingOptions: {
                header: false,
                skipEmptyLines: true
            },
            order: 0
        }
    ];

    function changeFilesConfig(currentFilesConfig, change){
        return {...currentFilesConfig, change};
    }
    const [filesUploadConfigData, setFilesUploadConfigData] = useReducer(changeFilesConfig, initFilesConfig);

    const handleBills = async(data, fileInfo)=>{
        console.log(`Bill File uploaded:`);        
        console.log(data);
        console.log(fileInfo);
        console.log(this);
        
        let numBills = 0;        
        
        // Check Headers
        let goodFormat = true;
        for(let i=0; i< billHeaders.numHeaders; i++){
            let checkFormat = checkBillHeaders(data[i]);
            if(!checkFormat.success){
                console.log(checkFormat.error);
                console.log(checkFormat.message);
                goodFormat = false;
            }
        }
                
        if(goodFormat){
            // Headers look good try parsing bills
            if(data.length > billHeaders.numHeaders){
                // Get Bills
                for (let i=billHeaders.numHeaders; i < data.length; i++){
                    console.log(`Found Bill (${JSON.stringify(getBill(data[i]))})`);
                    numBills++;
                }
            }else{
                console.log("File appears to have no header data");
            }
        }
    
        console.log(`Found ${numBills} Bills`);
    };

    const handleAccounts = async(data, fileInfo)=>{
        console.log(`Account File uploaded:`);        
        console.log(data);
        console.log(fileInfo);
        console.log(this);
        
        let numAccounts = 0;
        let lastAccountNameLine = 0;
        let lastAccountTypeLine = 1;
        let lastAccountHeadingLine = 2;
        let goodFormat = true;

        // Check initial Headers (can be multiple in file)
        for(let i=0; i< accountHeaders.numHeaders; i++){
            let checkFormat = checkAccountHeaders(data[i]);
            if(!checkFormat.success){
                console.log(checkFormat.error);
                console.log(checkFormat.message);
                goodFormat = false;
                break;
            }
        }
                
        if(goodFormat){
            // Initial Headers look good try parsing accounts
            if(data.length > accountHeaders.numHeaders){
                // Get Accounts Data
                for (let i=accountHeaders.numHeaders; i < data.length; i++){
                    // Check if current line is a new header line
                    let checkLine = checkAccountHeaders(data[i]);
                    if(checkLine.success){
                        // Line is a new header so update last***Line values
                        switch(i){
                            case (lastAccountHeadingLine+1):
                                // Assume this line heading is a new accountNameLine
                                lastAccountNameLine = i;
                                break;
                            case (lastAccountTypeLine+1):
                                // Assume this line heading is a new accountHeadingLine
                                lastAccountHeadingLine = i;
                                break;
                            case (lastAccountNameLine+1):
                                // Assume this line heading is a new accountTypeLine
                                lastAccountTypeLine = i;
                                break;
                            default:
                                // currentLine is more than 1 line away from all headers so assume new accountNameLine
                                lastAccountNameLine = i;
                                break;
                        }
                    }else{
                        // Line is not a header line so set account data
                        let accountData = [data[lastAccountNameLine], data[lastAccountTypeLine], ...data[i]];
                        console.log(`Found Account (${JSON.stringify(getAccount(accountData))})`);
                        numAccounts++;
                    }                    
                }
            }else{
                console.log("File appears to have no data");
            }
        }
    
        console.log(`Found ${numAccounts} Accounts`);
    };

    const handleDefault = async(data, fileInfo)=>{
        
        // Check Headers
        console.log(`Account File uploaded:`);        
        console.log(data);
        console.log(fileInfo);
        console.log(this);
        
        let numExpenses = 0;
        let numIncomes = 0;
        let numBudgets = 0;
        let numTransfers = 0;

        let goodFormat = true;

        // Check initial Headers (can be multiple in file)
        for(let i=0; i< expenseHeaders.numHeaders; i++){
            let checkFormat = checkExpenseHeaders(data[i]);
            if(!checkFormat.success){
                console.log(checkFormat.error);
                console.log(checkFormat.message);
                goodFormat = false;
                break;
            }            
        }
                
        if(goodFormat){
            // Initial Headers look good try parsing expenses
            if(data.length > expenseHeaders.numHeaders){
                
                // Get Expense Data
                for (let i=expenseHeaders.numHeaders; i < data.length; i++){
                    // Check if current line is a new header line
                    let checkIncomeLine = checkIncomeHeaders(data[i]);
                    if(checkIncomeLine.success){
                
                        // Get Income Data
                        for (let j=i+incomeHeaders.numHeaders; j < data.length; j++){
                            // Check if current line is a new header line
                            let checkBudgetLine = checkUserBudgetHeaders(data[j]);
                            if(checkBudgetLine.success){
                                
                                // Get UserBudget Data
                                for (let k=j+userBudgetHeaders.numHeaders; k < data.length; k++){
                                    // Check if current line is a new header line
                                    let checkTransferLine = checkTransferHeaders(data[k]);
                                    if(checkTransferLine.success){

                                        // Get Transfer Data
                                        for (let m=k+transferHeaders.numHeaders; m < data.length; m++){
                                            // Set Transfer data
                                            console.log(`Found Transfer (${JSON.stringify(getTransfer(data[m]))})`);
                                            numTransfers++;                                                                
                                        }
                                        // Done with all Transfer lines
                                        break;
                                    }else{
                                        // Line is not a header line so set user budget data
                                        console.log(`Found User Budget (${JSON.stringify(getUserBudget(data[k]))})`);
                                        numBudgets++;
                                    } 
                                }
                                // Done with all User Budget lines
                                break;
                            }else{
                                // Line is not a header line so set income data
                                console.log(`Found Income (${JSON.stringify(getIncome(data[j]))})`);
                                numIncomes++;
                            } 
                        }
                        // Done with all income lines                        
                        break;
                    }else{
                        // Line is not a header line so set expense data
                        console.log(`Found Expense (${JSON.stringify(getExpense(data[i]))})`);
                        numExpenses++;
                    }                    
                }
                // Done with all expense lines                
            }else{
                console.log("File appears to have no data");
            }
        }
        console.log(`Found ${numExpenses} Expenses`);
        console.log(`Found ${numIncomes} Incomes`);
        console.log(`Found ${numBudgets} Budgets`);
        console.log(`Found ${numTransfers} Transfers`);
    };

    const handleUnknown = async(data, fileInfo)=>{
        console.log(`Unknown file upload`);
    };

    const handleError = async(event)=>{
        event.preventDefault();
        console.log(`File upload error:${event.target}`);
    };

    return (
        <div className="container border">
            <div className="col-12">
                <h3>Upload Home Budget Data (CSVs)</h3>
            </div>
            {
                filesUploadConfigData.map((fileConfig)=>{
                    switch (fileConfig.id){
                        case "BillCSV":
                            return (
                                <div key={fileConfig.order} className="row">
                                    <CSVReader label={fileConfig.label} onFileLoaded={handleBills} onError={handleError} parserOptions={fileConfig.csvParsingOptions} inputId={fileConfig.id} inputName={fileConfig.name} inputStyle={fileConfig.style} cssLabelClass="col-3 text-end me-2 fw-bold" cssInputClass="col-4 border "/>
                                </div>
                            );
                        case "AccountCSV" :
                            return (
                                <div key={fileConfig.order} className="row">
                                    <CSVReader label={fileConfig.label} onFileLoaded={handleAccounts} onError={handleError} parserOptions={fileConfig.csvParsingOptions} inputId={fileConfig.id} inputName={fileConfig.name} inputStyle={fileConfig.style} cssLabelClass="col-3 text-end me-2 fw-bold" cssInputClass="col-4 border "/>
                                </div>
                            );
                        case "DefaultCSV" :
                            return (
                                <div key={fileConfig.order} className="row">
                                    <CSVReader label={fileConfig.label} onFileLoaded={handleDefault} onError={handleError} parserOptions={fileConfig.csvParsingOptions} inputId={fileConfig.id} inputName={fileConfig.name} inputStyle={fileConfig.style} cssLabelClass="col-3 text-end me-2 fw-bold" cssInputClass="col-4 border "/>
                                </div>
                            );
                        default :
                            return (
                                <div key={fileConfig.order} className="row">
                                    <CSVReader label={fileConfig.label} onFileLoaded={handleUnknown} onError={handleError} parserOptions={fileConfig.csvParsingOptions} inputId={fileConfig.id} inputName={fileConfig.name} inputStyle={fileConfig.style} cssLabelClass="col-3 text-end me-2 fw-bold" cssInputClass="col-4 border "/>
                                </div>
                            );
                    }                    
                })
            }
        </div>
    );    
}

export {
    Home
};