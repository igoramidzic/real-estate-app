import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';

@Component({
  selector: 'app-quiz-progress',
  templateUrl: './quiz-progress.component.html',
  styleUrls: ['./quiz-progress.component.scss']
})
export class QuizProgressComponent implements OnInit {

  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit(): void {
  }
}
