import NavEmployees from "../molecules/navEmployees"
import "../organismos/Header.css";


function HeaderEmployees(){
    return(
        <div className="all-Header">
            <div className="img-phone">
                
            </div>
        
            <div className="Nav">
                <NavEmployees/>
                
            </div>
            
        </div>

    );    
}

export default HeaderEmployees;