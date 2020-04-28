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
  public notificacion = new EventEmitter<any>();

  oculto = 'oculto'
  constructor(
    private _subirArchivoService: SubirArchivoService,
    private _productoService: ProductoService
  ) {
    _productoService.getProducto()
  }

  ocultarModal() {
    this.oculto = 'oculto'
    this.imagenSubir = null
    this.imagenTemp = ''

  }

  guardar() {
    console.log(this.codigo);
    
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
            console.log(resp);
            
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
    this.id = producto._id
    this.marca = producto.marca
    this.modelo = producto.modelo
    this.cantidad = producto.stock
    this.codigo = producto.codigo
    this.precio = producto.precio
    this.precioBruto = producto.precioBruto
    this.descuento = producto.descuento
    this.img = producto.img || ''
    this.oculto = ''
    this.imagenTemp = producto.img || ''
  }
}
