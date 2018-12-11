import * as uuid from 'uuid/v4';
export class Gasolinera {
    ID: String = '';
    CordenadaLog: String = '';
    CordenadaLat: String = '';
    Marca: String = '';
    Descripcion: String = '';
    Logo: String = '../assets/icon/gasofa.png';
    Domicilio: String = '';
    Otros: String = '';
    Telefono: String = '';
    Disel: Number;
    Gregular: Number;
    Gpremium: Number;
    FechaRegistro: String;
    Fecha: String;
    constructor() {
        this.ID = uuid(); // UUID.UUID(); //ahora sera el id de la entrada
        this.Fecha = new Date().toISOString();
        this.FechaRegistro = new Date().toISOString();
    }
}
