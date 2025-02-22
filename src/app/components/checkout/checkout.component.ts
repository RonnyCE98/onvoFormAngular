import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
declare var onvo: any;
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [],
})
export class CheckoutComponent implements OnInit{
  constructor(private renderer: Renderer2) {

  }
  @ViewChild('payButton', { static: false }) payButtonRef!: ElementRef;

  async ngOnInit() {
    try {
      await this.loadOnvoSdk();
      await this.loadOnvoForm();
    } catch (error) {
      console.error('Error al inicializar Onvo:', error);
    }
  }


  async loadOnvoSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof onvo !== 'undefined') {
        resolve();
        return;
      }else{
        const script = this.renderer.createElement('script');
        script.src = `https://sdk.onvopay.com/sdk.js`;
        script.onload = () => resolve();
        script.onerror = (error: any) => reject(error);
        this.renderer.appendChild(document.head, script);
      }
    });
  }

  async loadOnvoForm() {
    try{
      const onvoInstance=onvo.pay({
        onError : (data: any) => {
      console.log('error', data);
      },
      onSuccess : (data: any) => {
        console.log('success', data);
        Swal.fire({
          title: "Exito",
          text: "Pago Exitoso!",
          icon: "success"
        });
      },
      publicKey: 'onvo_test_publishable_key_2auscb5hj84g8bAPdT4kq_92vKrb1v0681beBEKrjL16AaZeqdLvGnyQS9qc9IQEYWibwN95SQiqG_GiWIaTaQ',
      paymentIntentId : "cm7gmhlex1s50xkhkulbdg9pk",
      paymentType: "one_time",
      manualSubmit: true,
      });
      onvoInstance.render('#onvoPay');

      const payButton=this.payButtonRef.nativeElement;
      if (payButton) {
        this.renderer.listen(payButton, 'click', (event) => {
          onvoInstance.submitPayment();
        });
      } else {
        console.log("El payButton no está presente en el DOM.");
      }
    }catch(error){
      console.error('Error al inicializar Onvo:', error);
    }
  }
}
