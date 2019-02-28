import { Contato } from "./contato";
import { plano } from "./plano";

export class DadosPessoais{
    
    UID : string;
    endereco : string;
    telefones : Contato[];
    plano: plano;

    
    constructor(objFirebase : any){
        this.UID = objFirebase.UIS;
        this.endereco = objFirebase.endereco;
        this.telefones = objFirebase.telefones;
        this.plano = objFirebase.plano;
        
    }


}