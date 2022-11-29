import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asistencia } from '../models/asistencia';
import { Asistenciadetalle } from '../models/asistenciadetalle';
import { BuscarAsistencia } from '../models/buscar-asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {


  formData!: Asistencia
  AsistenciaDetalle!: Asistenciadetalle[]


  constructor(private http: HttpClient) { }



  getAsistenciaList(): Observable<any>{

    return this.http.get<any>(environment.apiURL + '/Asistencia');
  }

  deleteAsistencia(id: number) {
    return this.http.delete(environment.apiURL + `/Asistencia/${id}`)
  }

  getAsistenciaID(id: number): Observable<BuscarAsistencia> {
    return this.http.get<BuscarAsistencia>(environment.apiURL + '/Asistencia/' + id)
  }

  saveOrUpdateAsistencia() {

    var result = this.AsistenciaDetalle.map(item =>({
       
       id:  item.id,
       estudianteid: item.estudianteid,
       asistenciaid:  item.asistenciaid,
       presencia: item.presencia
 
     
   }))
 
   var body = {
 
     id: this.formData.id,
     fecha: new Date(this.formData.fecha),
     presentes: this.formData.presentes,
     ausentes: this.formData.ausentes,
     asistencias: result
  
    };
 
    return this.http.post(environment.apiURL + '/Asistencia', body);
  }
 
  deleteAsistenciaDetalle(id: number) {
    return this.http.delete(environment.apiURL + '/Asistencia/EliminarItem/' +  id);
  }

}
