import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from 'sweetalert2';

const PayPalButton = ({ totalValue, invoice, onPaymentSuccess }) => {
    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: totalValue
                        },
                        description: invoice
                    }]
                });
            }}
            onApprove={async (data, actions) => {
                try {
                    const order = await actions.order.capture();
                    console.log("Detalles del pedido aprobado:", order);
                    onPaymentSuccess(order);
                } catch (error) {
                    console.error("Error en el procesamiento del pedido:", error);
                    Swal.fire('Error', 'Hubo un problema al capturar el pedido.', 'error');
                }
            }}
            onError={(err) => {
                console.error("Error en el pago:", err);
                Swal.fire('Error', 'Hubo un problema con el pago.', 'error');
            }}
        />
    );
};

export default PayPalButton;