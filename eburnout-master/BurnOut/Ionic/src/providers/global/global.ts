import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  questions: Array<any> = [];
  recommendations: Array<any> = [];
  usuario: any = [];
  resultadoPreguntas: { ae: number, d: number, rp: number, q: string };
  resultadosPreguntas: Array<any> = [];

  client_id: string = "";
  client_secret: string = "";

  access_token: string = "";

  constructor() {
    this.resultadoPreguntas = { ae: 0, d: 0, rp: 0, q: '' };
  }

}
