import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import {   IonMenu,IonContent,IonAccordion,
  IonAccordionGroup,IonBadge, IonCardContent,IonSelectOption,
  IonCardHeader,IonAvatar,IonCardTitle,IonList} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { RouterModule } from '@angular/router';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { AlertController,IonicModule } from '@ionic/angular';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component'; // Importa el componente modal
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true, // Especificar que es un componente autónomo
  imports: [CommonModule ,  IonBadge,IonSelectOption,
    IonContent,IonList,ReactiveFormsModule, IonCardContent,
    IonAccordion,HttpClientModule,ReactiveFormsModule,
    IonCardHeader,IonAvatar,IonCardTitle,IonicModule,DatePickerModalComponent,
    IonAccordionGroup,IonMenu,RouterModule],
})
export class RegisterPage {
  registerForm: FormGroup;
  isModalOpen: boolean = false; // Controla la apertura del modal

  constructor(
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,  
    private http: HttpClient,
    private alertController: AlertController) {
    
      this.registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        celular: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Validación para solo números
        
        fecha_nacimiento: ['',[Validators.required]],
        foto: [''],
        rol: ['1'], // Default to '1' (user role)
      });
  }
  onFechaSeleccionada(event: any) {
    const fechaSeleccionada = event.detail.value; // Extraer el valor de la fecha seleccionada
    this.registerForm.patchValue({ fecha_nacimiento: fechaSeleccionada }); // Actualizar el campo del formulario
    console.log('Fecha seleccionada:', fechaSeleccionada); // (Opcional) Mostrar la fecha en consola
  }
  
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 3000,
    });

    loading.present();
  }
  async onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      try {
        const response = await this.http
          .post('http://127.0.0.1:8000/api/users', formData)
          .toPromise();

        const alert = await this.alertController.create({
          header: 'Registro Exitoso',
          message: 'El usuario ha sido registrado correctamente.',
          buttons: ['OK'],
        });
        await alert.present();

        console.log('Respuesta del servidor:', response);
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error en el Registro',
          message: 'Hubo un problema al registrar al usuario. Intenta nuevamente.',
          buttons: ['OK'],
        });
        await alert.present();

        console.error('Error al registrar:', error);
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Formulario Inválido',
        message: 'Por favor completa todos los campos requeridos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
// Abre el modal
abrirModalDatePicker() {
  this.isModalOpen = true;
}

// Cierra el modal
cerrarModal(event?: any) {
  this.isModalOpen = false;
}




}
