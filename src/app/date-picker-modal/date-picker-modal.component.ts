import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-date-picker-modal',
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class DatePickerModalComponent {
  // isOpen: any;
  @Input() isOpen: boolean=false; // Utilizar @Input para recibir el estado del modal desde el componente padre
  @Output() fechaSeleccionada = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<void>(); // Emitir un evento cuando el modal se cierra

  onDateSelected(event: any) {
    const fecha = event.detail.value;
    this.fechaSeleccionada.emit(fecha);
  }

  cerrarModal() {
    this.modalClosed.emit(); // Emitir el evento de cierre del modal
  }
}
