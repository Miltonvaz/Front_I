

function CardsProduct(props){
    return(
        <>
              <div id="father-cards">
                <div className="img-cards">
                    <img src="https://www.escuelasdeprogramacion.com/wp-content/uploads"/>
                    
                </div>
                <div className="text-cards">
                    <p>{props.text}</p>
                </div>
            </div>
        </>
    )
}
export default CardsProduct;