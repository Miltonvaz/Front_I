import { row } from "mathjs";
import DataTable from "react-data-table-component";
import { useState } from "react";

function TableCar(){

    const columns = [
        {
            name: "nombre", 
            selector : row => row.nombre  ,
            sortable: true, 
        },
        {
            name: "apellido",    
            selector : row => row.apellido ,
            sortable: true, 
        },
        {
            name: "edad",
           selector : row => row.edad , 
           sortable: true,    
        },
    ]

    const data =[
        {
            nombre: "Juan",
            apellido: "Perez",
            edad: 25
        },
        {
            nombre: "Maria",
            apellido: "Gomez",
            edad: 30
        },
        {
            nombre: "Pedro",
            apellido: "Lopez",
            edad: 35
        }
    ]
    const [records, setRecords] = useState(data);

    const handleChange = (e) =>{
       const filteredRecords= data.filter(record =>  {
          return  record.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredRecords)
    }

    return(
        <>
        <input type="text" onChange={handleChange}></input>
        <DataTable
        columns={columns}
        data={records}
        selectableRows
        pagination
        paginationPerPage={5}
        fixedHeader
        />
        </>
    )
}
export default TableCar;