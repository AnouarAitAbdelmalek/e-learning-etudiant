import { Choix } from './choix';
export class Question {

    id!: number;
    enonce!: String;
    choix: Choix[] = [];
    bonneReponse!: String;
    numeroDeQuestion!: number;
}
