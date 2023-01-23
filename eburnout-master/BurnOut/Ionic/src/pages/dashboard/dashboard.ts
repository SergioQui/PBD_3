import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { GlobalProvider } from '../../providers/global/global';
import { FitBitServiceProvider } from '../../providers/fit-bit-service/fit-bit-service';

import { FBSleep } from './../../models/fbsleep'; // Model, para instanciar la información del usuario
import { GraphSleepOpts, itemValueStyle, itemValueTotalStyle, AHIOptsChartJS } from './graph-opts';

import * as echarts from 'echarts';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage implements AfterViewInit,OnDestroy{

  @ViewChild('graficaBurnout') graficaBurnout;
  graficaBurnoutChart: Chart;

  @ViewChild('graficaAE') graficaAE;
  graficaAEChart: Chart;
  @ViewChild('graficaD') graficaD;
  graficaDChart: Chart;
  @ViewChild('graficaRP') graficaRP;
  graficaRPChart: Chart;

  resultadoPreguntas: { ae: number, d: number, rp: number, q: string };
  indice: number;

  porcentajeBurnout: number;
  porcentajeAE: number;
  porcentajeD: number;
  porcentajeRP: number;

  detalles: boolean;

    
    public status : string = "";
    private _running = false;
    private _interval = null;
    private _interval_update : number = 2000;

    private _fbsleep : FBSleep;
    public opts_sleep = {};
    public sleep = {};
    @ViewChild('container_sleep') public chartSleep: ElementRef;
    private _chartSleep: any;
    color_sleep : string = "#000";
    time_sleep : string = "";

    private _fbtsAHI : Array<number> = [];
    public opts_tsAHI = {};
    public tsAHI = {};
    @ViewChild('container_AHI') public chartAHI: ElementRef;
    private _chartAHI: any;
    bpm_heart : string = "";


  constructor(public navCtrl: NavController, public global: GlobalProvider, private _fts: FitBitServiceProvider) {
    this.porcentajeBurnout = 0;
    this.detalles = false;
    this.indice = 0;
    this.resultadoPreguntas = this.global.resultadoPreguntas;
  }

  ionViewDidLoad() {
    this.calcularDatosGraficas();
    this.graficas();
  }

  ionViewWillEnter() {
    //this.detalles = false;
    this.detalles = !this._fts.have_bracelet();
    this.indice = 0;
    this.resultadoPreguntas = this.global.resultadoPreguntas;
    this.actualizarGraficas();
  }


    ionViewWillUnload(){
        this.stop();
    }

    public ngAfterViewInit() {
        this._prepare_fitbit();
    }

    public ngOnDestroy() {
        this.stop();
        echarts.dispose(this._chartSleep);
    }

    private _toauthfitbit(){
        this._fts.check_auth();
        if( this._fts.have_bracelet() ){
            this._interface_opts();
        }
    }

    private _prepare_fitbit(){
        this._checkServiceError();
    }

    private _checkServiceError(){

        var _self = this;
        var toStop = false;
        var toReestart = false;
        var tostart = false;
        this._fts.error.subscribe((error) => {
            toStop = false;
            toReestart = false;
            tostart = false;
            if(error.status != undefined)

                switch (error.status) {
                    case 400:
                        // 400 Bad Request
                        _self.status = "Error de parámetros en la petición";
                        toStop = true;
                        break;
                    case 401:
                        // 401 Unauthorized
                        _self.status = "Esperando obtener autorización";
                        toStop = true;
                        break;

                    case 429:
                        // 429 Rate limit exceeded
                        _self.status = "Superado el límite de tarifa, esperando...";
                        break;

                    case 1001:
                        // 1001 Internal Control, when obtain user token
                        _self.status = "Se ha autorizado conectarse a fitbit";
                        toStop = true;
                        toReestart = true;
                        break;

                    case 1002:
                        // 1002 Internal Control, when the rate limit has been released
                        _self.status = "";
                        break;

                    case 1020:
                        toStop = true;
                        toReestart = false;
                        tostart =true;
                        break;

                    default:
                        break;
                }

            if( _self._running && toStop == true ){
                _self.stop();
            }
            if (toReestart){
                _self.rewind();
            }
            if (tostart){
                _self._toauthfitbit();
            }
        });

    }

    start() {
        this.status = "";

        if( this._fts.have_bracelet() ){
            this._running = true;
            var _self = this;
            this._interval = setInterval(() => {
                  _self._update_opts();
            }, _self._interval_update);

            this._fts.toStartCron();
        }
    }

    rewind(){
        this.stop();
        this.start();
    }

    stop() {
        this._running = false;
        clearInterval(this._interval);

        this._fts.toStopCron();
    }

    private _interface_opts(){

        // SLEEP
        this._set_sleep_opts();        

        // HEART
        this._set_tsAHI_opts();


        this._update_opts();

    }

    private _set_sleep_opts(){
    
        var str_opts = JSON.stringify(  GraphSleepOpts );
        this.opts_sleep = JSON.parse( str_opts );


        if (this.chartSleep && this.chartSleep.nativeElement) {
            this._chartSleep = echarts.init(this.chartSleep.nativeElement);
            this._chartSleep.setOption(this.opts_sleep);
        }

    }

    private _set_tsAHI_opts(){

        this.opts_tsAHI = JSON.parse( JSON.stringify( AHIOptsChartJS ) );

        if (this.chartAHI && this.chartAHI.nativeElement) {
            /*this._chartAHI = echarts.init(this.chartAHI.nativeElement);
            this._chartAHI.setOption(this.opts_tsAHI);*/
            this._chartAHI = new Chart(this.chartAHI.nativeElement, this.opts_tsAHI);
        }

    }

    private _set_indicators_value(stitle:string, total: number, item:number){

        var value = {
          title: {
            text: stitle
        },
        series: [
            {
                name: 'sleep',
                type: 'pie',
                radius: ['89%', '95%'],
                hoverAnimation: false,
                  data: [ 
                      {
                          value: item,
                          itemStyle: itemValueStyle
                      },
                      {    
                          itemStyle:    itemValueTotalStyle,
                          value:         !item
                                        ?    -1
                                        :    item > total
                                            ?    0
                                            :    total- item
                    }
                  ]
            }
        ]
        };

        return value;

    }

    private _calculate_sleep(){

        let ideal_minutes : number = 480;

        var timeinbed : number = Number(this._fbsleep.timeinbed) - Number(this._fbsleep.minutesawake);

        var time = timeinbed / 60;

        var hours : number = parseInt(time.toString());

        var minutes = Math.round( (time - hours) * 60 );


        var idel_percent : number = timeinbed * 100 / ideal_minutes;

        this.color_sleep = idel_percent <= 33.33
                              ?    "#FF0000"
                              :    idel_percent >= 33.34 && idel_percent <= 66.66
                                      ?    "#FF8000"
                                      :    "#00FF00";


        this.sleep = this._set_indicators_value('', 100, idel_percent);

        this.time_sleep = hours.toString()+" hours, "+minutes.toString()+" minutes";

        this.sleep["series"]["0"]["data"]["0"]["itemStyle"]["normal"]["color"] = this.color_sleep;
        this.sleep["series"]["0"]["data"]["0"]["itemStyle"]["normal"]["borderColor"] = this.color_sleep;

    }

    private _calculate_AHI(){

        this._fbtsAHI.sort(function(a,b) {return (a["value"] > b["value"]) ? 1 : ((b["value"] > a["value"]) ? -1 : 0);} ); 

        var val_min : number = this._fbtsAHI["0"]    !== undefined
                                    ?    this._fbtsAHI["0"]["value"] !== undefined
                                            ?    this._fbtsAHI["0"]["value"]
                                            :    0
                                    :    0;

        var leng = this._fbtsAHI.length;
        var val_max : number = this._fbtsAHI[leng-1]    !== undefined
                                    ?    this._fbtsAHI[leng-1]["value"] !== undefined
                                            ?    this._fbtsAHI[leng-1]["value"]
                                            :    0
                                    :    0;

        /*this.opts_tsAHI["series"]["0"]["data"]["0"] = 50;//val_min;
        this.opts_tsAHI["series"]["0"]["data"]["1"] = 60;//val_max;*/

        this._chartAHI.data.datasets[0].data[0] = val_min;
        this._chartAHI.data.datasets[0].data[1] = val_max;

        this.bpm_heart = "BPM min "+val_min.toString()+", BPM max "+val_max.toString();

    }


    private _update_opts(){

        // SLEEP
        this._fbsleep = this._fts.sleep();

        this._calculate_sleep();

        this._chartSleep.setOption(this.sleep);


        //HEART
        this._fbtsAHI = this._fts.tsAHI();

        this._calculate_AHI();
        
        //this._chartAHI.setOption(this.opts_tsAHI);
        this._chartAHI.update();
        
        

    }

  /* CALCULAR DATOS GRAFICAS */
  calcularDatosGraficas() {
    if (this.resultadoPreguntas.ae > 26 && this.resultadoPreguntas.d > 9 && this.resultadoPreguntas.rp < 34) {
      this.porcentajeBurnout = Math.round(
        ((this.resultadoPreguntas.ae + this.resultadoPreguntas.d - this.resultadoPreguntas.rp) * 100) / 84
      );
    } else {
      this.porcentajeBurnout = 0;
    }
    this.porcentajeAE = Math.round((this.resultadoPreguntas.ae * 100) / 54);
    this.porcentajeD = Math.round((this.resultadoPreguntas.d * 100) / 30);
    this.porcentajeRP = Math.round((this.resultadoPreguntas.rp * 100) / 48);
  }
  /* FIN CALCULAR DATOS GRAFICAS */

  /* GRAFICAS */
  graficas() {
    this.graficaBurnoutChart = new Chart(this.graficaBurnout.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.porcentajeBurnout, 100 - this.porcentajeBurnout],
          backgroundColor: [
            '#DE3831',
            '#D7D8DC'
          ]
        }],
      },
      options: {
        cutoutPercentage: 90,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        tooltips: { enabled: false },
        hover: { mode: null },
      }
    });
    this.graficaAEChart = new Chart(this.graficaAE.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.porcentajeAE, 100 - this.porcentajeAE],
          backgroundColor: [
            '#DE3831',
            '#D7D8DC'
          ]
        }],
      },
      options: {
        cutoutPercentage: 86,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        tooltips: { enabled: false },
        hover: { mode: null },
      }
    });
    this.graficaDChart = new Chart(this.graficaD.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.porcentajeD, 100 - this.porcentajeD],
          backgroundColor: [
            '#DE3831',
            '#D7D8DC'
          ]
        }],
      },
      options: {
        cutoutPercentage: 86,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        tooltips: { enabled: false },
        hover: { mode: null },
      }
    });
    this.graficaRPChart = new Chart(this.graficaRP.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.porcentajeRP, 100 - this.porcentajeRP],
          backgroundColor: [
            '#DE3831',
            '#D7D8DC'
          ]
        }],
      },
      options: {
        cutoutPercentage: 86,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        tooltips: { enabled: false },
        hover: { mode: null },
      }
    });
  }
  /* FIN GRAFICAS */

  /* ACTUALIZAR GRAFICAS */
  actualizarGraficas() {
    this.calcularDatosGraficas();
    this.graficaBurnoutChart.data.datasets[0].data[0] = this.porcentajeBurnout;
    this.graficaBurnoutChart.data.datasets[0].data[1] = 100 - this.porcentajeBurnout;
    this.graficaBurnoutChart.update();
    this.graficaAEChart.data.datasets[0].data[0] = this.porcentajeAE;
    this.graficaAEChart.data.datasets[0].data[1] = 100 - this.porcentajeAE;
    this.graficaAEChart.update();
    this.graficaDChart.data.datasets[0].data[0] = this.porcentajeD;
    this.graficaDChart.data.datasets[0].data[1] = 100 - this.porcentajeD;
    this.graficaDChart.update();
    this.graficaRPChart.data.datasets[0].data[0] = this.porcentajeRP;
    this.graficaRPChart.data.datasets[0].data[1] = 100 - this.porcentajeRP;
    this.graficaRPChart.update();
  }
  /* ACTUALIZAR GRAFICAS */

  /* ATRAS */
  atras() {
    if (this.indice < this.global.resultadosPreguntas.length - 1) {
      this.indice++;
      this.resultadoPreguntas = this.global.resultadosPreguntas[(this.global.resultadosPreguntas.length - 1) - this.indice];
      this.actualizarGraficas();
    }
  }
  /* FIN ATRAS */

  /* SIGUIENTE */
  siguiente() {
    if (this.indice > 0) {
      this.indice--;
      this.resultadoPreguntas = this.global.resultadosPreguntas[(this.global.resultadosPreguntas.length - 1) - this.indice];
      this.actualizarGraficas();
    }
  }
  /* FIN SIGUIENTE */

}
