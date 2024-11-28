import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle,IonMenu, IonContent,
        IonAccordion,IonChip,IonButtons,IonAccordionGroup,IonMenuButton,IonCardContent,IonButton,
        IonCard,IonCardHeader,IonAvatar,IonCardTitle,IonItem ,IonDatetime,IonCardSubtitle,IonThumbnail,IonInput
          ,IonLabel,IonList} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { EntrenoService } from '../services/entreno-service.service';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonButton, CommonModule,IonInput,IonMenu,IonAccordion,IonThumbnail,IonLabel,IonList,IonDatetime,IonCardSubtitle,
            IonChip,IonButtons,IonAccordionGroup,IonMenuButton,IonCard,IonCardHeader,IonAvatar,IonCardTitle,IonItem,IonCardContent
   ]
})
export class ProfilePage implements OnInit {
  photo: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'; // URL inicial de la foto

  fechaActual: string="";
  usuario: any;
  noEntreno:any = null;
  entreno: any = null; // Aquí se almacenará el entrenamiento obtenido
  file: any = null;
  modalCtrl: any = null;

  constructor(
    private authService: AuthService, 
    private entrenoService: EntrenoService,
    private router: Router) {}



  //   selectPhoto() {
  //     // Abrir el selector de archivos
  //     const input = document.createElement('input');
  //     input.type = 'file';
  //     input.accept = 'image/*';
  //     input.onchange = (event: any) => {
  //         const file = event.target.files[0];
  //         if (file) {
  //             const reader = new FileReader();
  //             reader.onload = () => {
  //                 const result = reader.result;
  //                 if (result) {
  //                     this.photo = result as string;
  //                 } else {
  //                     console.error('Error al leer el archivo');
  //                 }
  //             };
  //             reader.readAsDataURL(file);
  //         }
  //     };
  //     input.click();
  // }
  selectPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
          const result = reader.result;
          if (result) {
            const modal = await this.modalCtrl.create({
              component: PreviewModalComponent,
              componentProps: { photo: result as string },
            });
            await modal.present();
          } else {
            console.error('Error al leer el archivo');
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

    savePhoto() {
      if (!this.file) {
        alert('No hay foto seleccionada');
        return;
      }

    const userId = this.authService.getUsuario()?.id;
    if (!userId) {
      alert('Usuario no autenticado');
      return;
    }

    this.authService.updatePhoto(userId, this.file).subscribe({
      next: (response) => {
        alert('Foto actualizada correctamente');
        console.log(response);
      },
      error: (error) => {
        console.error('Error al actualizar la foto', error);
        alert('Error al actualizar la foto');
      },
    });
  }
  
    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.photo = e.target.result; // Actualiza la URL de la foto con la nueva imagen seleccionada
        };
        reader.readAsDataURL(file);
      }
    }
  ngOnInit() {
    this.fechaActual = this.generarFechaActual();
    this.usuario = this.authService.getUsuario();
    
  }
    // Función para generar la fecha en formato YYYY-MM-DD en la zona horaria local
    generarFechaActual(): string {
      const fecha = new Date();
      const anio = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
      const dia = String(fecha.getDate()).padStart(2, '0');
      return `${anio}-${mes}-${dia}`;
    }
    
    
}
