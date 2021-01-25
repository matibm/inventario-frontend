import { ClienteService } from './../../services/cliente.service';
import { UsuarioService } from './../../services/usuario.service';
import { navBarService } from './../../services/navbar.service';
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
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})



export class ProductosComponent implements OnInit {
  @ViewChild("input", { static: true }) nameField: ElementRef;
  editName(): void {
    // this.nameField.nativeElement.focus();

  }

  permitirBuscarConEnter = true;
  @HostListener('document:keypress', ['$event'])
  teclaEvento(event: KeyboardEvent) {
    if (this.permitirBuscarConEnter && event.key == 'Enter' && event.shiftKey == false) {
      this.buscarProductoConEnter(this.termino)

      this.termino = ''
    } else if (event.key == 'Enter' && event.shiftKey == true) {

      this.editName()
    }

    else {
      this.termino += event.key


    }
    setTimeout(() => {
      this.termino = ''

    }, 4000);

  }

  @HostListener('window:afterprint')
  onafterprint() {

  }
  permitirmodificarprecio
  mostrarAvisoCumpleno = true;
  usuarios
  showSelectUser = false;
  vendedorSeleccionado 
  dateACobrar = new Date();
  stringDateACobrar = ''
  usuario
  termino = ''
  permitirbuscar = true;
  busquedaDinamica = false;
  pagina = 0;
  readEscape = false;
  inputbuscador = '';
  debiendo = false;
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
    public _imprimirFacturaService: ImprimirFacturaService,
    public _navBarService: navBarService,
    public _loginService: LoginService,
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService
  ) { }
  nav
  desde = 0;
  cantidad = 1;
  //cantidad
  total = 0
  descuentoForAll = false;
  vuelto = 0
  costo = 0
  factura
  inversion
  ingresoInput
  vendiendo = true;
  cumpleaneros
  facturasSinCobrar
  mostrarFacturasACobrar = false;
  prb(event){
    console.log(event);
    
  }
  ocultarAvisoCumple(){
    let today = new Date()
    localStorage.setItem('birthday', `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    this.mostrarAvisoCumpleno = false;
  }
  ocultarAvisoCobro(){
    let today = new Date()
    localStorage.setItem('fechaCobro', `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    this.mostrarFacturasACobrar = false;
  }
  async ngOnInit() {  
    this._navBarService.navBgColor = 'bg-primary'
    // this.nameField.nativeElement.focus();
    this.usuario = this._loginService.user;
    ////this.editName()
    this.vendedorSeleccionado = this._loginService.user
    console.log(this.vendedorSeleccionado);
    
    this.cargarProductos()
    this._editarProductoModalService.notificacion.subscribe(resp => this.cargarProductos())
    this._crearProductoModalService.notificacion.subscribe(resp => this.cargarProductos())
    this._productoService.notificacion.subscribe(resp => {
     
      this.cargarProductos();

    })

    this.usuarios = await this._usuarioService.getUsers();
    let respcumple = await this._clienteService.getCumpleanero() 
    
    let ls = localStorage.getItem('birthday')
     
    if (ls) {
      let dateLS = new Date(ls)
      if (dateLS.getDate() == new Date().getDate() && dateLS.getMonth() == new Date().getMonth()) {
        this.mostrarAvisoCumpleno = false;
      }  else{
        this.mostrarAvisoCumpleno = respcumple.haycumple
      }
    }
    let lsCobro = localStorage.getItem('fechaCobro')
     
    if (lsCobro) {
      let dateLS = new Date(ls)
      if (dateLS.getDate() == new Date().getDate() && dateLS.getMonth() == new Date().getMonth()) {
        this.mostrarFacturasACobrar = false;
      }  else{        
        this.facturasSinCobrar =  await this._facturaService.getFacturasParaCobro()
        this.mostrarFacturasACobrar = this.facturasSinCobrar.length > 0 ? true : false
      }
    } else{
      this.facturasSinCobrar =  await this._facturaService.getFacturasParaCobro()
        this.mostrarFacturasACobrar = this.facturasSinCobrar.length > 0 ? true : false
    }
   
    // console.log();
    

    this.cumpleaneros = respcumple.clientes
  }

  quitar(producto) {
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.codigo == producto.codigo) {
        let aux = index + 1
        this.items.splice(index, 1);
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
    ////this.editName();
  }

  cambiarDesde(num) {
    this.desde += num;
    this.pagina = Math.abs(this.desde / num)

    if (this.pagina < 0) {
    }
    this.cargarProductos()
    //this.editName();
  }

  ingreso(ing) {
    let vueltoAux = 0;
    this.vuelto = 0

    vueltoAux = ing - this.total
    if (vueltoAux >= 0 && ing) {
      this.vuelto = vueltoAux;
      this.vendiendo = false
    } else {
      this.vuelto = 0;
      this.diableVender = true
    }
  }

  irA(pagina) {
    if (this.desde < 1) {
      this.desde = 1;
    }
    this.desde = this.desde * pagina + 6;

    this.cambiarDesde(0)
  }
  cargarProductos() {
    //  this.cargando = true;
    this._productoService.getProductos(this.desde).subscribe((resp: any) => {
      //// // console.log(resp);
      //this.editName();
      this.inversion = 0;
      this.productos = resp.productos.reverse();
      for (let index = 0; index < this.productos.length; index++) {
        const producto = this.productos[index];
        this.inversion += producto.precioBruto;
      }
      //  this.cargando = false;
    })
  }

  pruebaSubmit() {
    console.log("submit funcionando");

  }

  async buscarProductoConEnter(termino: string) {
    this.inputbuscador = ''
    let inputb: any = document.getElementById('inputBuscador');
    inputb.value = ''
    this.nameField.nativeElement.value = null;

    if (termino.length <= 0) {

      // this.cargarProductos();
      return;
    }

    if (this.permitirbuscar == false) {
      return;
    }

    this.permitirbuscar = false;
    let productos = await this._productoService.buscarProductos(termino)
    this.permitirbuscar = true;
    this.productos = productos
    if (productos.length == 1) {
      let producto = productos[0]
      if (termino === producto.codigo) {

        let productoCarrito = this.getProductoOfCarrito(producto._id)
        if (productoCarrito) {
          if (productoCarrito.cantidad >= producto.stock) {
            Swal.fire({
              icon: 'error',
              title: 'Cantidad seleccionada supera el stock',
              showConfirmButton: true
            });
            return
          } else {
            this.selecctionarItem(producto, "1")

          }
        } else {
          this.selecctionarItem(producto, "1")

        }
      }
      // this.cargarProductos()

    } else {
      let producto
      productos.forEach(productoAux => {
        if (productoAux.codigo === termino) {
          producto = productoAux
        }
      });
      if (producto) {
        let productoCarrito = this.getProductoOfCarrito(producto._id)
        if (productoCarrito) {
          if (productoCarrito.cantidad >= producto.stock) {
            Swal.fire({
              icon: 'error',
              title: 'Cantidad seleccionada supera el stock',
              showConfirmButton: true
            });
            return
          } else {
            this.selecctionarItem(producto, "1")

          }
        } else {
          this.selecctionarItem(producto, "1")

        }
      }

      // this.cargarProductos()


    }



    //this.editName();


  }


  getProductoOfCarrito(id) {
    let producto
    this.items.forEach((prod: any) => {
      if (id === prod._id) {
        producto = prod
      }
    })
    return producto
  }

  onTypeBuscar(value) {
    if (this.busquedaDinamica == true) {
      this.buscarProducto(value)
    }
  }

  async buscarProducto(termino: string) {

    if (termino.length <= 0) {

      this.cargarProductos();
      return;
    }
    let productos = await this._productoService.buscarProductos(termino)

    this.productos = productos
    if (productos.length == 1) {
      let producto = productos[0]
      //   if (termino === producto.codigo) {

      //     let productoCarrito = this.getProductoOfCarrito(producto._id)
      //     if (productoCarrito) {
      //       if (productoCarrito.cantidad >= producto.stock) {
      //         Swal.fire({
      //           icon: 'error',
      //           title: 'Cantidad seleccionada supera el stock',
      //           showConfirmButton: true
      //         });
      //         return
      //       } else {
      //         this.selecctionarItem(producto, "1")

      //       }
      //     } else {
      //       this.selecctionarItem(producto, "1")

      //     }
      //   }
      //   // this.cargarProductos()

      // } else {
      //   let producto
      //   productos.forEach(productoAux => {
      //     if (productoAux.codigo === termino) {
      //       producto = productoAux
      //     }
      //   });

      //   let productoCarrito = this.getProductoOfCarrito(producto._id)
      //   if (productoCarrito) {
      //     if (productoCarrito.cantidad >= producto.stock) {
      //       Swal.fire({
      //         icon: 'error',
      //         title: 'Cantidad seleccionada supera el stock',
      //         showConfirmButton: true
      //       });
      //       return
      //     } else {
      //       this.selecctionarItem(producto, "1")

      //     }
      //   } else {
      //     this.selecctionarItem(producto, "1")

      //   }
      // this.cargarProductos()


    }




    //this.editName();
  }

  selecctionarItem(producto, cant, hab?) {
    let noagregarmas = false;
    let numeroC
    let id_producto = producto._id;

    if (this.items[0]) { // recien se imprime en la segunda vez que se selecciona un mismo item en la primera solo hace array.push()
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]._id == id_producto) {
          numeroC = this.items[i].cantidad;
          // console.log("numeroC antes de la suma", numeroC);

        }
      }

    }

    producto.cantidad = parseInt(cant) // con este codigo aca funciona como tiene que ser
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
    if (hab) {
      // this.editName()

    }
    for (let i = 0; i < this.items.length; i++) {

      if (this.items[i]._id == producto._id) {
        let numeroA = this.items[i].cantidad;
        let numeroB = producto.cantidad;

        numeroC += numeroB;

        this.items[i].cantidad = numeroC;

        noagregarmas = true;
      }
    }






    for (let i = 0; i < this.productos.length; i++) {
      const prod = this.productos[i];
      if (producto._id === prod._id) {
        this.productos[i].stock -= parseInt(cant)

      }

    }

    if (!noagregarmas) {
      this.items.unshift(producto)
      let obj = {
        id: producto._id,
        cantidad: cant
      }
      this.decremento.unshift(obj)
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
    // console.log(document.getElementById('inputBuscador'));
    //this.editName();

  }

  sumarTotal() {
    this.total = 0
    this.vuelto = 0
    for (let i = 0; i < this.items.length; i++) {
      const producto = this.items[i];
      this.total += producto.cantidad * producto.precio
    }

  }

  playSound = (function beep() {

    return function () {
    }
  })();

  // seleccionarCantidad(cantidad) {
  //   this.cantidad = cantidad
  // }

  onCliente() {
    this._clienteModalService.oculto = ''
    //this.editName();
  }

  onPrint() {

    let doc = document.createElement('div')
    doc.id = 'print-section';
    let p = document.createElement('p');
    p.innerText = "lorem ipsum"
    p.style.backgroundColor = 'black'
    doc.append(p);
    let main = document.getElementById('main');
    main.append(doc);

  }

  async vender() {
    if (this.vendiendo) {
      return;
    }
    if (!this._cierreCajaService.cajaActual) {
      Swal.fire({
        icon: 'error',
        title: 'Debe abrir la caja para vender',
        showConfirmButton: false,
        timer: 1500
      });

      return
    }


    if (this.total <= 0 || !this.items) {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo vender, Lista de carrito vacía',
        showConfirmButton: false
      });
      return

    }

    this.vendiendo = true;
    let costo = this.getMontoDeCosto(this.items);
     let date = new Date()

    if (this._clienteModalService.clienteSelected) {
      this.factura = {
        productos: this.items,
        fecha: date.getTime(),
        fechaPago: this.dateACobrar.getTime(),
        monto: this.total,
        debiendo: this.debiendo,
        cliente: this._clienteModalService.clienteSelected._id,
        costo: costo,
        usuario: this.vendedorSeleccionado._id
      }
    } else {

      this.factura = {
        productos: this.items,
        fecha: date.getTime(),
        monto: this.total,
        fechaPago: this.dateACobrar.getTime(),
        debiendo: this.debiendo,
        costo: costo,
        usuario: this.vendedorSeleccionado._id

      }
    }
 
    await this._facturaService.setFactura(this.factura)
 
    this.decremento = new Array();
    for (let i = 0; i < this.factura.productos.length; i++) {
      const producto = this.factura.productos[i];
      let dec = {
        id: producto._id,
        cantidad: producto.cantidad
      }
      this.decremento.unshift(dec);
    }

    await this._productoService.decrementarProducto(this.decremento)
    this.items = new Array
    this.factura = null
    this.ingresoInput = null
    this.total = 0
    this.vuelto = 0
    this.decremento = new Array
     
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
    //this.editName();
  }

  getMontoDeCosto(items) {
    let costo = 0
    if (items) {
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        costo += item.precioBruto * item.cantidad
      }
    }
    return costo
  }
  activarDescuentos(suich) {
    for (let i = 0; i < this.items.length; i++) {
      this.switchDescuento(suich, i)
    }
    //this.editName();
  }

  onToggle(resp) {
    this.descuentoForAll = resp;
    if (resp) {
      this.activarDescuentos(true)
    } if (!resp) {
      this.activarDescuentos(false)
    }
    //this.editName();
  }
  // @HostListener('document:keyup', ['$event'])
  // onKeyUp(event) {
  //   let tecla = event.keyCode;
  //   if (tecla == 39) {
  //     this.cambiarDesde(6)
  //   }
  //   if (tecla == 37) {
  //     this.cambiarDesde(-6)
  //   }
  // }
  switchPrecio(item, cantidad) {
    if (item.precio <= cantidad) {      
      return item;
    } else {

      item.precio = parseFloat(cantidad)
      item.descuento = parseFloat(cantidad)
      item.desc = true
      this.sumarTotal()
      return item
    }


  }

  calcularFechaCobro() {
    console.log(this.stringDateACobrar);

    let d = new Date(this.stringDateACobrar);
    d.setUTCHours(5)
    console.log(d);

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
      } else {
        // date is valid
        this.dateACobrar = d
      }
    } else {
      // not a date
    }
  }
  precioDinamico = 0
  modificadorDePrecio() {

  }

  currencyInputChanged(value) {
    var num = value.replace(/[$.]/g, "");
    return Number(num);
  }

  comprobarDescuento(producto, monto) {
    if (producto.precio <= monto) {
      // pro
      return false;
    } else {
      return true;
    }
  }

}
