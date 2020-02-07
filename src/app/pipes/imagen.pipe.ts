import { URL_SERVICIOS } from './../config/global';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, tipo: string = 'producto'): any {
    console.log(img)
    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuario/xxx'
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
      
      
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;

        case 'post':
        url += '/autos/' + img;
        break;
      default:
        console.log('tipo de imagen no existe, usuario, medico, hospital');
        url += '/usuario/xxx';
        break;
    }

    return url;
  }
}
