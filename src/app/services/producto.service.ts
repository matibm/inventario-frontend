import { ClienteModalService } from './../components/cliente-modal/cliente-modal.service';
import { URL_SERVICIOS } from './../config/global';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public oculto = ''
  public notificacion = new EventEmitter<any>();
  constructor(
    private http: HttpClient,
    private _clienteModalService: ClienteModalService
  ) { }

  eliminarProducto(id) {
    let url = URL_SERVICIOS + '/producto/' + id;

    return this.http.delete(url).pipe(map((resp: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado correctamente',
        showConfirmButton: false,
        timer: 1500
      });

      return resp;
    }));
  }

  getProductos(desde) {
    let url = URL_SERVICIOS + '/producto?desde=' + desde;
    return this.http.get(url);
  }

  getProductosPromise() {
    let url = URL_SERVICIOS + '/producto/all'
    return this.http.get(url).toPromise();
  }

  getProductoById(id) {
    let url = URL_SERVICIOS + '/producto/' + id;
    return this.http.get(url).toPromise();
  }
  editarProducto(producto) {
    let url = URL_SERVICIOS + '/producto/' + producto._id;

    return this.http.put(url, producto).pipe(map((resp: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        showConfirmButton: false,
        timer: 1500
      });

      return true;
    }));
  }

  crearProducto(producto) {

    let url = URL_SERVICIOS + '/producto';

    return this.http.post(url, producto).pipe(map((resp: any) => {

      Swal.fire({
        icon: 'success',
        title: 'Producto creado correctamente',
        showConfirmButton: false,
        timer: 1500
      });

      return true;
    }));
  }
  actualizarProducto(producto) {
    console.log(producto);

    let url = URL_SERVICIOS + '/producto/' + producto._id;

    return this.http.put(url, producto).pipe(map((resp: any) => {
      // console.log(resp);
      this.notificacion.emit()
      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado correctamente',
        showConfirmButton: false,
        timer: 1500

      });

      return resp;
    }));
  }
  decrementarProducto(arrObj) {
    console.log("decrementando");

    let url = URL_SERVICIOS + '/producto/decrementar';

    return this.http.put(url, arrObj).toPromise().then((resp: any) => {

      if (resp.ok == false) {
        let str = "";
        for (let i = 0; i < resp.productos.length; i++) {
          const producto = resp.productos[i];
          str += ' ' + producto.marca + " " + producto.precio + " -";

        }
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar ventas',
          text: `por favor verifique los siguientes productos que se vendieron:${str}`,
          showConfirmButton: true
        });
        this.notificacion.emit(resp)
        return resp;
      } else {
        if (!this._clienteModalService.imprimir) {
          Swal.fire({
            icon: 'success',
            title: 'Venta Realizada',
            showConfirmButton: false,
            timer: 1500

          });
        }
        this.notificacion.emit(resp)
        return resp;
      }
    });
  }
  getProductosFaltantes(desde) {
    let url = URL_SERVICIOS + '/producto/faltantes?desde=' + desde;
    return this.http.get(url);
  }

  buscarProductos(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/producto/' + termino;
    return this.http.get(url).toPromise().then((resp: any) => {
      return resp.productos
    })
  }

  getProductosPorProveedor(id) {
    let url = URL_SERVICIOS + '/producto/proveedor/' + id;
    return this.http.get(url).toPromise();
  }

  saveMultiple(list){
    let url = URL_SERVICIOS + '/producto/multiple'  ;
    return this.http.put(url, list).toPromise();
  }

}
