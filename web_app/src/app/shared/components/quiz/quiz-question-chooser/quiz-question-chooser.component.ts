import { Component, OnInit, Input } from '@angular/core';
import { EQuizQuestions as EQuizQuestion } from 'src/app/core/enums/quizQuestions';
import { Quiz } from 'src/app/core/classes/quiz';

@Component({
  selector: 'app-quiz-question-chooser',
  templateUrl: './quiz-question-chooser.component.html',
  styleUrls: ['./quiz-question-chooser.component.scss']
})
export class QuizQuestionChooserComponent implements OnInit {

  @Input() quiz: Quiz;
  EQuizQuestions = EQuizQuestion;

  constructor() { }

  ngOnInit(): void {
  }

}
