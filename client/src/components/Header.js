import React from "react";

function Header(){
    return (
        <header className="container-fluid">
            <div className="row">
                <h1 className="col-12 col-lg-6 mx-auto logo">
                    <a href="/">
                        <i className="fas fa-hand-holding-usd"></i>
                        <span className="company-name text-wrap align-middle"> United Financial Reporting </span>                         
                    </a>
                </h1>
            </div>
            <div className="col-12 text-center">
                <p>Bringing you closer to Financial Prosperity </p><i className="fas fa-chart-line"></i>
            </div>
        </header>
    );
}

export {
    Header
};