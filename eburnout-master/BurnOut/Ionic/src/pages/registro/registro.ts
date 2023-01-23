import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  observable: any;

  numRegistro: number;
  usuario: {
    id: string, email: string, password: string, edad: string,
    sexo: string, estadocivil: string, hijos: string, altura: string,
    peso: string, especialidad: string, tipocontrato: string, anosresidente: string,
    contratoadjunto: string, tiempoplazaactual: string,
    tiempovidalaboral: string, tipotrabajo: string, ejerciciofisico: string,
    lectura: string, musica: string, salessocialmente: string, viajas: string, estudias: string,
    ultimaencuesta: { ae: number, d: number, rp: number, q: string }
  };
  idUsuario: string;
  email: string;
  password: string;

  pesos: Array<number>;
  alturas: Array<number>;
  anosLaborales: Array<number>;
  especialidades: any = [];

  edad: any;
  sexo: any;
  estadocivil: any;
  hijos: any;
  altura: any;
  peso: any;

  especialidad: any;
  tipocontrato: any;
  anosresidente: any;
  contratoadjunto: any;
  tiempoplazaactual: any;
  tiempovidalaboral: any;
  tipotrabajo: any;

  ejerciciofisico: any;
  lectura: any;
  musica: any;
  salessocialmente: any;
  viajas: any;
  estudias: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider,
    public toastCtrl: ToastController, public global: GlobalProvider) {
    this.idUsuario = this.navParams.get('idUsuario');
    this.email = this.navParams.get('email');
    this.password = this.navParams.get('password');
    this.observable = this.database.especialidades().subscribe(especialidades => {
      this.especialidades = especialidades;
    });
    this.numRegistro = 1;
    this.pesos = [];
    this.alturas = [];
    this.anosLaborales = [];
    for (let i = 40; i <= 180; i++) {
      this.pesos.push(i);
    }
    for (let i = 130; i <= 220; i++) {
      this.alturas.push(i);
    }
    for (let i = 0; i <= 40; i++) {
      this.anosLaborales.push(i);
    }
  }

  ionViewDidLoad() {
  }

  /* CLICK BOTON */
  clickBoton() {
    switch (this.numRegistro) {
      case 1:
        if (this.edad != null && this.sexo != null && this.estadocivil != null && this.hijos != null
          && this.altura != null && this.peso != null) {
          this.numRegistro = 2;
        } else {
          this.toast();
        }
        break;
      case 2:
        if (this.especialidad != null && this.tipocontrato != null && this.tiempoplazaactual != null
          && this.tiempovidalaboral != null && this.tipotrabajo != null && (this.anosresidente != null || this.contratoadjunto != null)) {
          this.numRegistro = 3;
        } else {
          this.toast();
        }
        break;
      case 3:
        this.anosresidente != null ? this.contratoadjunto = null : this.anosresidente = null;
        if (this.ejerciciofisico != null && this.lectura != null && this.musica != null && this.salessocialmente != null
          && this.viajas != null && this.estudias != null) {
          this.usuario = {
            id: this.idUsuario, email: this.email, password: this.password, edad: this.edad,
            sexo: this.sexo, estadocivil: this.estadocivil, hijos: this.hijos, altura: this.altura,
            peso: this.peso, especialidad: this.especialidad, tipocontrato: this.tipocontrato, anosresidente: this.anosresidente,
            contratoadjunto: this.contratoadjunto, tiempoplazaactual: this.tiempoplazaactual,
            tiempovidalaboral: this.tiempovidalaboral, tipotrabajo: this.tipotrabajo, ejerciciofisico: this.ejerciciofisico,
            lectura: this.lectura, musica: this.musica, salessocialmente: this.salessocialmente, viajas: this.viajas, estudias: this.estudias,
            ultimaencuesta: { ae: 0, d: 0, rp: 0, q: '' }
          };
          this.global.usuario = this.usuario;
          this.database.registroUsuarioBD(this.usuario);
          this.navCtrl.setRoot('TabGeneralPage', { primeraVez: true });
        } else {
          this.toast();
        }
        break;
    }
  }
  /* FIN CLICK BOTON */

  /* TOAST MENSAJE LOGIN ERROR */
  toast() {
    let toastMensaje = this.toastCtrl.create({
      message: 'Rellene todo los campos',
      duration: 2500,
      position: 'bottom',
      dismissOnPageChange: true
    });
    toastMensaje.present();
  }
  /* FIN TOAST MENSAJE LOGIN ERROR */

  ionViewWillUnload() {
    this.observable.unsubscribe();
  }

}
