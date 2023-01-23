import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {

  resultadoPreguntas: { ae: number, d: number, rp: number, q: string };
  indicePregunta: number;
  formulario: { mensaje: string };

  constructor(public navCtrl: NavController, public global: GlobalProvider, public database: DatabaseProvider) {
    this.resultadoPreguntas = { ae: 0, d: 0, rp: 0, q: '' };
    this.indicePregunta = 0;
    this.formulario = { mensaje: '' };
  }

  ionViewDidLoad() {
  }

  /* RESPUESTA DE CADA PREGUNTA */
  respuesta(idRespuesta: number) {
    if (this.indicePregunta < this.global.questions.length - 1) {
      switch (this.global.questions[this.indicePregunta].type) {
        case 'AE':
          this.resultadoPreguntas.ae += idRespuesta;
          break;
        case 'D':
          this.resultadoPreguntas.d += idRespuesta;
          break;
        case 'RP':
          this.resultadoPreguntas.rp += idRespuesta;
          break;
      }
      this.indicePregunta++;
    }
  }
  /* FIN RESPUESTA DE CADA PREGUNTA */

  /* TERMINAR ENCUESTA */
  terminar() {
    this.indicePregunta = 0;
    this.resultadoPreguntas.q = this.formulario.mensaje;
    this.global.resultadoPreguntas = this.resultadoPreguntas;
    this.global.resultadosPreguntas.push(this.global.resultadoPreguntas);
    if (this.global.resultadosPreguntas.length > 3) {
      this.global.resultadosPreguntas.shift();
    }
    this.database.guardarUltimaEncuesta(this.global.usuario.id, this.global.resultadoPreguntas);
    this.database.guardarEncuesta(this.global.usuario.id, this.global.resultadoPreguntas);
    this.resultadoPreguntas = { ae: 0, d: 0, rp: 0, q: '' };
    this.formulario = { mensaje: '' };
    this.navCtrl.parent.select(0);
  }
  /* TERMINAR ENCUESTA */

}
