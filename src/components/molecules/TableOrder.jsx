import React, { useState } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import "jspdf-autotable";

function TableOrder() {
  const columns = [
    {
      name: "No",
      selector: row => row.No,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: row => row.cantidad,
      sortable: true,
    },
    {
      name: "Unidad",
      selector: row => row.unidad,
      sortable: true,
    },
    {
      name: "Descripción",
      selector: row => row.descripcion,
      sortable: true,
    },
    {
      name: "Precio Unitario",
      selector: row => row.precioUnitario,
      sortable: true,
    },
    {
      name: "Subtotal",
      selector: row => row.subtotal,
      sortable: true,
    },
  ];

  const data = [
    {
      No: "1",
      cantidad: "1",
      unidad: "Perez",
      descripcion: "25",
      precioUnitario: "25",
      subtotal: "25",
    },
    {
      No: "2",
      cantidad: "2",
      unidad: "Gomez",
      descripcion: "30",
      precioUnitario: "25",
      subtotal: "25",
    },
    {
      No: "3",
      cantidad: "1",
      unidad: "Lopez",
      descripcion: "35",
      precioUnitario: "25",
      subtotal: "25",
    },
  ];

  const [records, setRecords] = useState(data);

  const handleChange = (e) => {
    const filteredRecords = data.filter(record =>
      record.descripcion.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(filteredRecords);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Order Table", 20, 10);

    const tableColumn = columns.map(col => col.name);
    const tableRows = records.map(record => [
      record.No,
      record.cantidad,
      record.unidad,
      record.descripcion,
      record.precioUnitario,
      record.subtotal,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("table.pdf");
  };

  return (
    <>
      <input type="text" onChange={handleChange} placeholder="Buscar por descripción" />
      <button onClick={generatePDF}>Generar PDF</button>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        pagination
        paginationPerPage={5}
        fixedHeader
      />
    </>
  );
}

export default TableOrder;
