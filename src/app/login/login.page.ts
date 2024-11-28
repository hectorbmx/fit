import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,FormsModule, } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

import { 
  IonContent, IonHeader, IonButton, IonItem, IonLabel, 
  IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent ,IonAlert
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonButton, IonTitle, IonLabel,IonAlert,
    IonItem, IonToolbar, CommonModule, ReactiveFormsModule,FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  username: any =null;
  password: any =null;
  alertButtons = [
    {
      text: 'OK',
      role: 'cancel',
      handler: () => {
        console.log('Alert closed');
      },
    },
  ];

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const loginData = this.loginForm.value; // Extrae los datos del formulario reactivo

    // Hacer la solicitud POST al backend
    this.http.post('http://127.0.0.1:8000/api/login', loginData).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        localStorage.setItem('token', response.token); // Guarda el token
        this.authService.setUsuario(response.user); // Guarda los datos en el servicio
        this.router.navigate(['/home']); // Redirige a la página de inicio
      },
        (error) => {
          console.error('Error de autenticación:', error);
          // alert('Error de autenticación. Verifica tus credenciales.');
          if (error.status === 401) { alert('Contraseña incorrecta. Por favor, verifica tu contraseña.'); } else if (error.status === 404) { alert('Usuario no encontrado. Por favor, verifica tu email.'); } else { alert('Error de autenticación. Verifica tus credenciales.'); }
        }
      );
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',
      duration: 3000,
    });

    loading.present();
  }
    // Método para mostrar el alert manualmente (si lo deseas)
    async presentAlert() {
      const alert = await this.alertController.create({
        header: 'Invalid Credentials',
        subHeader: 'Please check your username and password.',
        message: 'The credentials entered are incorrect.',
        buttons: this.alertButtons,
      });
  
      await alert.present();
    }
    onLogin() {
      if (this.username !== 'correctUsername' || this.password !== 'correctPassword') {
        this.presentAlert();
      } else {
        // Lógica de login exitoso
      }
}
goToRegister() {
  // Redirige al formulario de registro
  this.router.navigate(['/register']); // Cambia '/register' al path de tu pantalla de registro
}
}