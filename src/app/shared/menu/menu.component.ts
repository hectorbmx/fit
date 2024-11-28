import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,IonList,IonItem,IonButtons,IonMenuButton } from '@ionic/angular/standalone';
import { MenuController  } from '@ionic/angular'; // Asegúrate de importar esto
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [IonMenu, IonHeader, IonToolbar, IonTitle, IonContent,IonList,IonItem,IonButtons,IonMenuButton,RouterModule],


})
export class MenuComponent  implements OnInit {

  @ViewChild(IonMenu) menu!: IonMenu; // Referencia al menú

  constructor(
    private router: Router, 
    private authService: AuthService,
    private menuController: MenuController  // Inyecta el servicio de menú
  ) {}

  logout() {
    localStorage.clear(); // Elimina el token y otros datos
    this.authService.setUsuario(null); // Limpia el usuario actual
    this.router.navigate(['/login']); // Redirige al login
    
    this.menu.close();
  }
  closeMenu() {
    this.menuController.close(); // Cierra el menú cuando se hace clic en una opción
  }
   // Función para verificar si el clic está funcionando
  
  goToProfile() {
    
    this.router.navigate(['/profile']); // Navega a la ruta de perfil
    this.closeMenu(); // Cierra el menú
  }
  goToHome() {
    
    this.router.navigate(['/home']); // Navega a la ruta de perfil
    this.closeMenu(); // Cierra el menú
  }
  
  ngOnInit() {}

}
