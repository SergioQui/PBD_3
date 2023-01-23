webpackJsonp([12],{

/***/ 1103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabGeneralPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabGeneralPage = (function () {
    function TabGeneralPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dashboardRoot = 'DashboardPage';
        this.encuestaRoot = 'EncuestaPage';
        this.camaraRoot = 'CamaraPage';
        this.recomendacionRoot = 'RecomendacionPage';
        this.primeraVez = this.navParams.get('primeraVez');
    }
    TabGeneralPage.prototype.ionViewDidEnter = function () {
        this.primeraVez ? this.tabRef.select(1) : this.tabRef.select(0);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('tab'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Tabs */])
    ], TabGeneralPage.prototype, "tabRef", void 0);
    TabGeneralPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tab-general',template:/*ion-inline-start:"/myApp/src/pages/tab-general/tab-general.html"*/'<ion-tabs #tab>\n  <ion-tab [root]="dashboardRoot" tabTitle="Dashboard" tabIcon="apps"></ion-tab>\n  <ion-tab [root]="encuestaRoot" tabTitle="Encuesta" tabIcon="list-box"></ion-tab>\n  <ion-tab [root]="camaraRoot" tabTitle="Camara" tabIcon="camera"></ion-tab>\n  <ion-tab [root]="recomendacionRoot" tabTitle="Recomendación" tabIcon="speedometer"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/myApp/src/pages/tab-general/tab-general.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], TabGeneralPage);
    return TabGeneralPage;
}());

//# sourceMappingURL=tab-general.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabGeneralPageModule", function() { return TabGeneralPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tab_general__ = __webpack_require__(1103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var TabGeneralPageModule = (function () {
    function TabGeneralPageModule() {
    }
    TabGeneralPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__tab_general__["a" /* TabGeneralPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__tab_general__["a" /* TabGeneralPage */]),
            ]
        })
    ], TabGeneralPageModule);
    return TabGeneralPageModule;
}());

//# sourceMappingURL=tab-general.module.js.map

/***/ })

});
//# sourceMappingURL=12.js.map