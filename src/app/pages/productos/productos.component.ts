import { ImprimirFacturaService } from 'src/app/components/imprimir-factura/imprimir-factura.service';
import { ClienteModalService } from './../../components/cliente-modal/cliente-modal.service';
import Swal from 'sweetalert2';
import { CajaModalService } from './../../components/caja-modal/caja-modal.service';
import { CrearProductoModalService } from './../../components/crear-producto-modal/crear-producto-modal.service';
import { EditarProductoModalService } from './../../components/editar-producto-modal/editar-producto-modal.service';
import { CierreCajaService } from './../../services/cierre-caja.service';
import { FacturaService } from './../../services/factura.service';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})



export class ProductosComponent implements OnInit {
  @ViewChild("input", { static: true }) nameField: ElementRef;
  editName(): void {
    this.nameField.nativeElement.focus();
  }

  @HostListener('document:keypress', ['$event'])
  teclaEvento(event:KeyboardEvent){
    console.log(event);
    

  }

  @HostListener('window:afterprint')
  onafterprint() {
    this._productoService.oculto = ''
    setTimeout(() => {
      this.nameField.nativeElement.focus();
      
    }, 500);

    // Swal.fire({
    //   icon: 'success',
    //   title: 'Venta Realizada',
    //   showConfirmButton: true
    // }); 
    this.readEscape = true;


    
  }
  readEscape = false;
  inputbuscador
  productos
  diableVender = false
  decremento: any[] = new Array
  items: any[] = new Array
  constructor(public _productoService: ProductoService,
    public _editarProductoModalService: EditarProductoModalService,
    private _cierreCajaService: CierreCajaService,
    private _cierreCajaModalService: CajaModalService,
    public _crearProductoModalService: CrearProductoModalService,
    private _facturaService: FacturaService,
    public _clienteModalService: ClienteModalService,
    public  _imprimirFacturaService: ImprimirFacturaService

  ) { }
  desde
  cantidad = 1;
  //cantidad
  total = 0
  descuentoForAll = false;
  vuelto = 0
  factura
  inversion
  ingresoInput
  ngOnInit() {
    this.nameField.nativeElement.focus();
    
    // this.cargarProductos()
    this._editarProductoModalService.notificacion.subscribe(resp => this.cargarProductos())
    this._crearProductoModalService.notificacion.subscribe(resp => this.cargarProductos())
    this._productoService.notificacion.subscribe(resp => {
      this.items = new Array
      this.factura = null
      this.ingresoInput = null
      this.total = 0
      this.vuelto = 0
      this.decremento = new Array
      // this.cargarProductos();

    })

  }

  quitar(producto) {
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.codigo == producto.codigo) {
        let aux = index + 1
        this.items.splice(index, aux);
        let auxtotal = element.precio * element.cantidad
        this.total -= auxtotal
      }
    }

    for (let i = 0; i < this.productos.length; i++) {
      const prod = this.productos[i];
      if (producto._id === prod._id) {
        this.productos[i].stock += producto.cantidad

      }

    }
  }

  ingreso(ing) {
    let vueltoAux = 0;
    vueltoAux = ing - this.total
    if (vueltoAux >= 0 && ing) {
      this.vuelto = vueltoAux;
      // this.diableVender = false
    } else {
      this.vuelto = 0;
      // this.diableVender = true
    }
  }

  cargarProductos() {
    //  this.cargando = true;
    this._productoService.getProductos(this.desde).subscribe((resp: any) => {
      //// console.log(resp);

      this.inversion = 0;
      this.productos = resp.productos.reverse();
      for (let index = 0; index < this.productos.length; index++) {
        const producto = this.productos[index];
        this.inversion += producto.precioBruto;
      }
      //  this.cargando = false;
    })
  }

  buscarProducto(termino: string) {
    this.productos = [];
    if (termino.length <= 0) {
      // this.cargarProductos();
      return;
    }
    this._productoService.buscarProductos(termino).subscribe((productos) => {
      this.productos = productos

      if (productos.length == 1) {


        let producto = productos[0]


        if (termino === producto.codigo) {
          console.log("encontro", producto);

          this.selecctionarItem(producto, "1")
          this.playSound()
          
          this.inputbuscador = ''

        }
      }
    })
  }

  selecctionarItem(producto, cant) {
    let noagregarmas = false;
    let numeroC
    let id_producto = producto._id;
    console.log("recien se imprime en la segunda vez que se selecciona un mismo item en la primera solo hace array.push()");


    if (this.items[0]) { // recien se imprime en la segunda vez que se selecciona un mismo item en la primera solo hace array.push()
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]._id == id_producto) {
          numeroC = this.items[i].cantidad;
          console.log("numeroC antes de la suma", numeroC);

        }
      }
    }

    producto.cantidad = parseInt(cant) // con este codigo aca funciona como tiene que ser

    for (let i = 0; i < this.items.length; i++) {

      if (this.items[i]._id == producto._id) {
        let numeroA = this.items[i].cantidad;
        let numeroB = producto.cantidad;

        console.log("numeroA antes de la suma", numeroA);
        console.log("numeroB antes de la suma", numeroB);

        numeroC += numeroB;

        console.log("numeroA despues de la suma", numeroA);
        console.log("numeroB despues de la suma", numeroB);

        this.items[i].cantidad = numeroC;
        console.log("cantidad en el arreglo", this.items[i].cantidad);

        noagregarmas = true;
      }
    }


    if (producto.stock < cant) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad seleccionada supera el stock',
        showConfirmButton: true
      });

      return
    }

    if (producto.cantidad <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad seleccionada no puede ser menor a 1',
        showConfirmButton: true
      });

      return
    }




    for (let i = 0; i < this.productos.length; i++) {
      const prod = this.productos[i];
      if (producto._id === prod._id) {
        this.productos[i].stock -= parseInt(cant)

      }

    }

    if (!noagregarmas) {
      this.items.push(producto)
      let obj = {
        id: producto._id,
        cantidad: cant
      }
      this.decremento.push(obj)
    }


    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      for (let j = 0; j < this.decremento.length; j++) {
        const itemDec = this.decremento[j];
        if (item._id == itemDec._id) {

          this.decremento[i].cantidad = item.cantidad;

        }
      }

    }


    this.total += cant * producto.precio
    console.log(this.items[0]);
    this.nameField.nativeElement.focus();


  }

  playSound = (function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    return function () {
      snd.play();
    }
  })();

  // seleccionarCantidad(cantidad) {
  //   this.cantidad = cantidad
  // }

  onCliente() {
    this._clienteModalService.oculto = ''
    
  }

  vender() {


    if (this.total <= 0 || !this.items) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo vender, Lista de carrito vacía',
        showConfirmButton: true
      });
      return

    }

    if (!this._cierreCajaModalService.cerrado) {
      let date = new Date()
      this.factura = {
        productos: this.items,
        fecha: date.getTime(),
        monto: this.total
      }
      let cierrecaja

      let id = localStorage.getItem('idCaja')
      if (id) {
        this._cierreCajaService.getCierreCaja(id).subscribe((resp: any) => {
          //// console.log(resp);

          cierrecaja = resp.cierreCaja
          cierrecaja.montoCierre += this.total
          cierrecaja.facturas.push(this.factura)
          this._cierreCajaService.putCierreCaja(cierrecaja).subscribe()

          this._facturaService.setFactura(this.factura).subscribe(() => {
            this.nameField.nativeElement.focus();

            this._productoService.decrementarProducto(this.decremento).subscribe()
              if (this._clienteModalService.imprimir) {
                this._productoService.oculto = 'oculto';
                this._imprimirFacturaService.mostrarFactura(this._clienteModalService.cliente, this.factura)
               setTimeout(() => {
                window.print() 
               }, 500);
                
              }
          })

        })
      }
    }

    else {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo vender, abre la caja primero',
        showConfirmButton: true
      });

    }

  }

  switchDescuento(descuento, index) {
    let item = this.items[index]
    let resto = item.precio - item.descuento

    if (descuento && document.getElementById('desc_' + item._id).className != 'ml-3 mt-3 btn btn-danger') {
      this.total -= (resto * item.cantidad)
      this.items[index].desc = true
      document.getElementById('desc_' + item._id).className = 'ml-3 mt-3 btn btn-danger'
      document.getElementById('normal_' + item._id).className = 'mt-1 btn btn-secondary'
    } else if (!descuento && document.getElementById('normal_' + item._id).className != 'mt-1 btn btn-success') {
      this.total += (resto * item.cantidad)
      document.getElementById('desc_' + item._id).className = 'ml-3 mt-3 btn btn-secondary'
      this.items[index].desc = false

      document.getElementById('normal_' + item._id).className = 'mt-1 btn btn-success'
    }

  }

  activarDescuentos(suich) {
    for (let i = 0; i < this.items.length; i++) {
      this.switchDescuento(suich, i)
    }
  }

  onToggle(resp) {
    this.descuentoForAll = resp;
    if (resp) {
      this.activarDescuentos(true)
    } if (!resp) {
      this.activarDescuentos(false)
    }

  }

  onKeyUp(event){
    console.log(event);
    
  }

}
