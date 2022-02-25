# Introduction
This project is intended to add additional reporting to the HomeBudget App.

# User Flow
1. Users will export data from the HomeBudget App into *.csv files. (Accounts, Bills, Transactions (default) )
2. User will upload exported *.csv files into the browser interface of this app.
3. App will evaluate data to generate reporting.
4. User may customize parameters of reports by going into the settings inteface in the browser.
5. User customizations can be saved to local storage for persistence.

# Object Function
> Model 
> - Budget - Budget is meant to hold an entry of the system budget setting
> - Stat - Stats will hold an entry of statistical information on the app (ex: # of runs, # of users, etc.)
> - Account - Account will hold an entry of an account as received from "Accounts.csv" file exported from HomeBudget app.
> - Bill - Bill will hold an entry of a bill as received from "Bills.csv" file exported from HomeBudget app.
> - Expense - Expense will hold an expense transaction entry of a transaction as received from "Default.csv" file exported from HomeBudget app.
> - Income - Income will hold an income transaction entry of a transaction as received from "Default.csv" file exported from HomeBudget app.
> - UserBudget - UserBudget will hold an entry of the user's budget as received from "Default.csv" file exported from HomeBudget app.
> - Transfer - Transfer will hold an entry of a transfer transaction as received from "Default.csv" file exported from HomeBudget app.