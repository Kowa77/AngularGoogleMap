import { Component } from '@angular/core';
import { Marcador } from 'src/app/classes/marcador.class';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {


marcadores : Marcador [] = [];
lat: number = -34.73508633495815;
lng: number = -56.222812882241755;


constructor(
  private _snackBar: MatSnackBar, 
  public dialog: MatDialog){

  if ( localStorage.getItem('marcadores')){
    this.marcadores = JSON.parse( localStorage.getItem('marcadores')! );
  }

}

  clickedMarker(titulo: string, index: number) {
    //console.log(`clicked the marker: ${titulo || index}`)
  }

  agregarMarcador(evento:any ) {
    const coords: { lat: number, lng: number} = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push( nuevoMarcador );
    this.guardarstorage();
    this._snackBar.open('Marador Agregado  :) ', 'Cerrar', { duration: 3000 });

  }

  guardarstorage(){
    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ));  
  }

  borrarMarcador(index:number){
    this.marcadores.splice(index,1);
    this.guardarstorage();
    this._snackBar.open(`el marcador N°${index} fue borrado exitosamente! `, 'Cerrar', { duration: 3000 });
    //alert(`el marcador N°${index} fue borrado exitosamente! `);
  }

  editarMarcador( marcador: Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if( !result ){
        return;
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarstorage();
      this._snackBar.open('Marador Actualizado:) ', 'Cerrar', { duration: 3000 });
    });

  }

}