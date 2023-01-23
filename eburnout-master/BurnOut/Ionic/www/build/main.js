webpackJsonp([8],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalProvider = (function () {
    function GlobalProvider() {
        this.questions = [];
        this.recommendations = [];
        this.usuario = [];
        this.resultadosPreguntas = [];
        this.client_id = "";
        this.client_secret = "";
        this.access_token = "";
        this.resultadoPreguntas = { ae: 0, d: 0, rp: 0, q: '' };
    }
    GlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], GlobalProvider);
    return GlobalProvider;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/camara/camara.module": [
		466,
		16
	],
	"../pages/dashboard/dashboard.module": [
		467,
		10
	],
	"../pages/encuesta/encuesta.module": [
		468,
		15
	],
	"../pages/login/login.module": [
		469,
		11
	],
	"../pages/recomendacion/recomendacion.module": [
		471,
		14
	],
	"../pages/registro/registro.module": [
		470,
		13
	],
	"../pages/tab-general/tab-general.module": [
		472,
		12
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 191;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(243);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatabaseProvider = (function () {
    function DatabaseProvider(http, db) {
        this.http = http;
        this.db = db;
    }
    /* CONSULTA PREGUNTAS */
    DatabaseProvider.prototype.preguntas = function () {
        return this.db.list('/questions').valueChanges();
    };
    /* FIN CONSULTA PREGUNTAS */
    /* CONSULTA RECOMENDACIONES */
    DatabaseProvider.prototype.recomendaciones = function () {
        return this.db.list('/recommendations').valueChanges();
    };
    /* FIN CONSULTA RECOMENDACIONES */
    /* CONSULTA ESPECIALIDADES */
    DatabaseProvider.prototype.especialidades = function () {
        return this.db.list('/especialidades').valueChanges();
    };
    /* FIN CONSULTA ESPECIALIDADES */
    /* CONSULTA REGISTRO USUARIO BD */
    DatabaseProvider.prototype.registroUsuarioBD = function (usuario) {
        this.db.database.ref('/usuarios/' + usuario.id).set(usuario);
    };
    /* FIN CONSULTA REGISTRO USUARIO BD */
    /* CONSULTA USUARIO REGISTRADO BD */
    DatabaseProvider.prototype.usuarioRegistradoBD = function (idUsuario) {
        return this.db.object('/usuarios/' + idUsuario).valueChanges();
    };
    /* FIN CONSULTA USUARIO REGISTRADO BD */
    /* CONSULTA GUARDAR ULTIMA ENCUESTA */
    DatabaseProvider.prototype.guardarUltimaEncuesta = function (idUsuario, resultadoPreguntas) {
        this.db.database.ref('/usuarios/' + idUsuario + '/ultimaencuesta').set(resultadoPreguntas);
    };
    /* FIN CONSULTA GUARDAR ULTIMA ENCUESTA */
    /* CONSULTA GUARDAR ENCUESTA */
    DatabaseProvider.prototype.guardarEncuesta = function (idUsuario, resultadoPreguntas) {
        this.db.database.ref('/encuestas').push({ id: idUsuario, encuesta: resultadoPreguntas });
    };
    /* FIN CONSULTA GUARDAR ENCUESTA */
    /* CONSULTA ULTIMAS 3 ENCUESTA */
    DatabaseProvider.prototype.encuestasUltimas = function (idUsuario) {
        return this.db.list('/encuestas/', function (encuestas) { return encuestas.orderByChild('id').equalTo(idUsuario).limitToLast(3); }).valueChanges();
    };
    /* FIN CONSULTA ULTIMAS 3 ENCUESTA */
    /* CONSULTA GUARDAR ENCUESTA */
    DatabaseProvider.prototype.guardarEstadoAnimo = function (idUsuario, estadoAnimo) {
        this.db.database.ref('/estadosanimo').push({ id: idUsuario, estado: estadoAnimo });
    };
    /* FIN CONSULTA GUARDAR ENCUESTA */
    /* CONSULTA FOTO CLOUD VIDION */
    DatabaseProvider.prototype.consultaFoto = function (foto) {
        var body = {
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
        };
        return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + 'AIzaSyB_mk7PfJCwuHBCw51P4juWqxBJdwVEG5o', body);
    };
    /* FIN CONSULTA FOTO CLOUD VIDION */
    /* CONSULTA DEL CLIENT_ID DEL USUARIO */
    DatabaseProvider.prototype.idClientFitBit = function (idUsuario) {
        return this.db.list('/fbclient/', function (referencia) { return referencia.orderByChild('id').equalTo(idUsuario); }).valueChanges();
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FitBitServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_config__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_fbsleep__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__global_global__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
 // HttpHeaders ha sido importado para poder usar en el request.

 // Haceo un mapeo del post y/o get



 // Pre- cargala application
 // Model, para instanciar la información del usuario




var FitBitServiceProvider = (function () {
    function FitBitServiceProvider(http, // get y post
        platform, alertCtrl, _global, _storage, _sqlite) {
        // localStorage.setItem('fb_access_token','');
        var _this = this;
        this.http = http;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this._global = _global;
        this._storage = _storage;
        this._sqlite = _sqlite;
        this._renew_token = false;
        this._access_token = "";
        // ID CLIENT FOR ACCESS PERSONAL DATA IN FITBIT
        this._client_id = "";
        this._client_secret = "";
        this._iCron = null;
        this._timeCron = 5000;
        // Series de tiempo activity heart
        this._tsAHI = [];
        this._stayWaiting = false;
        this._db = null;
        this._id = 0;
        this._db_client_id = "";
        this._fbsleep = new __WEBPACK_IMPORTED_MODULE_7__models_fbsleep__["a" /* FBSleep */](0, "", "", 0);
        this.errorObserver = null;
        this.error = __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.errorObserver = observer;
        });
        this._set_time_cron();
        this._oninit();
    }
    FitBitServiceProvider.prototype._oninit = function () {
        var _self = this;
        this._createDatabase().then(function (success) {
            // _self.showAlert(JSON.stringify(success));
            var _token = "";
            if (success[0] !== undefined) {
                _self._id = success[0]["id"];
                _self._db_client_id = success[0]["client_id"];
                if (_self._db_client_id == _self._global.client_id) {
                    _token = success[0]["token"];
                }
                else {
                    _token = "";
                }
            }
            _self._client_id = _self._db_client_id;
            _self._storage.set('fb_client_id', _self._db_client_id);
            _self._access_token = _token;
            _self._storage.set('fb_access_token', _token);
            _self._load_vars();
            _self._valuate_error({ error: '', status: 1020 });
            //return Promise.resolve( {error:'',status:1020} );
        }, function (error) {
            _self.showAlert(JSON.stringify(error));
            // Promise.reject( error );
        });
    };
    FitBitServiceProvider.prototype._createDatabase = function () {
        var _self = this;
        return this._sqlite.create({
            name: 'eburnout.db',
            location: 'default' // the location field is required
        })
            .then(function (db) {
            _self._setDatabase(db);
            _self._createTable();
            return _self._getClient();
        })
            .catch(function (error) {
            _self.showAlert(JSON.stringify(error));
            Promise.reject(error);
        });
    };
    FitBitServiceProvider.prototype._setDatabase = function (db) {
        if (this._db === null) {
            this._db = db;
        }
    };
    FitBitServiceProvider.prototype._create = function (token) {
        var sql = 'INSERT INTO client(token,client_id) VALUES(?,?)';
        return this._db.executeSql(sql, [token, this._client_id]);
    };
    /*private _deleteTable(){
        let sql = 'DROP TABLE IF EXISTS client';
        return this._db.executeSql(sql, []);
    }*/
    FitBitServiceProvider.prototype._createTable = function () {
        var sql = 'CREATE TABLE IF NOT EXISTS client(id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT,client_id VARCHAR(6))';
        return this._db.executeSql(sql, []);
    };
    /*private _delete(id: any){
        let sql = 'DELETE FROM client WHERE id=?';
        return this._db.executeSql(sql, [id]);
    }*/
    FitBitServiceProvider.prototype._getClient = function () {
        var sql = 'SELECT * FROM client WHERE id=1';
        return this._db.executeSql(sql, [])
            .then(function (response) {
            var arrClient = [];
            for (var index = 0; index < response.rows.length; index++) {
                arrClient.push(response.rows.item(index));
            }
            return Promise.resolve(arrClient);
        })
            .catch(function (error) { return Promise.reject(error); });
    };
    FitBitServiceProvider.prototype._update = function (token, id) {
        var sql = 'UPDATE client SET token=?, client_id=? WHERE id=?';
        return this._db.executeSql(sql, [token, this._client_id, id]);
    };
    FitBitServiceProvider.prototype._set_time_cron = function () {
        var t_in_ms = __WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].rate_limit <= 0 ? 150 : __WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].rate_limit;
        // Time in miliseconds to cronjob
        this._timeCron = t_in_ms / 60 * 60 * 1000;
    };
    FitBitServiceProvider.prototype._load_vars = function () {
        var _self = this;
        if (this._global.client_id) {
            _self._storage.get('fb_client_id').then(function (client_id) {
                _self._client_id = client_id ? client_id : "";
            });
            _self._storage.get('fb_access_token').then(function (val) {
                _self._access_token = val ? val : "";
            });
            _self._storage.get('fb_client_secret').then(function (client_secret) {
                _self._client_secret = client_secret ? client_secret : "";
            });
        }
    };
    FitBitServiceProvider.prototype._get_url = function () {
        __WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].body.client_id = this._global.client_id;
        return __WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].url + "?" + Object.keys(__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].body).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].body[k]);
        }).join('&');
    };
    FitBitServiceProvider.prototype.get_strDate = function (sDate, sFormat) {
        if (sDate === void 0) { sDate = ""; }
        if (sFormat === void 0) { sFormat = ""; }
        var date;
        if (sDate.length) {
            date = new Date(sDate);
        }
        else {
            date = new Date();
        }
        var day = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        if (sFormat == "HH:mm:ss")
            return date.getHours().toString() + ":" + minutes + ":" + date.getSeconds().toString();
        else if (sFormat == "dd-mm-yyyy")
            return day + "-" + month + "-" + date.getFullYear().toString();
        else
            return date.getFullYear().toString() + "-" + month + "-" + day;
    };
    FitBitServiceProvider.prototype._getAuthPermission = function () {
        // Metodos observables, si pasa algo X, doy la promesa de regresar con algo.
        var self = this;
        return new Promise(function (resolve, reject) {
            if (self._db_client_id == self._global.client_id) {
                self._renew_token = false;
            }
            else {
                self._renew_token = true;
            }
            var navigator_clean = self._renew_token ? ",clearsessioncache=yes,clearcache=yes" : "";
            // self.showAlert("a renew => "+navigator_clean);
            if (window.cordova != undefined) {
                var browser_1 = window.cordova.InAppBrowser.open(self._get_url(), '_blank', 'location=no' + navigator_clean);
                browser_1.addEventListener('loadstart', function (event) {
                    if ((event.url).indexOf(__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].body.redirect_uri) === 0) {
                        browser_1.removeEventListener('exit', function () { });
                        browser_1.close();
                        var responseParameters = (((event.url).split(__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].key_access_token)[1]).split("&")[0]).split('=')[1];
                        var parsedResponse = {};
                        var defaultError = { error: 'Problem authenticating with FitBit', status: 1010 };
                        if (responseParameters !== undefined && responseParameters !== null) {
                            parsedResponse[__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].key_access_token] = responseParameters;
                            resolve(parsedResponse);
                        }
                        else {
                            reject(defaultError);
                        }
                    }
                });
                browser_1.addEventListener('exit', function (event) {
                    reject({ error: 'The FitBit authorization in flow was canceled', status: 1010 });
                });
            }
            else {
                window.open(self._get_url(), '_blank', 'location=no' + navigator_clean);
                resolve({ "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MjVLOTkiLCJhdWQiOiIyMkNHODQiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJwcm8gcm51dCByc2xlIiwiZXhwIjoxNTE1MDc4MTQzLCJpYXQiOjE1MTQ5OTg2ODB9.j6YhSfy7123wFYVsF0b9PNKm8sVihjplrUV_r6kBXuE" });
            }
        });
    };
    FitBitServiceProvider.prototype._toAutorizate = function () {
        var _this = this;
        var self = this;
        this._getAuthPermission().then(function (success) {
            if (success[__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].key_access_token] !== undefined) {
                self._access_token = success[__WEBPACK_IMPORTED_MODULE_5__auth_config__["a" /* AuthConfig */].key_access_token];
                self._renew_token = false;
                self._client_id = self._global.client_id;
                if (self._id) {
                    self._update(self._access_token, self._id);
                }
                else {
                    self._create(self._access_token);
                }
                self._client_secret = self._global.client_secret;
                self._storage.set('fb_client_id', self._client_id);
                self._storage.set('fb_client_secret', self._client_secret);
                //localStorage.setItem('fb_access_token', self._access_token);
                _this._global.access_token = self._access_token;
                self._storage.set('fb_access_token', self._access_token);
                self._valuate_error({ status: 1001 });
            }
        }, function (error) {
            self.showAlert(JSON.stringify(error));
            self._valuate_error(error);
        });
    };
    FitBitServiceProvider.prototype.check_auth = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this._load_vars();
            if (!_this._access_token.trim().length && _this.have_bracelet()) {
                _this._toAutorizate();
            }
            else {
                _this._valuate_error({ status: 1001 });
            }
        });
    };
    FitBitServiceProvider.prototype._valuate_error = function (error) {
        this.errorObserver.next(error);
        if (error.status != undefined) {
            if (error.status == 400 || error.status == 401) {
                // Authorization code invalid
                this.toStopCron();
                //localStorage.setItem('fb_access_token',null);
                this._global.access_token = "";
                this._storage.set('fb_access_token', "");
                this._load_vars();
                this._toAutorizate();
            }
            else if (error.status == 429) {
                this._stayWaiting = true;
            }
            else if (error.status == 1002) {
                this._stayWaiting = false;
            }
        }
    };
    FitBitServiceProvider.prototype.toStopCron = function () {
        if (this._iCron) {
            clearInterval(this._iCron);
        }
        this._iCron = null;
    };
    FitBitServiceProvider.prototype.toStartCron = function () {
        if (this._iCron) {
            this.toStopCron();
        }
        var self = this;
        self._toCron();
        this._iCron = setInterval(function () {
            self._toCron();
        }, self._timeCron);
    };
    FitBitServiceProvider.prototype._toCron = function () {
        this._get_heart();
    };
    FitBitServiceProvider.prototype._get_authHeader = function () {
        return {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + this._access_token
        };
    };
    /*private _get_userData() {

        var headers = new HttpHeaders(this._get_authHeader());
        return this.http.get('https://api.fitbit.com/1/user/-/profile.json',
            {headers: headers}).map( res => res );

    }*/
    FitBitServiceProvider.prototype._get_heart = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */](this._get_authHeader());
        var _self = this;
        this.http.get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1sec/time/00:00/23:59.json', { headers: headers })
            .subscribe(function (timeSeries) {
            if (_self._stayWaiting)
                _self._valuate_error({ status: 1002 });
            if (timeSeries['activities-heart-intraday'] !== undefined) {
                _self._tsAHI = timeSeries['activities-heart-intraday'].dataset.map(function (measurement) {
                    var a = {
                        name: measurement.time,
                        value: measurement.value
                    };
                    return a;
                });
            }
            _self._get_sleep();
        }, function (error) {
            _self._valuate_error(error);
        });
    };
    FitBitServiceProvider.prototype._get_sleep = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */](this._get_authHeader());
        var _self = this;
        var dNow = this.get_strDate();
        this.http.get('https://api.fitbit.com/1.2/user/-/sleep/date/' + dNow + '/' + dNow + '.json', { headers: headers }).subscribe(function (sleeps) {
            if (_self._stayWaiting)
                _self._valuate_error({ status: 1002 });
            if (sleeps["sleep"] !== undefined) {
                if (sleeps["sleep"][0] !== undefined) {
                    var len = sleeps["sleep"].length - 1;
                    _self._fbsleep.starttime = sleeps["sleep"][len]["startTime"];
                    _self._fbsleep.endtime = sleeps["sleep"][len]["endTime"];
                    _self._fbsleep.timeinbed = 0;
                    _self._fbsleep.minutesawake = 0;
                    for (var i = len; i >= 0; i--) {
                        _self._fbsleep.timeinbed += sleeps["sleep"][i]["timeInBed"];
                        _self._fbsleep.minutesawake += sleeps["sleep"][i]["minutesAwake"];
                    }
                }
                else {
                    _self._fbsleep.timeinbed = sleeps["sleep"]["timeInBed"];
                    _self._fbsleep.starttime = sleeps["sleep"]["startTime"];
                    _self._fbsleep.endtime = sleeps["sleep"]["endTime"];
                    _self._fbsleep.minutesawake = sleeps["sleep"]["minutesAwake"];
                }
            }
            // _self._get_steps();
        }, function (error) {
            _self._valuate_error(error);
        });
    };
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
    FitBitServiceProvider.prototype.sleep = function () {
        return this._fbsleep;
    };
    FitBitServiceProvider.prototype.tsAHI = function () {
        return this._tsAHI;
    };
    FitBitServiceProvider.prototype.showAlert = function (message) {
        var alert = this.alertCtrl.create({
            title: 'FitBit',
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    FitBitServiceProvider.prototype.have_bracelet = function () {
        return this._global.client_id == "" || this._global.client_id == null || this._global.client_id == undefined
            ? false
            : true;
    };
    FitBitServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])() // Decorator
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_sqlite__["a" /* SQLite */]])
    ], FitBitServiceProvider);
    return FitBitServiceProvider;
}());

//# sourceMappingURL=fit-bit-service.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(313);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_common_http__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_global_global__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_database_database__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_fit_bit_service_fit_bit_service__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_echarts__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_sqlite__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var firebaseConfig = {
    apiKey: "AIzaSyA0mnZssyqo5PieFUUBTipdU9VB9uh0Xvo",
    authDomain: "my-first-project-7d187.firebaseapp.com",
    databaseURL: "https://my-first-project-7d187.firebaseio.com",
    projectId: "my-first-project-7d187",
    storageBucket: "my-first-project-7d187.appspot.com",
    messagingSenderId: "323245343363"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {
                    mode: 'md',
                    tabsHideOnSubPages: true,
                    scrollPadding: false,
                    scrollAssist: true,
                    autoFocusAssist: false,
                    preloadModules: true
                }, {
                    links: [
                        { loadChildren: '../pages/consentimiento/consentimiento.module#ConsentimientoPageModule', name: 'ConsentimientoPage', segment: 'consentimiento', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/camara/camara.module#CamaraPageModule', name: 'CamaraPage', segment: 'camara', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dashboard/dashboard.module#DashboardPageModule', name: 'DashboardPage', segment: 'dashboard', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/encuesta/encuesta.module#EncuestaPageModule', name: 'EncuestaPage', segment: 'encuesta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/registro/registro.module#RegistroPageModule', name: 'RegistroPage', segment: 'registro', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/recomendacion/recomendacion.module#RecomendacionPageModule', name: 'RecomendacionPage', segment: 'recomendacion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tab-general/tab-general.module#TabGeneralPageModule', name: 'TabGeneralPage', segment: 'tab-general', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_15_ngx_echarts__["a" /* NgxEchartsModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_12__providers_global_global__["a" /* GlobalProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_fit_bit_service_fit_bit_service__["a" /* FitBitServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_sqlite__["a" /* SQLite */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthConfig; });
var AuthConfig = {
    // Url of the Identity Provider
    url: "https://www.fitbit.com/oauth2/authorize",
    // allow request per hour 
    rate_limit: 150,
    key_access_token: "access_token",
    body: {
        // URL to redirect the user to after login
        redirect_uri: "https://localhost:8100/eburnout_callback",
        // The client id
        client_id: "",
        // set the scope for the permissions the client should request
        scope: "activity nutrition heartrate location nutrition profile settings sleep social weight",
        // set the response type, token or code
        response_type: "token",
        expires_in: "600" // "604800"
    }
};
//# sourceMappingURL=auth-config.js.map

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FBSleep; });
// del tiempo en cama se le puede restart el tiempo awake para presentar en pantalla
var FBSleep = (function () {
    function FBSleep(timeinbed, starttime, endtime, minutesawake) {
        this.timeinbed = timeinbed;
        this.starttime = starttime;
        this.endtime = endtime;
        this.minutesawake = minutesawake;
    }
    return FBSleep;
}());

//# sourceMappingURL=fbsleep.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(287);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = 'LoginPage';
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/myApp/src/app/app.html"*/'\n<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/myApp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[293]);
//# sourceMappingURL=main.js.map