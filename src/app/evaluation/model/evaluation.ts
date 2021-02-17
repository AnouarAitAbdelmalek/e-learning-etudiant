import { Formation } from './../../formation/model/formation';
import { Question } from './question';
export class Evaluation {
    id!: number;
    questions: Question[] = [];
    date!: Date;
}
