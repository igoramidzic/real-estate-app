import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';
import { ESaleType } from 'src/app/core/enums/saleTypes';
import { IQuizOptionItem } from '../../quiz-option-item/quiz-option-item.component';

@Component({
  selector: 'app-quiz-question-sale-type',
  templateUrl: './quiz-question-sale-type.component.html',
  styleUrls: ['./quiz-question-sale-type.component.scss']
})
export class QuizQuestionSaleTypeComponent implements OnInit {

  @Input() quiz: Quiz;
  quizOptionItems: IQuizOptionItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeQuestionOptions();
  }

  initializeQuestionOptions(): void {
    this.quizOptionItems = [
      {
        iconPath: "assets/icons/sale-post.svg",
        label: "Buying",
        value: ESaleType.Buy
      },
      {
        iconPath: "assets/icons/rent-post.svg",
        label: "Renting",
        value: ESaleType.Rent
      }
    ];

    if (this.quiz.saleType)
      this.quizOptionItems.find(q => q.value == this.quiz.saleType).selected = true;
  }

  selectOption(saleType: ESaleType): void {
    this.quiz.updateSaleType(saleType);
    this.updateSelectedOption(saleType);
  }

  updateSelectedOption(saleType: ESaleType): void {
    this.quizOptionItems.forEach(option => {
      option.selected = false;
      if (option.value == saleType) option.selected = true;
    });
  }
}
