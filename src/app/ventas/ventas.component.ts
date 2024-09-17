import { Component, OnInit, effect, signal } from '@angular/core';
import { Contrata, ContrataFull } from '../models/contrata.model';
import { GestionService } from '../gestion.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { VentaFormComponent } from '../forms/venta-form/venta-form.component';
import { Servicio } from '../models/servicio.model';
import { DatePipe } from '@angular/common';
import { EstadisticasComponent } from "./estadisticas/estadisticas.component";
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FiltroComponent } from "../filtro/filtro.component";
import {MatTabsModule} from '@angular/material/tabs';
import { AgCharts } from "ag-charts-angular";
import { AgBarSeriesOptions, AgChartOptions } from "ag-charts-community";
import moment from 'moment';


const MATIRIAL_MODULES = [MatIconModule, MatDividerModule, MatButtonModule,MatTableModule, MatToolbarModule,MatProgressSpinnerModule,MatFormField,MatLabel,MatTabsModule];
@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule, EstadisticasComponent, FiltroComponent,AgCharts],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss',
  providers: [DatePipe]
})
export class VentasComponent implements OnInit{
  displayedColumns: string[] = ['fecha', 'servicio','cif'];
  //dataSource: Contrata[] = [];

  dataSource = new MatTableDataSource<Contrata>();

  ventas: Contrata[] = [];
  servicios: Servicio[] = [];
  filteredVentas: Contrata[] = [];
  searchQuery: string = '';
  revision: boolean = false;

  series_chart: AgBarSeriesOptions[] = [];

  valueToFilter = signal<string>('');

  // Chart Options
  public chartOptions: AgChartOptions;
  public data:any =[];

  estadisticas: {
    volumenTotal: number;
    valorTotal: number;
    ventasPorServicio: { [idServicio: string]: number };
  } = { volumenTotal: 0, valorTotal: 0, ventasPorServicio: {} };

  constructor(private service: GestionService, public dialog: MatDialog,private datePipe: DatePipe) {
    
      effect(() => {
        if(this.valueToFilter()) {
          this.dataSource.filter = this.valueToFilter();
        }
      }, { allowSignalWrites: true });


     const meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
     for(let i=0;i<meses.length;i++){
       this.estadisticas.ventasPorServicio[meses[i]] = 0
     } 
     const getdata = [
        {
          mes: "Enero",
          servicio_2: 140,
          servicio_4: 16,
        },
        {
          mes: "Febrero",
          servicio_2: 124,
          servicio_4: 20,
        },
        {
          mes: "Marzo",
          servicio_2: 112,
          service_4: 20,
        },
        {
          mes: "Abril",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Mayo",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Junio",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Julio",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Agosto",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Septiembre",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Octubre",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Noviembre",
          servicio_2: 118,
          servicio_4: 24,
        },
        {
          mes: "Diciembre",
          servicio_2: 118,
          servicio_4: 34,
        },
      ];
      this.chartOptions = {
        title: {
          text: "Ventas Anuales",
        },
        data: getdata,
        series: this.series_chart,
      };

   }


  chart: any;
  ventasPorMes: { [key: string]: number } = {}; 
  ngOnInit(): void {
    this.fetchVentas();

  }

  /**
   * Fetches all the users from the API and assigns them to the "facturas" and
   * "filteredFacturas" arrays. Also sets the "revision" flag to true.
   */
 async fetchVentas() {
    await this.fetchServicios();
    this.service.getAll("contrata").subscribe(response => {
      // Assign the array of users to the "facturas" array
      response.data.items.forEach((contrata: Contrata) => {
              
        this.servicios.forEach((servicio: Servicio) => {
          if (contrata.id_servicio === servicio.id_servicio) {
            contrata.id_servicio = servicio.nombre;
          }
        });
        contrata.fecha = this.transformDate(contrata.fecha.toString())??'';
        this.ventas.push(contrata);
        this.filteredVentas.push(contrata);
        //this.dataSource.data =(contrata);
      })

      this.calcularEstadisticas();
      
      // Set the "revision" flag to true, indicating that the data has been loaded
      this.dataSource.data = this.ventas;
      this.revision = true;
    });
  }


fetchServicios(): void {
  this.service.getAll("servicios").subscribe(
    (response) => {
      console.log(response.data.items); // Verifica el formato de la respuesta
      console.log(response.statusCode); // Verifica el formato de la respuesta
    // Assign the array of users to the "facturas" array
    this.servicios = response.data.items;
    this.servicios.forEach(element => {
      this.series_chart.push({
        type: "bar",
        xKey: "mes",
        yKey: element.nombre.toLowerCase().replace(/ /g, "_"),
        yName: element.nombre
      });
    });
  
  });
}

transformDate(dateString: string) {
  const formattedDate = this.datePipe.transform(dateString, 'dd-MM-yyyy');
  return formattedDate;
}

applyFilter(event: Event):void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

calcularEstadisticas(): void {
  this.estadisticas.volumenTotal = this.ventas.length;
  this.estadisticas.valorTotal = this.ventas.reduce((total, venta) => total + Number(venta.cif), 0);

  this.ventas.forEach(venta => {
    if (this.estadisticas.ventasPorServicio[venta.id_servicio]) {
      this.estadisticas.ventasPorServicio[venta.id_servicio]++;
    } else {
      this.estadisticas.ventasPorServicio[venta.id_servicio] = 1;
    }
  });
}


}
