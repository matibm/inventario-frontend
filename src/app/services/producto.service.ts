import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import Swal  from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public notificacion = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) { }

  getProducto() {

  }

  eliminarProducto(id){
    let url = URL_SERVICIOS + '/producto/' +id  ;
    
    return this.http.delete(url).pipe(map((resp: any) => {
            
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado correctamente',
        showConfirmButton: true
      });

      return resp;
    }));
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

  crearProducto(producto){

    let url = URL_SERVICIOS + '/producto' ;
    
    return this.http.post(url, producto).pipe(map((resp: any) => {
            
      Swal.fire({
        icon: 'success',
        title: 'Producto creado correctamente',
        showConfirmButton: true
      });

      return true;
    }));
  }
  actualizarProducto(producto){

    let url = URL_SERVICIOS + '/producto/' +producto._id  ;
    
    return this.http.put(url, producto).pipe(map((resp: any) => {
            
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado correctamente',
        showConfirmButton: true
      });

      return resp;
    }));
  }
  decrementarProducto(arrObj){

    let url = URL_SERVICIOS + '/producto/decrementar'  ;
    
    return this.http.put(url, arrObj).pipe(map((resp: any) => {
            
      Swal.fire({
        icon: 'success',
        title: 'Venta Realizada',
        showConfirmButton: true
      });
      this.notificacion.emit(resp)
      return resp;
    }));
  }

  buscarProductos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/producto/' + termino;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.productos
    }))
  }


}
