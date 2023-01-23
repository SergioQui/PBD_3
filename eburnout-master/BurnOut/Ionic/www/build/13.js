webpackJsonp([13],{

/***/ 1101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegistroPage = (function () {
    function RegistroPage(navCtrl, navParams, database, toastCtrl, global) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.database = database;
        this.toastCtrl = toastCtrl;
        this.global = global;
        this.especialidades = [];
        this.idUsuario = this.navParams.get('idUsuario');
        this.email = this.navParams.get('email');
        this.password = this.navParams.get('password');
        this.observable = this.database.especialidades().subscribe(function (especialidades) {
            _this.especialidades = especialidades;
        });
        this.numRegistro = 1;
        this.pesos = [];
        this.alturas = [];
        this.anosLaborales = [];
        for (var i = 40; i <= 180; i++) {
            this.pesos.push(i);
        }
        for (var i = 130; i <= 220; i++) {
            this.alturas.push(i);
        }
        for (var i = 0; i <= 40; i++) {
            this.anosLaborales.push(i);
        }
    }
    RegistroPage.prototype.ionViewDidLoad = function () {
    };
    /* CLICK BOTON */
    RegistroPage.prototype.clickBoton = function () {
        switch (this.numRegistro) {
            case 1:
                if (this.edad != null && this.sexo != null && this.estadocivil != null && this.hijos != null
                    && this.altura != null && this.peso != null) {
                    this.numRegistro = 2;
                }
                else {
                    this.toast();
                }
                break;
            case 2:
                if (this.especialidad != null && this.tipocontrato != null && this.tiempoplazaactual != null
                    && this.tiempovidalaboral != null && this.tipotrabajo != null && (this.anosresidente != null || this.contratoadjunto != null)) {
                    this.numRegistro = 3;
                }
                else {
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
                }
                else {
                    this.toast();
                }
                break;
        }
    };
    /* FIN CLICK BOTON */
    /* TOAST MENSAJE LOGIN ERROR */
    RegistroPage.prototype.toast = function () {
        var toastMensaje = this.toastCtrl.create({
            message: 'Rellene todo los campos',
            duration: 2500,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toastMensaje.present();
    };
    /* FIN TOAST MENSAJE LOGIN ERROR */
    RegistroPage.prototype.ionViewWillUnload = function () {
        this.observable.unsubscribe();
    };
    RegistroPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registro',template:/*ion-inline-start:"/myApp/src/pages/registro/registro.html"*/'<!-->HEADER</!-->\n<ion-header>\n  <div>\n    <ion-navbar>\n      <ion-title>Registro {{ numRegistro }}/3</ion-title>\n    </ion-navbar>\n  </div>\n</ion-header>\n<!-->FIN HEADER</!-->\n\n<!-->CONTENT</!-->\n<ion-content padding>\n  <div *ngIf="numRegistro == 1">\n    <p class="titulo">¿Cuentanos un poquito de ti?</p>\n    <ion-item>\n      <ion-label>Edad</ion-label>\n      <ion-select [(ngModel)]="edad" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="20-24">20-24</ion-option>\n        <ion-option value="25-29">25-29</ion-option>\n        <ion-option value="30-34">30-34</ion-option>\n        <ion-option value="35-39">35-39</ion-option>\n        <ion-option value="40-44">40-44</ion-option>\n        <ion-option value="45-49">45-49</ion-option>\n        <ion-option value="50-54">50-54</ion-option>\n        <ion-option value="55-59">55-59</ion-option>\n        <ion-option value="60-64">60-64</ion-option>\n        <ion-option value="65-69">65-69</ion-option>\n        <ion-option value="70-75">70-75</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Sexo</ion-label>\n      <ion-select [(ngModel)]="sexo" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="hombre">Hombre</ion-option>\n        <ion-option value="mujer">Mujer</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Estado civil</ion-label>\n      <ion-select [(ngModel)]="estadocivil" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="casado">Casad@</ion-option>\n        <ion-option value="soltero">Solter@</ion-option>\n        <ion-option value="divorciado">Divorciad@</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Hij@s</ion-label>\n      <ion-select [(ngModel)]="hijos" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="0">0</ion-option>\n        <ion-option value="1">1</ion-option>\n        <ion-option value="2">2</ion-option>\n        <ion-option value="3">3</ion-option>\n        <ion-option value="+3">+3</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Altura</ion-label>\n      <ion-select [(ngModel)]="altura" okText="Aceptar" cancelText="Cancelar">\n        <ion-option *ngFor="let altura of alturas" value="{{altura}}">{{ altura }} cm</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Peso</ion-label>\n      <ion-select [(ngModel)]="peso" okText="Aceptar" cancelText="Cancelar">\n        <ion-option *ngFor="let peso of pesos" value="{{peso}}">{{ peso }} kg</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n  <div *ngIf="numRegistro == 2">\n    <p class="titulo">¿A qué te dedicas?</p>\n    <ion-item>\n      <ion-label>Especialidad</ion-label>\n      <ion-select [(ngModel)]="especialidad" okText="Aceptar" cancelText="Cancelar">\n        <ion-option *ngFor="let especialidad of especialidades" value="{{especialidad}}">{{ especialidad }}</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Tipo de contrato</ion-label>\n      <ion-select [(ngModel)]="tipocontrato" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="residente">Residente</ion-option>\n        <ion-option value="adjunto">Adjunto</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="tipocontrato == \'residente\'">\n      <ion-label>Años de residente</ion-label>\n      <ion-select [(ngModel)]="anosresidente" okText="Aceptar" cancelText="Cancelar">\n        <ion-option *ngFor="let anoLaboral of anosLaborales" value="{{anoLaboral}}">\n          {{ anoLaboral }}\n          <span *ngIf="anoLaboral == 1">año</span>\n          <span *ngIf="anoLaboral != 1">años</span>\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="tipocontrato == \'adjunto\'">\n      <ion-label>Contrato adjunto</ion-label>\n      <ion-select [(ngModel)]="contratoadjunto" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="eventual">Eventual</ion-option>\n        <ion-option value="interino">Interino</ion-option>\n        <ion-option value="fijo">Fijo</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Tiempo en la plaza actual</ion-label>\n      <ion-select [(ngModel)]="tiempoplazaactual" okText="Aceptar" cancelText="Cancelar">\n        <ion-option *ngFor="let anoLaboral of anosLaborales" value="{{anoLaboral}}">\n          {{ anoLaboral }}\n          <span *ngIf="anoLaboral == 1">año</span>\n          <span *ngIf="anoLaboral != 1">años</span>\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Tiempo de vida laboral</ion-label>\n      <ion-select [(ngModel)]="tiempovidalaboral" okText="Aceptar" cancelText="Cancelar">\n        <ion-option *ngFor="let anoLaboral of anosLaborales" value="{{anoLaboral}}">\n          {{ anoLaboral }}\n          <span *ngIf="anoLaboral == 1">año</span>\n          <span *ngIf="anoLaboral != 1">años</span>\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Tipo de trabajo</ion-label>\n      <ion-select [(ngModel)]="tipotrabajo" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="hospitalario">Hospitalario</ion-option>\n        <ion-option value="ambulatorio">Ambulatorio</ion-option>\n        <ion-option value="urgencias">Urgencias</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n  <div *ngIf="numRegistro == 3">\n    <p class="titulo">¿Que haces en tu tiempo libre?</p>\n    <ion-item>\n      <ion-label>Haces ejercicio físico</ion-label>\n      <ion-select [(ngModel)]="ejerciciofisico" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="habitualmente">Habitualmente</ion-option>\n        <ion-option value="ocasionalmente">Ocasionalmente</ion-option>\n        <ion-option value="nunca">Nunca</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Lees</ion-label>\n      <ion-select [(ngModel)]="lectura" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="habitualmente">Habitualmente</ion-option>\n        <ion-option value="ocasionalmente">Ocasionalmente</ion-option>\n        <ion-option value="nunca">Nunca</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Escuchas música</ion-label>\n      <ion-select [(ngModel)]="musica" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="habitualmente">Habitualmente</ion-option>\n        <ion-option value="ocasionalmente">Ocasionalmente</ion-option>\n        <ion-option value="nunca">Nunca</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Sales socialmente</ion-label>\n      <ion-select [(ngModel)]="salessocialmente" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="habitualmente">Habitualmente</ion-option>\n        <ion-option value="ocasionalmente">Ocasionalmente</ion-option>\n        <ion-option value="nunca">Nunca</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Viajas</ion-label>\n      <ion-select [(ngModel)]="viajas" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="-5">Menos de 5 veces al año</ion-option>\n        <ion-option value="+5">Mas de 5 veces al año</ion-option>\n        <ion-option value="nunca">Nunca</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Estudias</ion-label>\n      <ion-select [(ngModel)]="estudias" okText="Aceptar" cancelText="Cancelar">\n        <ion-option value="habitualmente">Habitualmente</ion-option>\n        <ion-option value="ocasionalmente">Ocasionalmente</ion-option>\n        <ion-option value="nunca">Nunca</ion-option>\n      </ion-select>\n    </ion-item>\n  </div>\n  <button ion-button (click)="clickBoton()" class="btn-1">\n    Siguiente\n  </button>\n</ion-content>\n<!-->FIN CONTENT</!-->'/*ion-inline-end:"/myApp/src/pages/registro/registro.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */]])
    ], RegistroPage);
    return RegistroPage;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroPageModule", function() { return RegistroPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registro__ = __webpack_require__(1101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegistroPageModule = (function () {
    function RegistroPageModule() {
    }
    RegistroPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__registro__["a" /* RegistroPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__registro__["a" /* RegistroPage */]),
            ],
        })
    ], RegistroPageModule);
    return RegistroPageModule;
}());

//# sourceMappingURL=registro.module.js.map

/***/ })

});
//# sourceMappingURL=13.js.map