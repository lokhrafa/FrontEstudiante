import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuscarEstudiante } from '../models/buscar-estudiante';
import { Calificacion } from '../models/calificacion';
import { Estudiante } from '../models/estudiante';


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
 

  formData!: Estudiante
  EstudianteDetalle!: Calificacion[]
  ListaEstudiante!: Estudiante[]

  constructor(private http: HttpClient) { }


  saveOrUpdateEstudiante() {

    
    var result = this.EstudianteDetalle.map(item =>({
       
     calificacionId:  item.calificacionId,
      estudianteid: item.estudianteid,
      nota:  item.nota,
      materia:  item.materia

    
  }))

  var body = {

    id: this.formData.id,
   nombre: this.formData.nombre,
    genero: this.formData.genero,
    edad: this.formData.edad,
    calificaciones: result
 
   };

   return this.http.post(environment.apiURL + '/Estudiante', body);
    
  }


 getEstudianteList(): Observable<any>{

   return this.http.get<any>(environment.apiURL + '/Estudiante');
 }

 deleteEstudiante(id: number){
  return this.http.delete(environment.apiURL + `/Estudiante/${id}`)
 }

 getEstudianteID(id: number): Observable<BuscarEstudiante>{
    return this.http.get<BuscarEstudiante>(environment.apiURL + '/Estudiante/' + id)
 }

 deleteEstudianteDetalle(id: number) {

  return this.http.delete(environment.apiURL + '/Estudiante/EliminarItem/' +  id);
}



}
