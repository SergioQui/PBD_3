import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'; // HttpHeaders ha sido importado para poder usar en el request.

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; // Haceo un mapeo del post y/o get

import 'rxjs/add/operator/toPromise';

import { Observable } from 'rxjs/Observable';

import { AuthConfig } from './auth-config';
import { Platform } from 'ionic-angular'; // Pre- cargala application

import { FBSleep } from './../../models/fbsleep'; // Model, para instanciar la información del usuario



declare const window: any; //Crearmos window para usar un browser interno predeterminado.


import { AlertController } from 'ionic-angular';

import { GlobalProvider } from '../global/global';

import { Storage } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
import { SQLiteObject } from '@ionic-native/sqlite';



@Injectable() // Decorator
export class FitBitServiceProvider {

    private _renew_token : boolean = false;

    private _access_token : string = "";

    // ID CLIENT FOR ACCESS PERSONAL DATA IN FITBIT
    private _client_id : string = "";
    private _client_secret : string = "";
   
    // INFORMACIÓN DEL USUARIO, DATOS PERSONALES (NOMBRE, GÉNERO)
    private _fbsleep : FBSleep;


    private _iCron : any = null;
    private _timeCron : number = 5000;

    // Series de tiempo activity heart
    private _tsAHI : number[] = [];

    private errorObserver: any;
    public error: any;

    private _stayWaiting : boolean = false;

    private _db: SQLiteObject = null;

    private _id : number = 0;
    private _db_client_id : string = "";

	constructor(
		public http: HttpClient, // get y post
        private platform: Platform,
        public alertCtrl: AlertController,
        private _global: GlobalProvider,
        private _storage: Storage,
        private _sqlite: SQLite
		) {

// localStorage.setItem('fb_access_token','');
        
        this._fbsleep = new FBSleep(0,"","",0);

        this.errorObserver = null;
        this.error = Observable.create(observer => {
            this.errorObserver = observer;
        });

        this._set_time_cron();


        this._oninit();


  	}

    public  _oninit(){
        var _self = this;
         this._createDatabase().then((success) => {

            // _self.showAlert(JSON.stringify(success));
            
            var _token = "";

            if(success[0] !== undefined){

                _self._id = success[0]["id"];
                _self._db_client_id = success[0]["client_id"];
                if(_self._db_client_id == _self._global.client_id){
                    _token = success[0]["token"];
                }else{
                    _token = "";
                }

            }

            _self._client_id = _self._db_client_id;
            _self._storage.set('fb_client_id', _self._db_client_id);

            _self._access_token = _token;
            _self._storage.set('fb_access_token', _token);

            _self._load_vars();
                    
            _self._valuate_error({error:'',status:1020});

            //return Promise.resolve( {error:'',status:1020} );

        }, (error) => {
            _self.showAlert(JSON.stringify(error));
            // Promise.reject( error );
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
              return _self._getClient();
        })
        .catch(error =>{
            _self.showAlert(JSON.stringify(error));
            Promise.reject( error );
        });
    }


    private _setDatabase(db: SQLiteObject){
        if(this._db === null){
              this._db = db;
        }
    }

    private _create(token:any){
        let sql = 'INSERT INTO client(token,client_id) VALUES(?,?)';
        return this._db.executeSql(sql, [token,this._client_id]);
    }

    /*private _deleteTable(){
        let sql = 'DROP TABLE IF EXISTS client';
        return this._db.executeSql(sql, []);
    }*/

    private _createTable(){
        let sql = 'CREATE TABLE IF NOT EXISTS client(id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT,client_id VARCHAR(6))';
        return this._db.executeSql(sql, []);
    }

    /*private _delete(id: any){
        let sql = 'DELETE FROM client WHERE id=?';
        return this._db.executeSql(sql, [id]);
    }*/

    private _getClient(){

        let sql = 'SELECT * FROM client WHERE id=1';
        return this._db.executeSql(sql, [])
            .then(response => {
                let arrClient = [];
                for (let index = 0; index < response.rows.length; index++) {
                    arrClient.push( response.rows.item(index) );
                }
                return Promise.resolve( arrClient );
            })
            .catch(error => Promise.reject( error ) );
			
    }

    private _update(token,id: any){
        let sql = 'UPDATE client SET token=?, client_id=? WHERE id=?';
        return this._db.executeSql(sql, [token, this._client_id, id]);
    }






    private _set_time_cron(){

        var t_in_ms = AuthConfig.rate_limit <= 0    ?    150    :    AuthConfig.rate_limit;

        // Time in miliseconds to cronjob
        this._timeCron = t_in_ms / 60 * 60 * 1000;

    }

    private _load_vars(){

        var _self = this;

        if(this._global.client_id){

            _self._storage.get('fb_client_id').then((client_id) => {

                _self._client_id = client_id ? client_id : "";

            });

            _self._storage.get('fb_access_token').then((val) => {

                _self._access_token = val ? val : "";

            });

            _self._storage.get('fb_client_secret').then((client_secret) => {

                _self._client_secret = client_secret ? client_secret : "";

            });

        }

    }


    private _get_url(): string{

        AuthConfig.body.client_id = this._global.client_id;

        return AuthConfig.url + "?" + Object.keys(AuthConfig.body).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(AuthConfig.body[k])
        }).join('&');

    }

    public get_strDate(sDate:string="", sFormat:string=""){
        var date;
        if (sDate.length){
            date = new Date(sDate);
        }else{
            date = new Date();
        }

        var day = date.getDate() < 10 ? "0"+date.getDate().toString() : date.getDate().toString();
        var minutes = date.getMinutes() < 10 ? "0"+date.getMinutes().toString() : date.getMinutes().toString();
        var month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();

        if(sFormat=="HH:mm:ss")
            return date.getHours().toString() +":"+ minutes +":"+ date.getSeconds().toString();
        else if(sFormat=="dd-mm-yyyy")
            return day + "-" + month + "-" + date.getFullYear().toString();
        else
            return date.getFullYear().toString() + "-" + month + "-" + day;
            
    }


  	private _getAuthPermission(): Promise<any> {
      // Metodos observables, si pasa algo X, doy la promesa de regresar con algo.

  		var self = this;

        return new Promise(function (resolve, reject) {

            if(self._db_client_id == self._global.client_id){
                self._renew_token = false;
            }else{
                self._renew_token = true;
            }

            var navigator_clean =  self._renew_token ? ",clearsessioncache=yes,clearcache=yes" : "";

            // self.showAlert("a renew => "+navigator_clean);

            if( window.cordova != undefined ){

                const browser = window.cordova.InAppBrowser.open(self._get_url(), '_blank',
                    'location=no'+navigator_clean);

                browser.addEventListener('loadstart', (event) => {

                    if ((event.url).indexOf(AuthConfig.body.redirect_uri) === 0) {
                        browser.removeEventListener('exit', () => {});
                        browser.close();
                        const responseParameters = (((event.url).split(AuthConfig.key_access_token)[1]).split("&")[0]).split('=')[1];

                        const parsedResponse = {};
                        const defaultError = {error:'Problem authenticating with FitBit',status:1010};

                        if (responseParameters !== undefined && responseParameters !== null) {
                            parsedResponse[AuthConfig.key_access_token] = responseParameters;
                            resolve(parsedResponse);
                        } else {
                            reject(defaultError);
                        }
                    }

                    
                });

                browser.addEventListener('exit', function (event) {
                    reject({error:'The FitBit authorization in flow was canceled',status:1010});
                });

            }else{

                window.open(self._get_url(), '_blank', 'location=no'+navigator_clean);

                resolve({"access_token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MjVLOTkiLCJhdWQiOiIyMkNHODQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTE1MDc4MTQzLCJpYXQiOjE1MTQ5OTg2ODB9.j6YhSfy7123wFYVsF0b9PNKm8sVihjplrUV_r6kBXuE"});

            }

        });

    }


    private _toAutorizate(){

        var self = this;

    	this._getAuthPermission().then((success) => {

            if(success[AuthConfig.key_access_token] !== undefined ){

                self._access_token = success[AuthConfig.key_access_token];
                
                    self._renew_token = false;
                    self._client_id = self._global.client_id;

                    if(self._id){
                        self._update(self._access_token,self._id);
                    }else{
                        self._create(self._access_token);
                    }

                    self._client_secret = self._global.client_secret;
                    self._storage.set('fb_client_id', self._client_id);
                    self._storage.set('fb_client_secret', self._client_secret);

                
                //localStorage.setItem('fb_access_token', self._access_token);
                this._global.access_token = self._access_token;
                self._storage.set('fb_access_token', self._access_token);


                self._valuate_error({status:1001});
            }

        }, (error) => {
            self.showAlert( JSON.stringify(error));
            self._valuate_error(error);
        });

    }



    public check_auth(){

        this.platform.ready().then(() => {

            this._load_vars();

            if( !this._access_token.trim().length && this.have_bracelet() ){
                this._toAutorizate();
            }else{
                this._valuate_error({status:1001});
            }

        });

    }


    

    private _valuate_error(error){
        
        this.errorObserver.next(error);

        if(error.status != undefined){
            if(error.status == 400 || error.status == 401){
                // Authorization code invalid
                this.toStopCron();
                //localStorage.setItem('fb_access_token',null);
                this._global.access_token = "";
                this._storage.set('fb_access_token', "");
                this._load_vars();
                this._toAutorizate();
            }else if(error.status == 429 ){

                this._stayWaiting = true;

            }else if(error.status == 1002 ){
                this._stayWaiting = false;
            }
        }

    }


    public toStopCron(){

        if(this._iCron){
            clearInterval(this._iCron);
        }
        this._iCron = null;

    }

    public toStartCron(){

        if(this._iCron){
            this.toStopCron();
        }

        var self = this;
        self._toCron();
        this._iCron = setInterval( function(){
            self._toCron();
        }, self._timeCron );
        
    }

    private _toCron(){
        this._get_heart();
    }


    private _get_authHeader(){
        return {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ this._access_token
        };
    }


    /*private _get_userData() {

        var headers = new HttpHeaders(this._get_authHeader());
        return this.http.get('https://api.fitbit.com/1/user/-/profile.json', 
            {headers: headers}).map( res => res );

    }*/


    private _get_heart() {

        var headers = new HttpHeaders(this._get_authHeader());
        var _self = this;

     
        this.http.get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/00:00/23:59.json',
            {headers: headers})
                .subscribe((timeSeries) => {

                if(_self._stayWaiting) _self._valuate_error({status:1002});


                if( timeSeries['activities-heart-intraday'] !== undefined  ){

                    _self._tsAHI = timeSeries['activities-heart-intraday'].dataset.map(
                        function(measurement) {
                            var a =    {
                                            name: measurement.time,
                                            value: measurement.value
                                        };
                            return a;
                        }
                    );

                }

                _self._get_sleep();

            }, (error: HttpErrorResponse ) => {
               _self._valuate_error(error);
            });
    }




    private _get_sleep() {

        var headers = new HttpHeaders(this._get_authHeader());
        var _self = this;

        var dNow = this.get_strDate();

        this.http.get('https://api.fitbit.com/1.2/user/-/sleep/date/'+dNow+'/'+dNow+'.json',
            {headers: headers}).subscribe((sleeps) => {

                if(_self._stayWaiting) _self._valuate_error({status:1002});

                if(sleeps["sleep"] !== undefined){
                    if (sleeps["sleep"][0] !== undefined){
                        var len = sleeps["sleep"].length-1;
                        _self._fbsleep.starttime = sleeps["sleep"][len]["startTime"];
                        _self._fbsleep.endtime = sleeps["sleep"][len]["endTime"];
                         _self._fbsleep.timeinbed = 0;
                         _self._fbsleep.minutesawake = 0;
                        for (var i = len; i >= 0; i--) {
                            _self._fbsleep.timeinbed +=    sleeps["sleep"][i]["timeInBed"];
                            _self._fbsleep.minutesawake += sleeps["sleep"][i]["minutesAwake"]
                        }

                    }else{

                        _self._fbsleep.timeinbed = sleeps["sleep"]["timeInBed"];
                        _self._fbsleep.starttime = sleeps["sleep"]["startTime"];
                        _self._fbsleep.endtime = sleeps["sleep"]["endTime"];
                        _self._fbsleep.minutesawake = sleeps["sleep"]["minutesAwake"];

                    }
                }

                // _self._get_steps();

            }, (error: HttpErrorResponse ) => {
               _self._valuate_error(error);
            });

    }


/*
    private _get_steps() {

        var headers = new HttpHeaders(this._get_authHeader());
        var _self = this;

        var dNow = this.get_strDate();

        this.http.get('https://api.fitbit.com/1/user/-/activities/date/'+dNow+'.json',
            {headers: headers}).subscribe((steps) => {

                if(_self._stayWaiting) _self._valuate_error({status:1002});

                if(steps["summary"] !== undefined){
                    _self._fbsteps.steps = steps["summary"]["steps"];
                    _self._fbsteps.steps_goal = steps["goals"]["steps"];
                    _self._fbsteps.distance_goal =steps["goals"]["distance"];
                    for (var i = steps["summary"]["distances"].length - 1; i >= 0; i--) {
                        if(steps["summary"]["distances"][i]["activity"]=="total")
                            _self._fbsteps.distance = steps["summary"]["distances"][i]["distance"];
                    }
                    _self._fbsteps.calories_goal =steps["goals"]["caloriesOut"];
                    _self._fbsteps.calories =steps["summary"]["caloriesOut"];
                    _self._fbsteps.minutes =steps["summary"]["veryActiveMinutes"];
                    _self._fbsteps.minutes_goal =steps["goals"]["activeMinutes"];

                     console.log( _self._fbsteps  );
                }

            }, (error: HttpErrorResponse ) => {
               _self._valuate_error(error);
            });

    }




    public steps(): FBSteps {

        return this._fbsteps;


    }*/

    public sleep(): FBSleep {

        return this._fbsleep;


    }

    public tsAHI(){
        return this._tsAHI;
    }



    showAlert(message) {
        let alert = this.alertCtrl.create({
            title: 'FitBit',
            subTitle: message,
            buttons: ['OK']
        });
        
        alert.present();
    }


    have_bracelet(){
        return this._global.client_id == "" || this._global.client_id == null || this._global.client_id == undefined
                    ?    false
                    :    true;
    }



}
