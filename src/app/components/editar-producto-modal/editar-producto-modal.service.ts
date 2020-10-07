import { RecargaService } from './../../services/recarga.service';
import { LoginService } from './../login/login.service';
import Swal from 'sweetalert2';
import { SubirArchivoService } from './../../services/subir-archivo.service';
import { ProductoService } from './../../services/producto.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditarProductoModalService {
  marca
  codigo
  modelo
  precio
  precioBruto
  img
  descuento
  id
  cantidad
  imagenSubir
  imagenTemp
  agregarCantidad
  stock_antes_de_modificar
  comentario = ''
  public notificacion = new EventEmitter<any>();

  oculto = 'oculto'
  constructor(
    private _subirArchivoService: SubirArchivoService,
    private _productoService: ProductoService,
    public _loginService: LoginService,
    public _recargaService: RecargaService
  ) {   }

  ocultarModal() {
    console.log("ocultando");
    
    this.oculto = 'oculto'
    this.imagenSubir = null
    this.imagenTemp = ''
    this.agregarCantidad = null;
   }

  guardar() {
    if (!this._loginService.logued) {
      this.cantidad += this.agregarCantidad;
    }    
    var form = document.getElementById("amyFormEditProduct");
    function handleForm(event) { event.preventDefault(); }
    form.addEventListener('submit', handleForm);

    if (this.imagenSubir) {
      this._subirArchivoService.subirArchivo(this.imagenSubir)
        .then((resp: any) => {

          // Swal.fire('Imagen subida correctamente','', 'success')
          this.notificacion.emit(resp);
          this.img = resp.nombreArchivo

          let producto = {
            _id: this.id,
            marca: this.marca,
            modelo: this.modelo,
            codigo: this.codigo,
            precio: this.precio,
            precioBruto: this.precioBruto,
            stock: this.cantidad,
            descuento: this.descuento,
            img: this.img
          }

          //  console.log(marca, modelo, precio, codigo, precioBruto, cantidad);
          this._productoService.actualizarProducto(producto).subscribe(resp => {
            let recarga = {
              fecha : new Date().valueOf(),
              productoId: producto._id,
              cantidadASumar: this.cantidad - this.stock_antes_de_modificar,
              stockAnterior: this.stock_antes_de_modificar,
              marca: this.marca,
              tipo: this.modelo,
              comentario: this.comentario
            }

            this._recargaService.crearRecarga(recarga).subscribe()
            
            // this._recargaService.crearRecarga(recarga)
            this.ocultarModal()
            this.notificacion.emit(resp)

          })

          //   this._crearProductoModalService.ocultarModal();

        }).catch(err => {
          Swal.fire('Error al subir la imagen', err.mensaje, 'error');
          this.ocultarModal();

        })
    } else {
      let producto = {
        _id: this.id,
        marca: this.marca,
        modelo: this.modelo,
        codigo: this.codigo,
        precio: this.precio,
        precioBruto: this.precioBruto,
        stock: this.cantidad,
        descuento: this.descuento,
        img: this.imagenTemp
      }

      this._productoService.actualizarProducto(producto).subscribe(resp => {
        this.ocultarModal()
        this.notificacion.emit(resp)
        let recarga = {
          fecha : new Date().valueOf(),
          productoId: producto._id,
          cantidadASumar: this.cantidad - this.stock_antes_de_modificar,
          stockAnterior: this.stock_antes_de_modificar,
          marca: this.marca,
          tipo: this.modelo,
          comentario: this.comentario
        }
        this._recargaService.crearRecarga(recarga).subscribe()

      })

    }


  }

  eliminarProducto() {
    this._productoService.eliminarProducto(this.id).subscribe(resp => {

      this.notificacion.emit(resp);
      this.ocultarModal()
    })
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.img = null;
      return
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solor imagenes', "El archivo seleccionado no es una imagen", 'error')
      this.imagenSubir = null
      return
    }

    this.imagenSubir = archivo;

    //this.imagenTempFile = archivo
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir)
      .then((resp: any) => {

        // Swal.fire('Imagen subida correctamente','', 'success')
        this.notificacion.emit(resp);
        this.img = resp.nombreArchivo

        //   this._crearProductoModalService.ocultarModal();

      }).catch(err => {
        Swal.fire('Error al subir la imagen', err.mensaje, 'error');
        this.ocultarModal();

      })
  }

  mostarModal(producto) {
    console.log("mostrando");
    
      this.id = producto._id
      this.marca = producto.marca
      this.modelo = producto.modelo
      this.cantidad = producto.stock
      this.stock_antes_de_modificar = producto.stock
      this.codigo = producto.codigo
      this.precio = producto.precio
      this.precioBruto = producto.precioBruto
      this.descuento = producto.descuento
      this.img = producto.img || ''
      this.oculto = ''
      this.imagenTemp = producto.img || ''  
    // }else{
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Inicia sesion para esta accion',
    //     showConfirmButton: true
    //   });
    // }
    
  }
}
