import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { Chart } from 'chart.js';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('graficaBurnout') graficaBurnout;
  graficaBurnoutChart: Chart;

  @ViewChild('graficaBurnoutVsNoBurnout') graficaBurnoutVsNoBurnout;
  graficaBurnoutVsNoBurnoutChart: Chart;

  @ViewChild('graficaPreguntas') graficaPreguntas;
  graficaPreguntasChart: Chart;

  usuarios: Array<any> = [];
  usuariosConBurnout: number;
  porcentajeBurnoutUsuarios: number;

  encuestas: Array<any> = [];
  usuariosEncuestados: number;
  encuestasRealizadas: number;

  porcentajeAe: number;
  porcentajeD: number;
  porcentajeRp: number;

  hombresConBurnout: number;
  mujeresConBurnout: number;
  porcentajeBurnoutHombres: number;
  porcentajeBurnoutMujeres: number;

  constructor(public database: DatabaseService,public authService: AuthService) {
    this.usuariosConBurnout = 0;
    this.porcentajeBurnoutUsuarios = 0;
    this.usuariosEncuestados = 0;
    this.encuestasRealizadas = 0;
    this.porcentajeAe = 0;
    this.porcentajeD = 0;
    this.porcentajeRp = 0;
    this.hombresConBurnout = 0;
    this.mujeresConBurnout = 0;
    this.porcentajeBurnoutHombres = 0;
    this.porcentajeBurnoutMujeres = 0;
    this.cargarDatos();
  }
// Metodo que pinta las graficas
  ngOnInit() {
    this.graficas();
  }

  /* CARGAR DATOS */
  cargarDatos() {
    // el metodo subscribe matiene abierta la query
    Observable.combineLatest(this.database.usuarios(), this.database.encuestas()).subscribe(resultados => {
      // Cargo los documentos del firebase y los almacenos en las var usuarios y encuestas.
      this.usuarios = resultados[0];
      this.encuestas = resultados[1];
      this.calcularUsuariosBurnout();
      this.usuariosEncuestados = this.usuarios.length; // USUARIOS ENCUESTADOS
      this.calcularEncuestasRealizadas();
      this.actualizarGraficas();
    });
  }
  /* FIN CARGAR DATOS */

  /* CALCULAR DATOS USUARIOS BURNOUT */
  calcularUsuariosBurnout() {
    this.usuariosConBurnout = 0;
    this.porcentajeBurnoutUsuarios = 0;
    this.hombresConBurnout = 0;
    this.mujeresConBurnout = 0;
    this.porcentajeBurnoutHombres = 0;
    this.porcentajeBurnoutMujeres = 0;
    for (let usuario of this.usuarios) {
      if (usuario.ultimaencuesta.ae > 26 && usuario.ultimaencuesta.d > 9 && usuario.ultimaencuesta.rp < 34) {
        this.usuariosConBurnout++;
        usuario.sexo == 'hombre' ? this.hombresConBurnout++ : this.mujeresConBurnout++;
      }
    }
    if (this.usuarios.length > 0) {
      this.porcentajeBurnoutUsuarios = Math.round((this.usuariosConBurnout * 100) / this.usuarios.length); // USUARIOS % CON BURNOUT
    }
    if (this.usuariosConBurnout > 0) {
      this.porcentajeBurnoutHombres = Math.round((this.hombresConBurnout * 100) / this.usuariosConBurnout); // HOMBRES % CON BURNOUT
      this.porcentajeBurnoutMujeres = 100 - this.porcentajeBurnoutHombres; // MUJERES % CON BURNOUT.
      // console.log(this.porcentajeBurnoutHombres)
    }
  }
  /* FIN CALCULAR DATOS USUARIOS BURNOUT */

  /* CALCULAR ENCUESTAS REALIZADAS */
  calcularEncuestasRealizadas() {
    this.encuestasRealizadas = this.encuestas.length; // ENCUESTAS REALIZADAS
    this.porcentajeAe = 0;
    this.porcentajeD = 0;
    this.porcentajeRp = 0;
    for (let encuesta of this.encuestas) {
      this.porcentajeAe += Math.round((encuesta.encuesta.ae * 100) / (this.encuestasRealizadas * 54));
      this.porcentajeD += Math.round((encuesta.encuesta.d * 100) / (this.encuestasRealizadas * 30));
      this.porcentajeRp += Math.round((encuesta.encuesta.rp * 100) / (this.encuestasRealizadas * 48));
    }
  }
  /* FIN CALCULAR ENCUESTAS REALIZADAS */

  /* GRAFICAS */
  graficas() {
    this.graficaBurnoutChart = new Chart(this.graficaBurnout.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.porcentajeBurnoutUsuarios, 100 - this.porcentajeBurnoutUsuarios],
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
    this.graficaBurnoutVsNoBurnoutChart = new Chart(this.graficaBurnoutVsNoBurnout.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Burnout', 'No Burnout'],
        datasets: [{
          data: [this.usuariosConBurnout, this.usuarios.length - this.usuariosConBurnout],
          backgroundColor: [
            '#DE3831',
            '#D7D8DC'
          ],
        }],
      },
      options: {
        tooltips: { enabled: false },
        hover: { mode: null },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              display: false,
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.graficaPreguntasChart = new Chart(this.graficaPreguntas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['A', 'D', 'RP'],
        datasets: [{
          data: [this.porcentajeAe, this.porcentajeD, this.porcentajeRp],
          backgroundColor: [
            '#EB5D13',
            '#70A63B',
            '#347193'
          ],
        }],
      },
      options: {
        tooltips: { enabled: false },
        hover: { mode: null },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              display: false,
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  /* FIN GRAFICAS */

  /* ACTUALIZAR GRAFICAS */
  actualizarGraficas() {
    // Primera grafica
    this.graficaBurnoutChart.data.datasets[0].data[0] = this.porcentajeBurnoutUsuarios; // Parte Roja
    this.graficaBurnoutChart.data.datasets[0].data[1] = 100 - this.porcentajeBurnoutUsuarios; // Parte Gris
    this.graficaBurnoutChart.update();

    // Segunda grafica
    this.graficaBurnoutVsNoBurnoutChart.data.datasets[0].data[0] = this.usuariosConBurnout;
    this.graficaBurnoutVsNoBurnoutChart.data.datasets[0].data[1] = this.usuarios.length - this.usuariosConBurnout;
    this.graficaBurnoutVsNoBurnoutChart.update();

    // Tercera grafica
    this.graficaPreguntasChart.data.datasets[0].data[0] = this.porcentajeAe;
    this.graficaPreguntasChart.data.datasets[0].data[1] = this.porcentajeD;
    this.graficaPreguntasChart.data.datasets[0].data[2] = this.porcentajeRp;
    this.graficaPreguntasChart.update();
  }
  /* ACTUALIZAR GRAFICAS */

}
