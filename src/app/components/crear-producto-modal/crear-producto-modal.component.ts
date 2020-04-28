import { ProductoService } from './../../services/producto.service';
import Swal from 'sweetalert2';
import { SubirArchivoService } from './../../services/subir-archivo.service';
import { CrearProductoModalService } from './crear-producto-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-producto-modal',
  templateUrl: './crear-producto-modal.component.html',
  styleUrls: ['./crear-producto-modal.component.scss']
})
export class CrearProductoModalComponent implements OnInit {
  nombreImagen
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _crearProductoModalService: CrearProductoModalService,
    private _subirArchivoService: SubirArchivoService,
    private _productoService: ProductoService
  ) { }

  ngOnInit() {
  }

  registrar(f) {
    if (this.imagenSubir) {


      this._subirArchivoService.subirArchivo(this.imagenSubir)
        .then((resp: any) => {

          // Swal.fire('Imagen subida correctamente','', 'success')
          //   this._crearProductoModalService.notificacion.emit(resp);
          this.nombreImagen = resp.nombreArchivo
          var form = document.getElementById("myFormNewProduct");
          function handleForm(event) { event.preventDefault(); }
          form.addEventListener('submit', handleForm);

          let producto = {
            marca: f.value.marca,
            modelo: f.value.modelo,
            codigo: f.value.codigo,
            precio: f.value.precio,
            precioBruto: f.value.precioBruto,
            descuento: f.value.descuento,
            stock: f.value.cantidad,
            img: this.nombreImagen
          }

          this._productoService.crearProducto(producto).subscribe(resp => {
            this._crearProductoModalService.notificacion.emit(resp)
            this._crearProductoModalService.ocultarModal()
          })

        }).catch(err => {
          Swal.fire('Error al subir la imagen', err.mensaje, 'error');
          this._crearProductoModalService.ocultarModal();

        })
    } else {
      var form = document.getElementById("myFormNewProduct");
      //function handleForm(event) { event.preventDefault(); }
      form.addEventListener('submit', this.handleForm);

      let producto = {
        marca: f.value.marca,
        modelo: f.value.modelo,
        codigo: f.value.codigo,
        precio: f.value.precio,
        precioBruto: f.value.precioBruto,
        descuento: f.value.descuento,
        stock: f.value.cantidad

      }

      this._productoService.crearProducto(producto).subscribe(resp => {
        this._crearProductoModalService.notificacion.emit(resp)
        this._crearProductoModalService.ocultarModal()
      })
    }

  }
  handleForm(event) { event.preventDefault(); }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire('Solor imagenes', "El archivo seleccionado no es una imagen", 'error')
      this.imagenSubir = null
      return
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir)
      .then((resp: any) => {

        // Swal.fire('Imagen subida correctamente','', 'success')
        this._crearProductoModalService.notificacion.emit(resp);
        this.nombreImagen = resp.nombreArchivo
        //   this._crearProductoModalService.ocultarModal();

      }).catch(err => {
        Swal.fire('Error al subir la imagen', err.mensaje, 'error');
        this._crearProductoModalService.ocultarModal();

      })
  }


}
