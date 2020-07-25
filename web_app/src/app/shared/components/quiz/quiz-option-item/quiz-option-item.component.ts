import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-option-item',
  templateUrl: './quiz-option-item.component.html',
  styleUrls: ['./quiz-option-item.component.scss']
})
export class QuizOptionItemComponent implements OnInit {

  @Input() quizOptionItem: IQuizOptionItem;
  @Input() size: EQuizOptionItemSize;

  EQuizOptionItemSize = EQuizOptionItemSize;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface IQuizOptionItem {
  iconPath: string;
  label: string;
  value: any;
  selected?: boolean;
  disabled?: boolean;
}

export enum EQuizOptionItemSize {
  small = "sm",
  medium = "md",
  large = "lg"
}