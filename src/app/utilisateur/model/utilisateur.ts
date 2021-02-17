import { Formation } from 'src/app/formation/model/formation';
export class Utilisateur {
    id!: number;
    nom!: string;
    prenom!: string;
    cin!: string;
    adresse!: string;
    telephone!: string;
    username!: string;
    email!: string;
    image!: File;
    password!: string;
    formations!: Formation[];
}
