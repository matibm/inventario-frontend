import { URL_SERVICIOS } from './../config/global';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, tipo: string = 'producto' ): any {
    
    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/xxx'
    }

    

    switch (tipo) {
      
    case 'producto': 
    url += '/' + img
      return url
    
      default:
        console.log('tipo de imagen no existe, usuario, medico, hospital');
        url += '/usuario/xxx';
        break;
    }

    return url;
  }
}
