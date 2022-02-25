import React, {useReducer} from "react";

function Footer(){
    const initFooter = {
        text: "Copyright "+new Date().getFullYear()
    };

    function changeFooter(currentFooter, change){
        return {...currentFooter, change};
    }

    const [footerData, setFooterData] = useReducer(changeFooter, initFooter);

    return (
        <footer className="container-fluid fixed-bottom mb-0 bg-light">
            <section className="row">
                <div className="col-12 text-center text-company-primary"><i className="fas fa-copyright"></i>{footerData.text}</div>
            </section>
        </footer>
    );
}

export {
    Footer
};