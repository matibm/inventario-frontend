import { ProveedorService } from './../../services/proveedor.service';
import { navBarService } from './../../services/navbar.service';
import { RecargaModalServiceService } from './../../components/recarga-modal/recarga-modal-service.service';
import { RecargaService } from './../../services/recarga.service';
import { FacturaModalService } from './../../components/factura-modal/factura-modal.service';
import { FacturaService } from './../../services/factura.service';
import { ProductoService } from './../../services/producto.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { EditarProductoModalService } from 'src/app/components/editar-producto-modal/editar-producto-modal.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {
  seccion = 'faltantes'
  faltantes
  fSinPagar
  desde = 0;
  masVendidos
  hoy: Date
  diaDesde: number
  mesDesde
  yearDesde
  productosVendidos
  semanaDesde: Date
  diaHasta
  hasta
  mesHasta
  arraySemanal
  yearHasta
  dateDesde: Date
  dateHasta: Date = new Date();
  ventasSemanales
  fechasSemanales
  ventasDiarias
  fechasDiarias
  diaVentaSemanal
  mesVentaSemanal
  yearVentaSemanal
  diaVentaDiaria
  mesVentaDiaria
  infoSemanal
  diariasBoolean = false;
  yearVentaDiaria
  ocultar = false;
  recargas
  itemProveedores = []

  constructor(

    public _editarProductoModalService: EditarProductoModalService,
    public _productosService: ProductoService,
    public _facturaService: FacturaService,
    public _facturaModalService: FacturaModalService,
    public _recargasService: RecargaService,
    public _recargaModalService: RecargaModalServiceService,
    public _navBarService: navBarService,
    public _proveedorService: ProveedorService

  ) {

  }
  ngOnInit() {
    this._navBarService.navBgColor = 'bg-secondary'
    this.setFechas()
    // this.cargarFaltantes()
    // this.cargarMasVendidos()
    // this.cargarFacturasSinPagar();
    this.cargarProductosVendidos(this.dateDesde.valueOf(), this.dateHasta.valueOf());
    this.cargarRecargas(this.dateDesde.valueOf(), this.dateHasta.valueOf())
    this.semanal(this.dateHasta);
    this.diario(this.dateHasta);
    this._recargasService.noficacion.subscribe(() => {
      this.filtrarRecargas()
    })
    this.gestionProveedores()
  }

  @HostListener('window:afterprint')
  onafterprint() {

    // console.log("se imprimio");
    this.ocultar = false;
    // setTimeout(() => {
    //   this.nameField.nativeElement.focus();

    // }, 500);

    // Swal.fire({
    //   icon: 'success',
    //   title: 'Venta Realizada',
    //   showConfirmButton: true
    // }); 



  }

  imprimir() {
    this.ocultar = true;
    setTimeout(() => {
      window.print()
    }, 900);
  }

  setFechas() {
    this.dateDesde = new Date()
    this.hoy = new Date()

    this.semanaDesde = new Date(this.dateDesde.setFullYear(this.dateDesde.getFullYear(), this.dateDesde.getMonth(), this.dateDesde.getDate().valueOf() - 7))
    this.dateDesde = this.semanaDesde;

    this.dateDesde.setUTCHours(0, 0, 0);
    this.dateHasta.setUTCHours(23, 59, 0);

    this.diaDesde = this.dateDesde.getDate();
    this.mesDesde = this.dateDesde.getMonth() + 1;
    this.yearDesde = this.dateDesde.getFullYear();

    this.diaHasta = this.hoy.getUTCDate();
    this.mesHasta = this.hoy.getUTCMonth() + 1;
    this.yearHasta = this.hoy.getUTCFullYear();

    this.diaVentaSemanal = this.diaHasta;
    this.mesVentaSemanal = this.mesHasta;
    this.yearVentaSemanal = this.yearHasta;

    this.diaVentaDiaria = this.diaHasta;
    this.mesVentaDiaria = this.mesHasta;
    this.yearVentaDiaria = this.yearHasta;


  }

  cargarFacturasSinPagar() {
    this._facturaService.getFacturasSinPagar().subscribe((resp: any) => {
      this.fSinPagar = resp.facturas
    })
  }
  cargarFaltantes() {
    this._productosService.getProductosFaltantes(this.desde).subscribe((resp: any) => {
      this.faltantes = resp.productos
    })
  }

  filtrar() {
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(this.yearDesde, this.mesDesde - 1, this.diaDesde));
    desde.setUTCHours(0, 0, 0)

    date = new Date();
    let hasta = new Date(date.setUTCFullYear(this.yearHasta, this.mesHasta - 1, this.diaHasta));
    hasta.setUTCHours(23, 59, 59)

    this.productosVendidos = null;
    this._facturaService.getProductosVendidosEnFecha(desde.valueOf(), hasta.valueOf()).then((resp: any) => {

      this.productosVendidos = resp.productos;
    })
  }

  filtrarRecargas() {
    let date = new Date();
    let desde = new Date(date.setUTCFullYear(this.yearDesde, this.mesDesde - 1, this.diaDesde));
    desde.setUTCHours(0, 0, 0)

    date = new Date();
    let hasta = new Date(date.setUTCFullYear(this.yearHasta, this.mesHasta - 1, this.diaHasta));
    hasta.setUTCHours(23, 59, 59)
    this.recargas = [];
    this._recargasService.getRecargaFiltrado(desde.valueOf(), hasta.valueOf()).then((resp: any) => {
      console.log(resp);

      this.recargas = resp.recargas;
    })
  }

  filtrarVentaSemanal() {
    let dateHasta = new Date(new Date().setUTCFullYear(this.yearVentaSemanal, this.mesVentaSemanal - 1, this.diaVentaSemanal))
    this.semanal(dateHasta);

  }

  mostrarDetallesDeRecarga(recarga) {
    this._recargaModalService.mostrarModal(recarga)
  }
  cargarMasVendidos(desde?, hasta?) {
    this._facturaService.getProductosMasVendidos(2, 2).subscribe((resp: any) => {
      this.masVendidos = resp.facturas;
    })
  }
  cargarProductosVendidos(desde?, hasta?) {
    this._facturaService.getProductosVendidosEnFecha(desde, hasta).then((resp: any) => {
      // console.log(resp);

      this.productosVendidos = resp.productos;
    })
  }

  filtrarVentaDiaria() {
    let dateHasta = new Date(new Date().setUTCFullYear(this.yearVentaDiaria, this.mesVentaDiaria - 1, this.diaVentaDiaria))
    this.diario(dateHasta);
  }

  cargarRecargas(desde, hasta) {
    this._recargasService.getRecargaFiltrado(desde, hasta).then((resp: any) => {
      this.recargas = resp.recargas
    })

  }

  async semanal(hasta: Date) {
    this.fechasSemanales = []
    // let semanal = {
    //   marca: '',
    //   modelo: '',
    //   semana1: 0,
    //   semana2: [],
    //   semana3: 0,
    //   semana4: 0,
    //   precio: 0,
    //   codigo: ''
    // }
    let semanales = [];
    let desde = new Date(new Date().setUTCFullYear(hasta.getUTCFullYear(), hasta.getUTCMonth(), hasta.getUTCDate() - 28));
    desde.setUTCHours(0, 0, 0)
    hasta.setUTCHours(23, 59, 59)
    let allProductos = await this.getProductosVendidosAsync(new Date(new Date().setUTCFullYear(hasta.getUTCFullYear(), hasta.getUTCMonth(), hasta.getUTCDate() - 27)).setUTCHours(0, 0, 0).valueOf(), hasta.valueOf());
    // console.log(hasta);

    for (let i = 0; i < allProductos.length; i++) {
      const producto = allProductos[i];
      let semanal = {
        marca: producto.marca,
        modelo: producto.modelo,
        cantidad: [],
        stock: producto.stock,
        codigo: producto.codigo
      }
      semanales.push(semanal);
    }

    let dias = 0;
    for (let i = 0; i < 4; i++) {
      dias += 7;
      let semana = new Date(new Date().setUTCFullYear(desde.getUTCFullYear(), desde.getUTCMonth(), desde.getUTCDate() + dias))
      semana.setUTCHours(23, 59, 59);
      let semanaDesde = new Date(new Date().setUTCFullYear(desde.getUTCFullYear(), desde.getUTCMonth(), desde.getDate() + dias - 5));
      // dias--;
      semanaDesde.setUTCHours(0, 0, 0)
      let productos: any = await this.getProductosVendidosAsync(semanaDesde.valueOf(), semana.valueOf());
      // // console.log(productos);
      let dia = semanaDesde.getUTCDate();
      // console.log(semanaDesde);

      // if (semanaDesde.getDate() == 31) {
      //   // console.log("ahora es 31");

      //   dia--;
      // }
      this.fechasSemanales.push(`${dia}/${semanaDesde.getUTCMonth() + 1} a ${semana.getUTCDate()}/${semana.getUTCMonth() + 1}`)
      for (let j = 0; j < productos.length; j++) {
        const producto = productos[j];

        for (let k = 0; k < semanales.length; k++) {
          const semanal = semanales[k];
          if (semanal.codigo == producto.codigo) {
            semanales[k].cantidad[i] = producto.cantidad;
          }
        }
      }

      // // console.log("termina for");
    }

    for (let j = 0; j < semanales.length; j++) {
      const semanal = semanales[j];
      for (let k = 0; k < 4; k++) {
        const cantidad = semanal.cantidad[k];
        if (!cantidad) {
          semanal.cantidad[k] = 0;
        }
      }
    }

    // console.log(semanales);
    // console.log(this.fechasSemanales);
    this.ventasSemanales = semanales


    // for (let i = 0; i < 4; i++) {
    //   let productos =       
    // }


    // for (let i = 0; i < this.productosVendidos.length; i++) {
    //   const producto = this.productosVendidos[i];
    //   semanal.marca = producto.marca
    //   semanal.modelo = producto.modelo
    //   semanal.precio = producto.precio
    // }
  }

  async diario(hasta) {
    let desde = new Date(new Date().setUTCFullYear(hasta.getUTCFullYear(), hasta.getUTCMonth(), hasta.getUTCDate() - 7));
    desde.setUTCHours(0, 0, 0)
    hasta.setUTCHours(23, 59, 59)
    let allProductos = await this.getProductosVendidosAsync(desde.valueOf(), hasta.valueOf());
    let diarios = [];
    this.fechasDiarias = []
    for (let i = 0; i < allProductos.length; i++) {
      const producto = allProductos[i];
      let semanal = {
        marca: producto.marca,
        modelo: producto.modelo,
        cantidad: [],
        stock: producto.stock,
        codigo: producto.codigo
      }
      diarios.push(semanal);
    }

    let dias = 0;
    for (let i = 0; i < 7; i++) {
      dias += 1;
      let dia = new Date(new Date().setUTCFullYear(desde.getUTCFullYear(), desde.getUTCMonth(), desde.getUTCDate() + dias));
      dia.setUTCHours(23, 59, 59);
      let diaDesde = new Date(new Date().setUTCFullYear(desde.getUTCFullYear(), desde.getUTCMonth(), desde.getUTCDate() + dias));
      diaDesde.setUTCHours(0, 0, 0);
      let productos: any = await this.getProductosVendidosAsync(diaDesde.valueOf(), dia.valueOf());

      this.fechasDiarias.push(`${dia.getUTCDate()}/${dia.getUTCMonth() + 1}`);
      for (let j = 0; j < productos.length; j++) {
        const producto = productos[j];

        for (let k = 0; k < diarios.length; k++) {
          const diario = diarios[k];
          if (diario.codigo == producto.codigo) {
            diarios[k].cantidad[i] = producto.cantidad;
          }
        }
      }

    }
    this.diariasBoolean = true;
    for (let j = 0; j < diarios.length; j++) {
      const diario = diarios[j];
      for (let k = 0; k < 7; k++) {
        const cantidad = diario.cantidad[k];
        if (!cantidad) {
          diario.cantidad[k] = 0;
        }
      }
    }
    this.ventasDiarias = diarios;

  }

  async getProductosAsync() {
    return await this._productosService.getProductosPromise().then((resp: any) => {
      return resp.productos;
    })
  }

  async getProductosVendidosAsync(desde, hasta) {

    return await this._facturaService.getProductosVendidosEnFecha(desde, hasta).then((on: any) => {
      // console.log(on);

      return on.productos;
    });
  }

  verFacturaModal(factura) {
    localStorage.setItem('factura', factura)
    this._facturaModalService.mostrarModal(factura)
  }


  async gestionProveedores() {
    let resp: any = await this._proveedorService.getProveedores();
    let proveedores = resp.proveedores
    for (let i = 0; i < proveedores.length; i++) {
      const proveedor = proveedores[i];
      let itemP = {
        nombre: proveedor.nombre,
        stock: 0,
        ganancia: 0,
        total: 0,
        percent: 0
      }
      let e: any = await this._productosService.getProductosPorProveedor(proveedor._id);
      let productosPorProveedor = e.productos
      for (let j = 0; j < productosPorProveedor.length; j++) {
        const producto = productosPorProveedor[j];
        itemP.total += producto.precio * producto.stock;
        // itemP.ganancia += producto.precio - producto.precioBruto;
        itemP.stock += producto.stock * producto.precioBruto

      }
      itemP.ganancia = itemP.total - itemP.stock;
      itemP.percent = (itemP.ganancia * 100) / itemP.total;
      itemP.percent = Math.round(itemP.percent)

      this.itemProveedores.push(itemP)
    }
  }

}
