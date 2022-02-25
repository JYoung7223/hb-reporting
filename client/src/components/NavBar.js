import React, {useReducer} from "react";
import NavBarItems from "../init/NavBar.json";

function NavBar(){
    const initNavBar = NavBarItems || [
        {
            text: "",
            link: "",
            icon: "",
            order: 0
        }
    ];

    function changeNavBar(currentNavBar, change){
        return {...currentNavBar, change};
    }
    const [navBarData, setNavBarData] = useReducer(changeNavBar, initNavBar);

    return (
        <nav className="container-fluid navbar navbar-expand-md navbar-light bg-light">
            
            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarCollapseableContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapseableContent">
                <ul className="navbar-nav">
                    {
                        navBarData.map((item)=>{
                            return (
                                <li key={item.order} className="nav-item px-3">
                                    <a className="nav-link" href={item.link}>
                                        <i className={item.icon}></i> {item.text}
                                    </a>
                                </li>
                            );
                        })
                    }                    
                </ul>
            </div>
        </nav>
    );
}

export {
    NavBar
};