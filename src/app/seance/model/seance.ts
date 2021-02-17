import { Formation } from "src/app/formation/model/formation";

export class Seance {
    id!: number;
    titre!: string;
    creneau!: Date;
    formation!: Formation;
    commentaires!: [];
    supports!: File[];
    path!: String;

}
