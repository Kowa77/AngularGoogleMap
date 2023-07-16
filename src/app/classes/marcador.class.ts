// export class Marcador{
//     constructor (public lat: number, public lng: number){

//     }
// }

//mismo codigo que lo comentado lineas arriba 
export class Marcador {
    public lat: number;
    public lng: number;
    public titulo = 'sin titulo';
    public desc = 'sin descripcion';

    constructor( lat: number, lng: number){
        this.lat = lat;
        this.lng = lng;
    }
}

