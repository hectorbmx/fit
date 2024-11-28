import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { IonHeader, IonToolbar, IonTitle,IonMenu, IonContent,
  IonAccordion,IonChip,IonButtons,IonAccordionGroup,IonMenuButton,IonCardContent,IonButton,
  IonCard,IonCardHeader,IonAvatar,IonCardTitle,IonItem ,IonDatetime,IonCardSubtitle,IonThumbnail,IonInput
    ,IonLabel,IonList} from '@ionic/angular/standalone';
@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss'],
  standalone: true,
  imports: [IonHeader,IonToolbar,IonTitle,IonButtons,IonButton,IonContent ],
})
export class PreviewModalComponent {
  @Input() photo: string = ''; // Recibe la foto desde el componente principal

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  dismiss() {
    // Cierra el modal
    this.modalCtrl.dismiss();
  }

  savePhoto() {
    // Lógica para guardar la foto
    const userId = localStorage.getItem('user_id'); // Obtén el ID del usuario desde el almacenamiento local o servicio
    if (userId && this.photo) {
      const formData = new FormData();
      formData.append('foto', this.dataURItoBlob(this.photo));

      this.http.post(`http://127.0.0.1:8000/api/users/${userId}/update-photo`, formData).subscribe(
        (response) => {
          console.log('Foto guardada exitosamente:', response);
          this.dismiss();
        },
        (error) => {
          console.error('Error al guardar la foto:', error);
        }
      );
    }
  }

  private dataURItoBlob(dataURI: string): Blob {
    // Convierte la base64 a un Blob
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: mimeString });
  }
}
