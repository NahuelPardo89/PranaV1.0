import { Component } from '@angular/core';
import { PaymentMethod } from 'src/app/Models/appointments/paymentmethod.interface';
import { PaymentmethodService } from 'src/app/Services/paymentmethod/paymentmethod.service';

@Component({
  selector: 'app-paymentmethodlist',
  templateUrl: './paymentmethodlist.component.html',
  styleUrls: ['./paymentmethodlist.component.css']
})
export class PaymentmethodlistComponent {
  methods: PaymentMethod[] = [];

  constructor(private paymentMethodService: PaymentmethodService) { }

  ngOnInit(): void {
    this.loadMethods();
  }

  loadMethods(): void {
    this.paymentMethodService.getPaymentMethods().subscribe(data => {
      this.methods = data;
    }, error => {
      console.error('Error loading payment methods', error);
    });
  }

  onEdit(methodId: number): void {
    // Aquí puedes añadir la lógica para manejar la edición del método de pago.
    console.log(`Editing method with ID: ${methodId}`);
  }

  onDelete(methodId: number): void {
    // Aquí puedes añadir la lógica para manejar la eliminación del método de pago.
    console.log(`Deleting method with ID: ${methodId}`);
  }
}
