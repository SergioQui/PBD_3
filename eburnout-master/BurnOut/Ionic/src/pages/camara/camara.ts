import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DatabaseProvider } from '../../providers/database/database';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage {

  foto: any;
  fotoConsulta: any;
  estadoAnimo: string;
  errorFoto: boolean;
  observable: any;
  estadoAnimoBD: { estadoAnimo: string };

  constructor(public camera: Camera, public database: DatabaseProvider, public global: GlobalProvider) {
    this.foto = './assets/imgs/foto.svg';
    this.fotoConsulta = null;
    this.estadoAnimo = '';
    this.errorFoto = false;
  }

  ionViewDidLoad() {
  }

  /* HACER FOTO DE LA CAMARA NATIVA */
  hacerFoto() {
    let opciones: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 512,
      targetHeight: 512,
      quality: 100,
      correctOrientation: true
    }
    this.camera.getPicture(opciones).then(imageData => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.estadoAnimo = '';
      this.errorFoto = false;
      this.fotoConsulta = imageData;
    });
  }
  /* FIN HACER FOTO DE LA CAMARA NATIVA */

  /* ENVIAR FOTO A GOOGLE CLOUD VISION */
  enviarFoto() {
    if (this.fotoConsulta != null) {
      this.observable = this.database.consultaFoto(this.fotoConsulta).subscribe(resultado => {
        var fotoRespuesta = resultado.json().responses;
        if (fotoRespuesta[0].faceAnnotations != null) {
          var contento = fotoRespuesta[0].faceAnnotations[0].joyLikelihood;
          var triste = fotoRespuesta[0].faceAnnotations[0].sorrowLikelihood;
          var cabreado = fotoRespuesta[0].faceAnnotations[0].angerLikelihood;
          var sorprendido = fotoRespuesta[0].faceAnnotations[0].surpriseLikelihood;
          if (contento == 'VERY_LIKELY' || contento == 'LIKELY') {
            this.estadoAnimo = '¡CONTENTO!';
            this.estadoAnimoBD = { estadoAnimo: 'contento' }
          } else {
            if (triste == 'VERY_LIKELY' || triste == 'LIKELY') {
              this.estadoAnimo = '¡TRISTE!';
              this.estadoAnimoBD = { estadoAnimo: 'triste' }
            } else {
              if (cabreado == 'VERY_LIKELY' || cabreado == 'LIKELY') {
                this.estadoAnimo = '¡CABREADO!';
                this.estadoAnimoBD = { estadoAnimo: 'cabreado' }
              } else {
                if (sorprendido == 'VERY_LIKELY' || sorprendido == 'LIKELY') {
                  this.estadoAnimo = '¡SORPRENDIDO!';
                  this.estadoAnimoBD = { estadoAnimo: 'sorprendio' }
                } else {
                  this.estadoAnimo = '¡NORMAL!';
                  this.estadoAnimoBD = { estadoAnimo: 'normal' }
                }
              }
            }
          }
          this.foto = './assets/imgs/foto.svg';
          this.database.guardarEstadoAnimo(this.global.usuario.id, this.estadoAnimoBD);
        } else {
          this.errorFoto = true;
        }
      });
    }
  }
  /* FIN ENVIAR FOTO A GOOGLE CLOUD VISION */

  ionViewDidLeave() {
    this.estadoAnimo = '';
  }

  ionViewWillUnload() {
    this.observable.unsubscribe();
  }

}
