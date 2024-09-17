import { Component } from '@angular/core';
// Angular Chart Component
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [AgCharts,MatCardModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent {

   // Chart Options
   public chartOptions: AgChartOptions;
   constructor() {
     this.chartOptions = {
       // Data: Data to be displayed in the chart
       data: [
          { month: 'Enero', avgTemp: 3.9, iceCreamSales: 500000 },
         { month: 'Febrero', avgTemp: 2.3, iceCreamSales: 162000 },
         { month: 'Marzo', avgTemp: 6.3, iceCreamSales: 302000 },
         { month: 'Abril', avgTemp: 16.2, iceCreamSales: 800000 },
         { month: 'Mayo', avgTemp: 22.8, iceCreamSales: 1254000 },
         { month: 'Juion', avgTemp: 14.5, iceCreamSales: 950000 },
         { month: 'Julio', avgTemp: 8.9, iceCreamSales: 200000 },
         { month: 'Agosto', avgTemp: 4.9, iceCreamSales: 200000 },
         { month: 'Septiembre', avgTemp: 5.9, iceCreamSales: 200000 },
         { month: 'Octubre', avgTemp: 1.9, iceCreamSales: 257000 },
         { month: 'Noviembre', avgTemp: 7.9, iceCreamSales: 278000 },
         { month: 'Diciembre', avgTemp: 9.9, iceCreamSales: 2000687 },
       ],
       // Series: Defines which chart type and data to use
       series: [{ type: 'line', xKey: 'month', yKey: 'iceCreamSales' }]
     };
   }
}
