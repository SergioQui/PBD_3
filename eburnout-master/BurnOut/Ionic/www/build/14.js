webpackJsonp([14],{

/***/ 1102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RecomendacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_global__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var RecomendacionPage = (function () {
    function RecomendacionPage(global) {
        this.global = global;
        this.cansancioEmocional = 'Realiza la encuesta para saber tu recomendación';
        this.despersonalizacion = 'Realiza la encuesta para saber tu recomendación';
        this.realizacionPersonal = 'Realiza la encuesta para saber tu recomendación';
    }
    RecomendacionPage.prototype.ionViewDidLoad = function () {
    };
    RecomendacionPage.prototype.ionViewWillEnter = function () {
        this.calcularNivel();
    };
    RecomendacionPage.prototype.calcularNivel = function () {
        var nivelAe = '';
        var nivelD = '';
        var nivelRp = '';
        if (this.global.resultadoPreguntas.ae > 0 && this.global.resultadoPreguntas.ae <= 18) {
            nivelAe = 'bajo';
        }
        else {
            if (this.global.resultadoPreguntas.ae > 18 && this.global.resultadoPreguntas.ae <= 26) {
                nivelAe = 'medio';
            }
            else {
                if (this.global.resultadoPreguntas.ae > 26 && this.global.resultadoPreguntas.ae <= 54) {
                    nivelAe = 'alto';
                }
            }
        }
        if (this.global.resultadoPreguntas.d > 0 && this.global.resultadoPreguntas.d <= 5) {
            nivelD = 'bajo';
        }
        else {
            if (this.global.resultadoPreguntas.d > 5 && this.global.resultadoPreguntas.d <= 9) {
                nivelD = 'medio';
            }
            else {
                if (this.global.resultadoPreguntas.d > 9 && this.global.resultadoPreguntas.d <= 30) {
                    nivelD = 'alto';
                }
            }
        }
        if (this.global.resultadoPreguntas.rp > 0 && this.global.resultadoPreguntas.rp <= 33) {
            nivelRp = 'bajo';
        }
        else {
            if (this.global.resultadoPreguntas.rp > 33 && this.global.resultadoPreguntas.rp <= 39) {
                nivelRp = 'medio';
            }
            else {
                if (this.global.resultadoPreguntas.rp > 39 && this.global.resultadoPreguntas.rp <= 48) {
                    nivelRp = 'alto';
                }
            }
        }
        for (var _i = 0, _a = this.global.recommendations; _i < _a.length; _i++) {
            var recommendation = _a[_i];
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
    };
    RecomendacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-recomendacion',template:/*ion-inline-start:"/myApp/src/pages/recomendacion/recomendacion.html"*/'<!-->HEADER</!-->\n<ion-header>\n  <div>\n    <ion-navbar>\n      <ion-title>Recomendación</ion-title>\n    </ion-navbar>\n  </div>\n</ion-header>\n<!-->FIN HEADER</!-->\n\n<!-->CONTENT</!-->\n<ion-content padding>\n  <ion-icon name="pulse" class="icono"></ion-icon>\n  <p class="titulo">Te recomendamos mejorar</p>\n  <p class="titulo-texto">CANSANCIO EMOCIONAL:</p>\n  <p class="texto">- {{ cansancioEmocional }}</p>\n  <p class="titulo-texto">DESPERSONALIZACIÓN:</p>\n  <p class="texto">- {{ despersonalizacion }}</p>\n  <p class="titulo-texto">REALIZACIÓN PERSONAL:</p>\n  <p class="texto">- {{ realizacionPersonal }}</p>\n</ion-content>\n<!-->FIN CONTENT</!-->'/*ion-inline-end:"/myApp/src/pages/recomendacion/recomendacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_global_global__["a" /* GlobalProvider */]])
    ], RecomendacionPage);
    return RecomendacionPage;
}());

//# sourceMappingURL=recomendacion.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecomendacionPageModule", function() { return RecomendacionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__recomendacion__ = __webpack_require__(1102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RecomendacionPageModule = (function () {
    function RecomendacionPageModule() {
    }
    RecomendacionPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__recomendacion__["a" /* RecomendacionPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__recomendacion__["a" /* RecomendacionPage */]),
            ],
        })
    ], RecomendacionPageModule);
    return RecomendacionPageModule;
}());

//# sourceMappingURL=recomendacion.module.js.map

/***/ })

});
//# sourceMappingURL=14.js.map