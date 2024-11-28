import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet,IonButtons,IonButton } from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './shared/menu/menu.component';
import { HttpClientModule  } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { PreviewModalComponent } from './preview-modal/preview-modal.component';
import { ModalController } from '@ionic/angular';


import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet,MenuComponent,RouterModule,IonButtons,IonButton,HttpClientModule,PreviewModalComponent],
  // imports: [IonApp, IonRouterOutlet, IonButtons, IonButton, RouterModule, PreviewModalComponent],  // Agrega el modal aquí

})
export class AppComponent implements OnInit{
  isAuthenticated = false;
  constructor(private authService: AuthService,) {}
  isAuthenticate(): boolean {
     return this.authService.isAuthenticated();
  }
  
  ngOnInit() {
    // Verifica si hay un usuario guardado
    this.isAuthenticated = !!this.authService.getUsuario();
    
  }
}
