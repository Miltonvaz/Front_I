import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ totalValue, invoice, onPaymentSuccess }) => {
    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                if (!actions || !actions.order) {
                    console.error("PayPal actions not defined");
                    return Promise.reject(new Error("PayPal actions not defined")); 
                }

                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: totalValue
                            },
                            description: invoice
                        }
                    ]
                });
            }}
            onApprove={async (data, actions) => {
                if (!actions || !actions.order) {
                    console.error("PayPal actions not defined on approval");
                    return;
                }

                try {
                    await actions.order.capture();
                    onPaymentSuccess(); 
                } catch (err) {
                    console.error("Error capturing order:", err);
                }
            }}
            onError={(err) => {
                console.error("PayPal Error: ", err);
            }}
        />
    );
};

export default PayPalButton;
