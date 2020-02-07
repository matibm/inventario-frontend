import { URL_SERVICIOS } from './../config/global';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import Swal  from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    private http: HttpClient
  ) { }

  getProducto() {

  }

  getProductos(desde) {
    let url = URL_SERVICIOS + '/producto';
    return this.http.get(url);
  }

  editarProducto(producto){
    let url = URL_SERVICIOS + '/producto/' + producto._id;
    
    return this.http.put(url, producto).pipe(map((resp: any) => {
      
      
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: true
      });

      return true;
    }));
  }

  

  buscarProductos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/producto/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.productos
    }))
  }


}
