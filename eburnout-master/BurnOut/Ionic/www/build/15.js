webpackJsonp([15],{

/***/ 1096:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EncuestaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_database_database__ = __webpack_require__(289);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EncuestaPage = (function () {
    function EncuestaPage(navCtrl, global, database) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.database = database;
        this.resultadoPreguntas = { ae: 0, d: 0, rp: 0, q: '' };
        this.indicePregunta = 0;
        this.formulario = { mensaje: '' };
    }
    EncuestaPage.prototype.ionViewDidLoad = function () {
    };
    /* RESPUESTA DE CADA PREGUNTA */
    EncuestaPage.prototype.respuesta = function (idRespuesta) {
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
    };
    /* FIN RESPUESTA DE CADA PREGUNTA */
    /* TERMINAR ENCUESTA */
    EncuestaPage.prototype.terminar = function () {
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
    };
    EncuestaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-encuesta',template:/*ion-inline-start:"/myApp/src/pages/encuesta/encuesta.html"*/'<!-->HEADER</!-->\n<ion-header>\n  <div>\n    <ion-navbar>\n      <ion-title>Encuesta</ion-title>\n    </ion-navbar>\n  </div>\n</ion-header>\n<!-->FIN HEADER</!-->\n\n<!-->CONTENT</!-->\n<ion-content>\n  <p class="num-pregunta">{{ indicePregunta + 1 }} de {{ this.global.questions.length }}</p>\n  <div class="contenedor">\n    <div class="bloque-pregunta">\n      <p class="pregunta">{{ global.questions[indicePregunta].question }}</p>\n    </div>\n    <span *ngIf="global.questions[indicePregunta].type != \'Q\'; then bloqueRespuestas else bloqueInput"></span>\n    <ng-template #bloqueRespuestas>\n      <button ion-button icon-only (click)="respuesta(0)" style="background: #A10E2F" class="btn-respuesta">\n        NUNCA\n      </button>\n      <button ion-button icon-only (click)="respuesta(1)" style="background: #82613C" class="btn-respuesta">\n        Algunas veces al AÑO\n      </button>\n      <button ion-button icon-only (click)="respuesta(2)" style="background: #F59A00" class="btn-respuesta">\n        Una vez a MES\n      </button>\n      <button ion-button icon-only (click)="respuesta(3)" style="background: #EB5D13" class="btn-respuesta">\n        Algunas veces al MES\n      </button>\n      <button ion-button icon-only (click)="respuesta(4)" style="background: #2499D3" class="btn-respuesta">\n        Una vez a la SEMANA\n      </button>\n      <button ion-button icon-only (click)="respuesta(5)" style="background: #347193" class="btn-respuesta">\n        Algunas veces a la SEMANA\n      </button>\n      <button ion-button icon-only (click)="respuesta(6)" style="background: #70A63B" class="btn-respuesta">\n        DIARIAMENTE\n      </button>\n    </ng-template>\n    <ng-template #bloqueInput>\n      <form (ngSubmit)="terminar()" class="formulario">\n        <ion-item>\n          <ion-textarea [(ngModel)]="formulario.mensaje" name="mensaje" rows="6" placeholder="Mensaje opcional"></ion-textarea>\n        </ion-item>\n        <button ion-button type="submit" class="btn-1">Terminar</button>\n      </form>\n    </ng-template>\n  </div>\n</ion-content>\n<!-->FIN CONTENT</!-->'/*ion-inline-end:"/myApp/src/pages/encuesta/encuesta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_database_database__["a" /* DatabaseProvider */]])
    ], EncuestaPage);
    return EncuestaPage;
}());

//# sourceMappingURL=encuesta.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EncuestaPageModule", function() { return EncuestaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__encuesta__ = __webpack_require__(1096);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EncuestaPageModule = (function () {
    function EncuestaPageModule() {
    }
    EncuestaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__encuesta__["a" /* EncuestaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__encuesta__["a" /* EncuestaPage */]),
            ],
        })
    ], EncuestaPageModule);
    return EncuestaPageModule;
}());

//# sourceMappingURL=encuesta.module.js.map

/***/ })

});
//# sourceMappingURL=15.js.map