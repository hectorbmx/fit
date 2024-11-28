import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle,IonMenu,
        IonDatetime,IonModal,
        IonContent,IonAccordion,IonChip,IonButtons,
        IonAccordionGroup,IonMenuButton,IonCard,IonBadge,
        IonCardHeader,IonAvatar,IonCardTitle,IonItem,IonDatetimeButton,IonButton
          ,IonLabel,IonList} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { EntrenoService } from '../services/entreno-service.service';
import { CommonModule } from '@angular/common'; // Importa el CommonModule
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Importa RouterModule



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule ,IonHeader, IonToolbar, IonTitle,IonDatetimeButton,IonBadge,IonButton,
            IonContent,IonButtons,IonList,IonDatetime,IonModal,
            IonMenuButton,IonCard,IonAccordion,
            IonCardHeader,IonAvatar,IonCardTitle,IonChip,
            IonItem,IonLabel,IonAccordionGroup,IonMenu,RouterModule
            // Asegúrate de incluirlo aquí
    ],
})
export class HomePage implements OnInit {
  photo: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'; // URL inicial de la foto

  fechaActual: string="";
  usuario: any;
  noEntreno:any = null;
  entreno: any = null; // Aquí se almacenará el entrenamiento obtenido
  isModalOpen: boolean = false; // Controla la apertura del modal

  // constructor(private authService: AuthService) {}
  constructor(
    private authService: AuthService, 
    private entrenoService: EntrenoService,
    private router: Router) {}
  


  ngOnInit() {
    this.fechaActual = this.generarFechaActual();
    this.usuario = this.authService.getUsuario();
    this.obtenerEntrenoDelDia();

  }
  
  obtenerEntrenoDelDia() {
    const hoy = this.generarFechaActual();
  
    this.entrenoService.getEntrenoPorFecha(hoy).subscribe({
      next: (data) => {
        this.entreno = data;
        this.noEntreno = false; // Hay entreno
      },
      error: (err) => {
        console.error('Error al obtener el entrenamiento', err);
        this.entreno = null;
        this.noEntreno = true; // No hay entreno
      },
    });
  }
  
  // Función para generar la fecha en formato YYYY-MM-DD en la zona horaria local
  generarFechaActual(): string {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses van de 0-11
    const dia = String(fecha.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
  }
  logout() {
    localStorage.clear(); // Elimina el token y otros datos
    this.authService.setUsuario(null); // Limpia el usuario actual
    this.router.navigate(['/login']); // Redirige al login
  }

    // Abre el modal
    abrirModalDatePicker() {
      this.isModalOpen = true;
    }
  
    // Cierra el modal
    cerrarModal(event?: any) {
      this.isModalOpen = false;
    }
  
    // Maneja la fecha seleccionada
    onFechaSeleccionada(event: any) {
      const fechaSeleccionada = event.detail.value; // Obtén la fecha seleccionada
      this.fechaActual = event.detail.value; // Actualiza la fecha
   
      
      this.entrenoService.getEntrenoPorFecha(fechaSeleccionada).subscribe({
        next: (data) => {
          this.entreno = data;
          this.noEntreno = false; // Hay entreno
        },
        error: (err) => {
          console.error('Error al obtener el entrenamiento', err);
          this.entreno = null;
          this.noEntreno = true; // No hay entreno
        },
      });
      this.cerrarModal(); // Cierra el modal después de seleccionar
    }
  
}