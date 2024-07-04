import Href from "../atoms/href";
import "../molecules/nav.css";
function Nav(props){
    return(
        <div className="Nav_elements">
            <Href text="Inicio"/>
            <Href text="Nosotros"/>
            <Href text="Productos"/>
            <Href text="Contacto" referencia= "/Contacto"/>

        </div>
    );
}

export default Nav;