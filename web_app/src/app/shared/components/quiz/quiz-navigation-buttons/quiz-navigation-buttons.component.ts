import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EQuizQuestions } from 'src/app/core/enums/quizQuestions';
import { Quiz } from 'src/app/core/classes/quiz';

@Component({
  selector: 'app-quiz-navigation-buttons',
  templateUrl: './quiz-navigation-buttons.component.html',
  styleUrls: ['./quiz-navigation-buttons.component.scss']
})
export class QuizNavigationButtonsComponent implements OnInit {

  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit(): void {
  }

  onNext(): void {
    this.quiz.next();
    window.scroll(0, 0);
  }

  onBack(): void {
    this.quiz.back();
  }
}
