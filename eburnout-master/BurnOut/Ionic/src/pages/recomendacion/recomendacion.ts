import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-recomendacion',
  templateUrl: 'recomendacion.html',
})
export class RecomendacionPage {

  cansancioEmocional: string;
  despersonalizacion: string;
  realizacionPersonal: string;

  constructor(public global: GlobalProvider) {
    this.cansancioEmocional = 'Realiza la encuesta para saber tu recomendación';
    this.despersonalizacion = 'Realiza la encuesta para saber tu recomendación';
    this.realizacionPersonal = 'Realiza la encuesta para saber tu recomendación';
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.calcularNivel();
  }

  calcularNivel() {
    var nivelAe: string = '';
    var nivelD: string = '';
    var nivelRp: string = '';
    
    if (this.global.resultadoPreguntas.ae > 0 && this.global.resultadoPreguntas.ae <= 18) {
      nivelAe = 'bajo';
    } else {
      if (this.global.resultadoPreguntas.ae > 18 && this.global.resultadoPreguntas.ae <= 26) {
        nivelAe = 'medio';
      } else {
        if (this.global.resultadoPreguntas.ae > 26 && this.global.resultadoPreguntas.ae <= 54) {
          nivelAe = 'alto';
        }
      }
    }
    if (this.global.resultadoPreguntas.d > 0 && this.global.resultadoPreguntas.d <= 5) {
      nivelD = 'bajo';
    } else {
      if (this.global.resultadoPreguntas.d > 5 && this.global.resultadoPreguntas.d <= 9) {
        nivelD = 'medio';
      } else {
        if (this.global.resultadoPreguntas.d > 9 && this.global.resultadoPreguntas.d <= 30) {
          nivelD = 'alto';
        }
      }
    }
    if (this.global.resultadoPreguntas.rp > 0 && this.global.resultadoPreguntas.rp <= 33) {
      nivelRp = 'bajo';
    } else {
      if (this.global.resultadoPreguntas.rp > 33 && this.global.resultadoPreguntas.rp <= 39) {
        nivelRp = 'medio';
      } else {
        if (this.global.resultadoPreguntas.rp > 39 && this.global.resultadoPreguntas.rp <= 48) {
          nivelRp = 'alto';
        }
      }
    }
    for (let recommendation of this.global.recommendations) {
      if (recommendation.type == 'AE' && nivelAe == recommendation.nivel) {
        this.cansancioEmocional = recommendation.recommendation;
      }
      if (recommendation.type == 'D' && nivelD == recommendation.nivel) {
        this.despersonalizacion = recommendation.recommendation;
      }
      if (recommendation.type == 'RP' && nivelRp == recommendation.nivel) {
        this.realizacionPersonal = recommendation.recommendation;
      }
    }
  }

}
