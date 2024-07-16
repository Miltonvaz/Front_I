

function CardsEmployees(props){
    console.log(props.nombre);
    return(
        <>
            <div id="father-cards">
                <div className="img-cards">
                    <img src="https://www.escuelasdeprogramacion.com/wp-content/uploads"/>
                    
                </div>
                <div className="text-cards">
                    <p>{props.nombre}</p>
                </div>
            </div>
        </>
    )
}
export default CardsEmployees;