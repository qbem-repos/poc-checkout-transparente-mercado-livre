import { Component, OnInit } from '@angular/core';

declare var Mercadopago: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Verifica se o script do Mercado Pago está carregado
    const checkMercadopago = setInterval(() => {
      if (typeof Mercadopago !== 'undefined') {
        clearInterval(checkMercadopago);
        Mercadopago.setPublishableKey('YOUR_PRIVATE_KEY');
        Mercadopago.getIdentificationTypes();
        console.log('Mercado pago carregado.');
      }
      else{
        console.log('Mercado pago carregado.');
      }
    }, 100); // Verifica a cada 100ms
  }

  processPayment(formData: any) {
    const cardData = {
      cardNumber: formData.cardNumber,
      cardExpirationMonth: formData.expirationMonth,
      cardExpirationYear: formData.expirationYear,
      securityCode: formData.securityCode,
      cardholderName: formData.cardholderName,
      identificationType: formData.identificationType,
      identificationNumber: formData.identificationNumber
    };

    Mercadopago.createToken(cardData, (status: any, response: any) => {
      if (response.id) {
        console.log(response.id);
      }
    });
  }

}
