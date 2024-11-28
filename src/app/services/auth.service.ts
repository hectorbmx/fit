
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; // Asegúrate de tener la URL base en el archivo de configuración.
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuario: any = null;
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL base del backend

  constructor(private http: HttpClient)  {
    // Recuperar el usuario almacenado en LocalStorage al inicializar el servicio
    const storedUsuario = localStorage.getItem('usuario');
    this.usuario = storedUsuario ? JSON.parse(storedUsuario) : null;
  }

  setUsuario(usuario: any) {
    this.usuario = usuario;
    // Almacenar el usuario en LocalStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  // Método para actualizar la foto del usuario
  // Método para actualizar la foto del usuario
  updatePhoto(userId: number, photo: File) {
    const formData = new FormData();
    formData.append('foto', photo); // Nombre del campo en el backend
    return this.http.post(`${this.apiUrl}/users/${userId}/update-photo`, formData);
  }
  getUsuario() {
    return this.usuario;
  }

  clearUsuario() {
    this.usuario = null;
    // Eliminar el usuario de LocalStorage
    localStorage.removeItem('usuario');
  }
  isAuthenticated(): boolean {
     return !!localStorage.getItem('token'); }
}
