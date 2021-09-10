import React from "react";

function NavBar(){
    return (
        <nav className="container-fluid navbar navbar-expand-md navbar-ligh bg-light">
            
            <button className="nabar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarCollapesableContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapseableContent">
                <ul className="navbar-nav">
                    <li key="0" className="nav-item px-3">
                        <a className="nav-link" href="/">
                            <i class="fas fa-home"></i> Home
                        </a>
                    </li>
                    <li key="1" className="nav-item px-3">
                        <a className="nav-link" href="/settings">
                            <i class="fas fa-cogs"></i> Settings
                        </a>
                    </li>
                    <li key="2" className="nav-item px-3">
                        <a className="nav-link" href="/help">
                            <i class="fas fa-question-circle"></i> Help
                        </a>
                    </li>                    
                </ul>
            </div>
        </nav>
    );
}

export {
    NavBar
};