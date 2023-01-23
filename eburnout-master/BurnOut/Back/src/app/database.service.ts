import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  /* CONSULTA LISTA DE USUARIOS */
  usuarios() {
    return this.db.list('/usuarios').valueChanges();
  }
  /* FIN CONSULTA LISTA DE USUARIOS */

  /* CONSULTA LISTA DE ENCUESTAS */
  encuestas() {
    return this.db.list('/encuestas').valueChanges();
  }
  /* FIN CONSULTA LISTA DE ENCUESTAS */
  
}
