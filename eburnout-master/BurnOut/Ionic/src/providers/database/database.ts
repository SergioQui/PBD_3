import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';

@Injectable()
export class DatabaseProvider {

  constructor(private http: Http, private db: AngularFireDatabase) { }

  /* CONSULTA PREGUNTAS */
  preguntas() {
    return this.db.list('/questions').valueChanges();
  }
  /* FIN CONSULTA PREGUNTAS */

  /* CONSULTA RECOMENDACIONES */
  recomendaciones() {
    return this.db.list('/recommendations').valueChanges();
  }
  /* FIN CONSULTA RECOMENDACIONES */

  /* CONSULTA ESPECIALIDADES */
  especialidades() {
    return this.db.list('/especialidades').valueChanges();
  }
  /* FIN CONSULTA ESPECIALIDADES */

  /* CONSULTA REGISTRO USUARIO BD */
  registroUsuarioBD(usuario: any) {
    this.db.database.ref('/usuarios/' + usuario.id).set(usuario);
  }
  /* FIN CONSULTA REGISTRO USUARIO BD */

  /* CONSULTA USUARIO REGISTRADO BD */
  usuarioRegistradoBD(idUsuario: string) {
    return this.db.object('/usuarios/' + idUsuario).valueChanges();
  }
  /* FIN CONSULTA USUARIO REGISTRADO BD */

  /* CONSULTA GUARDAR ULTIMA ENCUESTA */
  guardarUltimaEncuesta(idUsuario: string, resultadoPreguntas: any) {
    this.db.database.ref('/usuarios/' + idUsuario + '/ultimaencuesta').set(resultadoPreguntas);
  }
  /* FIN CONSULTA GUARDAR ULTIMA ENCUESTA */

  /* CONSULTA GUARDAR ENCUESTA */
  guardarEncuesta(idUsuario: string, resultadoPreguntas: any) {
    this.db.database.ref('/encuestas').push({ id: idUsuario, encuesta: resultadoPreguntas });
  }
  /* FIN CONSULTA GUARDAR ENCUESTA */

  /* CONSULTA ULTIMAS 3 ENCUESTA */
  encuestasUltimas(idUsuario: string) {
    return this.db.list('/encuestas/',
      encuestas => encuestas.orderByChild('id').equalTo(idUsuario).limitToLast(3)
    ).valueChanges();
  }
  /* FIN CONSULTA ULTIMAS 3 ENCUESTA */

  /* CONSULTA GUARDAR ENCUESTA */
  guardarEstadoAnimo(idUsuario: string, estadoAnimo: any) {
    this.db.database.ref('/estadosanimo').push({ id: idUsuario, estado: estadoAnimo });
  }
  /* FIN CONSULTA GUARDAR ENCUESTA */

  /* CONSULTA FOTO CLOUD VIDION */
  consultaFoto(foto) {
    const body = {
      "requests": [
        {
          "image": {
            "content": foto
          },
          "features": [
            {
              "type": "FACE_DETECTION"
            }
          ]
        }
      ]
    }
    return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + 'AIzaSyB_mk7PfJCwuHBCw51P4juWqxBJdwVEG5o', body);
  }
  /* FIN CONSULTA FOTO CLOUD VIDION */

    /* CONSULTA DEL CLIENT_ID DEL USUARIO */
    idClientFitBit(idUsuario: string) {
        return this.db.list('/fbclient/',
            referencia => referencia.orderByChild('id').equalTo(idUsuario)
        ).valueChanges();
    }
    /* FIN CONSULTA DEL CLIENT_ID DEL USUARIO */

}
