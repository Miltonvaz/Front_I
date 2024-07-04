import "../atoms/href.css";

function Href(props){
    return(
        <div className="href">
        <a href={props.referencia}>{props.text}</a>
        </div>
    );
}
export default Href;