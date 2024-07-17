import Header from "../components/organismos/Header";
import React, { useState, useEffect } from 'react';
import CardsProduct from "../components/molecules/CardsProduct";

function ToolsElectric(){
    const[bandera, setBandera] = useState(false);
    const [data, setData] = useState([]);
    
        useEffect(()=>{
            fetch(`${import.meta.env.VITE_API_URL}/api/products/electricos`,{
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
            }).then(
                response => {
                    if(response.ok){
                        return response.json()
                    }
                }
            ).then(
                data => {
                    
                    setData(data)
                    setBandera(true)
                }
            ).catch(error =>{
                console.log(error)
            })
            
        },[bandera])
    return(
        <>

        <Header></Header>
        <div className="all-toolselectric">
            <div className="h2-toolsmanuals">  
                    <h2 id="id-h2manuals">Productos Electricos</h2>
            </div>
        </div>  
        <div>
                {data.map(element => (
                    <CardsProduct key={element.id} text={element.name} />
                ))}
                </div>  
        </>
    );
}
export default ToolsElectric;