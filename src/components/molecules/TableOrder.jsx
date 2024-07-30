import React, { useState } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";

function TableOrder({ data }) {
    const columns = [
        {
            name: "Products",
            selector: row => row.product_id_fk,
            selector: row => row.cantidad,
            sortable: true,
        },
        {
            name: "City",
            selector: row => row.city,
            sortable: true,
        },
        {
            name: "Street",
            selector: row => row.street,
            sortable: true,
        },
        {
            name: "UserId",
            selector: row => row.user_id_fk,
            sortable: true,
        },
        {
            name: "Id",
            selector: row => row.purchaseorder_id,
            sortable: true,
        },
    ];

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Order Table", 20, 10);

        const tableColumn = columns.map(col => col.name);
        const tableRows = data.map(record => [
            record.product_id_fk,
            record.City,
            record.street,
            record.user_id_fk,
            record.purchaseorder_id
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });

        doc.save("table.pdf");
    };
    
     const [records, setRecords] = useState(data);

  

    return (
        <>
            <div>
                
                <button onClick={generatePDF}>Generar PDF</button>
            </div>
            <DataTable
                columns={columns}
                data={data}
                selectableRows
                pagination
                paginationPerPage={5}
                fixedHeader
            />
        </>
    );
}

export default TableOrder;
