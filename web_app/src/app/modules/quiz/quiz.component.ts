import { Component, OnInit } from '@angular/core';
import { EQuizQuestions } from 'src/app/core/enums/quizQuestions';
import { Quiz } from 'src/app/core/classes/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz: Quiz;

  constructor() { }

  ngOnInit(): void {
    this.quiz = new Quiz();
  }
}