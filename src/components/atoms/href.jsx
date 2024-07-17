import "../atoms/href.css";

function Href(props){
    return(
        <div className="href">
        <a href={props.referencia} onClick={props.onClick}>{props.text}</a>
        </div>
    );
}
export default Href;