import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';

@Component({
  selector: 'app-quiz-question-location',
  templateUrl: './quiz-question-location.component.html',
  styleUrls: ['./quiz-question-location.component.scss']
})
export class QuizQuestionLocationComponent implements OnInit {

  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit(): void {
  }
}
