webpackJsonp([16],{

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CamaraPageModule", function() { return CamaraPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__camara__ = __webpack_require__(754);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CamaraPageModule = (function () {
    function CamaraPageModule() {
    }
    CamaraPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__camara__["a" /* CamaraPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__camara__["a" /* CamaraPage */]),
            ],
        })
    ], CamaraPageModule);
    return CamaraPageModule;
}());

//# sourceMappingURL=camara.module.js.map

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CamaraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(290);
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




var CamaraPage = (function () {
    function CamaraPage(camera, database, global) {
        this.camera = camera;
        this.database = database;
        this.global = global;
        this.foto = './assets/imgs/foto.svg';
        this.fotoConsulta = null;
        this.estadoAnimo = '';
        this.errorFoto = false;
    }
    CamaraPage.prototype.ionViewDidLoad = function () {
    };
    /* HACER FOTO DE LA CAMARA NATIVA */
    CamaraPage.prototype.hacerFoto = function () {
        var _this = this;
        var opciones = {
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            targetWidth: 512,
            targetHeight: 512,
            quality: 100,
            correctOrientation: true
        };
        this.camera.getPicture(opciones).then(function (imageData) {
            _this.foto = 'data:image/jpeg;base64,' + imageData;
            _this.estadoAnimo = '';
            _this.errorFoto = false;
            _this.fotoConsulta = imageData;
        });
    };
    /* FIN HACER FOTO DE LA CAMARA NATIVA */
    /* ENVIAR FOTO A GOOGLE CLOUD VISION */
    CamaraPage.prototype.enviarFoto = function () {
        var _this = this;
        if (this.fotoConsulta != null) {
            this.observable = this.database.consultaFoto(this.fotoConsulta).subscribe(function (resultado) {
                var fotoRespuesta = resultado.json().responses;
                if (fotoRespuesta[0].faceAnnotations != null) {
                    var contento = fotoRespuesta[0].faceAnnotations[0].joyLikelihood;
                    var triste = fotoRespuesta[0].faceAnnotations[0].sorrowLikelihood;
                    var cabreado = fotoRespuesta[0].faceAnnotations[0].angerLikelihood;
                    var sorprendido = fotoRespuesta[0].faceAnnotations[0].surpriseLikelihood;
                    if (contento == 'VERY_LIKELY' || contento == 'LIKELY') {
                        _this.estadoAnimo = '¡CONTENTO!';
                        _this.estadoAnimoBD = { estadoAnimo: 'contento' };
                    }
                    else {
                        if (triste == 'VERY_LIKELY' || triste == 'LIKELY') {
                            _this.estadoAnimo = '¡TRISTE!';
                            _this.estadoAnimoBD = { estadoAnimo: 'triste' };
                        }
                        else {
                            if (cabreado == 'VERY_LIKELY' || cabreado == 'LIKELY') {
                                _this.estadoAnimo = '¡CABREADO!';
                                _this.estadoAnimoBD = { estadoAnimo: 'cabreado' };
                            }
                            else {
                                if (sorprendido == 'VERY_LIKELY' || sorprendido == 'LIKELY') {
                                    _this.estadoAnimo = '¡SORPRENDIDO!';
                                    _this.estadoAnimoBD = { estadoAnimo: 'sorprendio' };
                                }
                                else {
                                    _this.estadoAnimo = '¡NORMAL!';
                                    _this.estadoAnimoBD = { estadoAnimo: 'normal' };
                                }
                            }
                        }
                    }
                    _this.foto = './assets/imgs/foto.svg';
                    _this.database.guardarEstadoAnimo(_this.global.usuario.id, _this.estadoAnimoBD);
                }
                else {
                    _this.errorFoto = true;
                }
            });
        }
    };
    /* FIN ENVIAR FOTO A GOOGLE CLOUD VISION */
    CamaraPage.prototype.ionViewDidLeave = function () {
        this.estadoAnimo = '';
    };
    CamaraPage.prototype.ionViewWillUnload = function () {
        this.observable.unsubscribe();
    };
    CamaraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-camara',template:/*ion-inline-start:"/myApp/src/pages/camara/camara.html"*/'<!-->HEADER</!-->\n<ion-header>\n  <div>\n    <ion-navbar>\n      <ion-title>Camara</ion-title>\n    </ion-navbar>\n  </div>\n</ion-header>\n<!-->FIN HEADER</!-->\n\n<!-->CONTENT</!-->\n<ion-content padding>\n  <p class="texto-1">¡Hazte una foto,</p>\n  <p class="texto-2">Detectemos tu\n    <span class="texto-contraste">estado de ánimo!</span>\n  </p>\n  <div class="border-foto">\n    <div [ngStyle]="{\'background-image\': \'url(\' + foto + \')\'}" class="foto"></div>\n  </div>\n  <ion-grid class="datos">\n    <ion-row>\n      <ion-col>\n        <button ion-button icon-only (click)="hacerFoto()" class="btn-1 btn-izq">\n          <ion-icon name="camera"></ion-icon>\n          Foto\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button icon-only (click)="enviarFoto()" class="btn-1 btn-der">\n          <ion-icon name="send"></ion-icon>\n          Enviar\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <p class="texto-3">{{ estadoAnimo }}</p>\n  <p *ngIf="errorFoto" class="texto-4">Cara no detectada, intente hacerse otra foto.</p>\n</ion-content>\n<!-->FIN CONTENT</!-->'/*ion-inline-end:"/myApp/src/pages/camara/camara.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */]])
    ], CamaraPage);
    return CamaraPage;
}());

//# sourceMappingURL=camara.js.map

/***/ })

});
//# sourceMappingURL=16.js.map