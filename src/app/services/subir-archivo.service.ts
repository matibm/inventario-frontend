import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File) {
    
    return new Promise((resolve, reject) => {
      console.log("test");
      
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      console.log(archivo);
      
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("imagen subida");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("Fallo la subida");
            reject(xhr.response);
          }
        }
      }
      let url = URL_SERVICIOS + '/upload';
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }



}


