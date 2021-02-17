import { Utilisateur } from './../../utilisateur/model/utilisateur';
import { Seance } from 'src/app/seance/model/seance';
export class Commentaire {
    id!: number;
    seance!: Seance;
    contenu!: String;
    date!: Date;
    utilisateur!: Utilisateur;

}
