import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalProvider } from '../../providers/global/global';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { SQLite } from '@ionic-native/sqlite';
import { SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formulario: { email: string, password: string };
  loading: any;
  observable: any;

  private _db: SQLiteObject = null;
  private _id : number = 0;
  

  constructor(public navCtrl: NavController, public fireAuth: AngularFireAuth, public toastCtrl: ToastController,
	  public global: GlobalProvider, public database: DatabaseProvider, public loadingCtrl: 	LoadingController, private _sqlite: SQLite) {
    this.formulario = { email: '', password: '' };
    
  }

  ionViewDidLoad() {
      this._onInit();
  }

    private _cipher(message, action) {
        var text = message;
        var encrypted = "";

        for(var i = 0; i < text.length; i++) {
            var ASCII = text[i].charCodeAt(0);
            var n = null;

            if(i % 2 == 0) {
                n = action == 'encrypt' ? ASCII + 4 : ASCII - 4;
            }

            else if(i % 2 == 1) {
                n = action == 'encrypt' ? ASCII + 7 : ASCII - 7;
            }

            var s = String.fromCharCode(n);

            encrypted += s;;
        }
   
        return encrypted;

    }


    private _onInit(){
        var _self = this;
        this._createDatabase().then((success) => {




            if(success[0] !== undefined){

                _self._id = success[0]["id"];
                _self.formulario.email = success[0]["email"];
                var desc = _self._cipher(success[0]["pwd"],'')
                _self.formulario.password = desc;

                return _self.login();

            }
            
        }, (error) => {
            _self.toast(JSON.stringify(error));
        });

    }

    private _createDatabase(){
        var _self = this;
        return this._sqlite.create({
              name: 'eburnout.db',
              location: 'default' // the location field is required
        })
        .then((db) => {
              _self._setDatabase(db);
              _self._createTable();
              return _self._getUser();
        })
        .catch(error =>{
            _self.toast(JSON.stringify(error));
            Promise.reject( error );
        });
    }


    private _setDatabase(db: SQLiteObject){
        if(this._db === null){
              this._db = db;
        }
    }

    private _update(email:any,pwd:any,id: any){
        let sql = 'UPDATE usuario SET email=?, pwd=? WHERE id=?';
        return this._db.executeSql(sql, [email, pwd, id]);
    }

    private _create(email:any,pwd:any){
        let sql = 'INSERT INTO usuario(email,pwd) VALUES(?,?)';
        return this._db.executeSql(sql, [email,pwd]);
    }

    /*private _deleteTable(){
        let sql = 'DROP TABLE IF EXISTS usuario';
        return this._db.executeSql(sql, []);
    }*/

    
    private _createTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(100),pwd TEXT)';
        return this._db.executeSql(sql, []);
    }

    private _getUser(){

        let sql = 'SELECT * FROM usuario WHERE id=1';
        return this._db.executeSql(sql, [])
            .then(response => {
                let arrData = [];
                for (let index = 0; index < response.rows.length; index++) {
                    arrData.push( response.rows.item(index) );
                }
                return Promise.resolve( arrData );
            })
            .catch(error => Promise.reject( error ) );
			
    }

   
    




  /* LOGIN FIREBASE */
  login() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando'
    });
    this.loading.present().then(() => {
      this.fireAuth.auth.signInWithEmailAndPassword(this.formulario.email, this.formulario.password)
        .then(resultado => {
          this.observable = Observable.combineLatest(this.database.preguntas(), this.database.recomendaciones(),
            this.database.usuarioRegistradoBD(resultado.uid), this.database.encuestasUltimas(resultado.uid),this.database.idClientFitBit(resultado.uid)).subscribe(resultados => {

              this.global.questions = resultados[0];
              this.global.recommendations = resultados[1];
              if (resultados[2] == null) {
                this.navCtrl.setRoot('RegistroPage', { idUsuario: resultado.uid, email: this.formulario.email, password: this.formulario.password });
                this.loading.dismiss();
              } else {
                var dato = this._cipher(this.formulario.password,'encrypt');
                if( this._id ){
                    this._update(this.formulario.email, dato, this._id);
                }else{
                    this._create(this.formulario.email, dato);
                }

                this.global.usuario = resultados[2];
                this.global.resultadoPreguntas = this.global.usuario.ultimaencuesta;
                for (let resultadoPreguntas of resultados[3]) {
                  var encuesta: any = resultadoPreguntas;
                  this.global.resultadosPreguntas.push(encuesta.encuesta);
                }
                for (let llavesFitBit of resultados[4]) {
                  this.global.client_id = llavesFitBit["client_id"];
                  this.global.client_secret = llavesFitBit["client_secret"];
                }
                this.navCtrl.setRoot('TabGeneralPage');
                this.loading.dismiss();
              }
			  
            });
        })
        .catch(error => {
          var mensaje: string = '';
          error.code == 'auth/user-not-found' || error.code == 'auth/invalid-email' ? mensaje = 'Usuario no válido' : mensaje = 'Contraseña no válida';
          this.loading.dismiss();
          this.toast(mensaje);
        });
    });
  }
  /* FIN LOGIN FIREBASE */

  /* TOAST MENSAJE LOGIN ERROR */
  toast(mensaje: string) {
    let toastMensaje = this.toastCtrl.create({
      message: mensaje,
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
