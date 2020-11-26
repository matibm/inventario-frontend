import { RecargaService } from './../../services/recarga.service';
import { ProductoService } from './../../services/producto.service';
import { ReabastecerService } from './reabastecer.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone, Renderer2, Input, Directive, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reabastecer',
  templateUrl: './reabastecer.component.html',
  styleUrls: ['./reabastecer.component.scss']
})

  
export class ReabastecerComponent implements OnInit, AfterViewInit {
  constructor(
    public _reabastecerService: ReabastecerService,
    public _productoService: ProductoService,
    public _recargaService: RecargaService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) { }

  producto: any
  productos
  configRecarga = true; 
  recarga


  lista = []
  ngOnInit() {
    this._reabastecerService.opened.subscribe(() => {

      setTimeout(() => {
        this.setFocus()
      }, 0);
    })
  }

  crearRecarga(nfactura, comentario){
    this.recarga = {
      nfactura: nfactura,
      comentario: comentario,
      productos: [],
      fecha: null,
      monto: 0
    }
    this.configRecarga = false;
  }

  ngAfterViewInit() {
    // this.setFocus(); // If the button is already present...
    // this.durationButton.changes.subscribe(() => {
    //   this.setFocus();
    // });
  }
  @ViewChildren("input1") inputSearch: QueryList<ElementRef>;
  @ViewChildren("cantidad") cantidad: QueryList<ElementRef>;


  // @ViewChild("input1", { static: true }) nameField: ElementRef;
  // focusBuscador(): void {
  //   this.nameField.nativeElement.focus();
  // }

  setFocus() {

    setTimeout(() => {
    if (this.inputSearch.length > 0) {

      this.inputSearch.first.nativeElement.focus();
    }  
    }, 0);
    
  }
  focusCantidad() {
    setTimeout(() => {
      console.log(this.cantidad);

      if (this.cantidad.length > 0) {

        this.cantidad.first.nativeElement.focus();
      }
    }, 0);


  }



  async buscarProducto(termino) {
    let productos = await this._productoService.buscarProductos(termino)
    console.log(productos);

    this.productos = productos
    if (productos.length == 1) {
      let producto = productos[0]
      if (termino === producto.codigo) {
        this.producto = producto
      }
    } else {
      let producto
      productos.forEach(productoAux => {
        if (productoAux.codigo === termino) {
          producto = productoAux
        }
      });
      this.producto = producto;


    }

    if (this.producto) {
     
        this.focusCantidad()

    
      this.productos = null;
    }
  }


  quitar(producto) {
    for (let index = 0; index < this.lista.length; index++) {
      const element = this.lista[index];
      if (element.codigo == producto.codigo) {
        let aux = index + 1
        this.lista.splice(index, aux);
      }
    }
  }
  pushALista(cant) {
    this.producto.cantidad = parseInt(cant)
    this.lista.push(this.producto)
    this.producto = null;
    this.productos = null;
       this.setFocus()
 
  }


  async guardarTodo() {
    let msg = await this._productoService.saveMultiple(this.lista)
    console.log(msg);
    this.recarga.productos = this.lista
    this.recarga.fecha = new Date().valueOf();
    let cant = 0
    for (let i = 0; i < this.lista.length; i++) {
      const item = this.lista[i];
      cant += item.precio;
    }
    this.recarga.monto = cant
    await this._recargaService.crearRecarga(this.recarga)
    this.cerrar()
    
    Swal.fire({
      icon: 'success',
      title: 'Productos actualizados correctamente',
      showConfirmButton: false,
      timer: 1500
    });
    
  }

  selectItem(item) {

    this.producto = item
    this.focusCantidad()
  }

  cerrar(){
    this.producto = null;
    this.lista = [];
    this.recarga = null;
    this.productos = null;
    this._reabastecerService.ocultarModal()
  }
}
