import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, tipo: string): any {
    if (!value) {
      return
    }
    
    if (tipo == 'fecha') {
      let date = new Date(value)
      let mes = date.getMonth() +1;
       let fecha = date.getDate() + '/' +mes + '/'+ date.getFullYear()
      return fecha
    }
    if(tipo =='hora'){
      let date = new Date(value)
      let hora = date.getHours() + ':' + date.getMinutes() + ' hs'
      return hora
    }

    return null;
  }

}
