import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';
import { Quiz } from 'src/app/core/classes/quiz';
import { ESaleType } from 'src/app/core/enums/saleTypes';

@Component({
  selector: 'app-quiz-question-price',
  templateUrl: './quiz-question-price.component.html',
  styleUrls: ['./quiz-question-price.component.scss']
})
export class QuizQuestionPriceComponent implements OnInit {

  value: number = 500;
  sliderOptions: Options;

  @Input() quiz: Quiz;

  constructor() { }

  ngOnInit(): void {
    this.resetSlider();
    setTimeout(() => {
      if (!this.quiz.priceIsValid())
        this.quiz.resetPrices();
      this.resetSlider();
    }, 1);
  }

  resetSlider(): void {
    let step: number;

    switch (this.quiz.saleType) {
      case ESaleType.Buy:
        step = 10000;
        break;
      case ESaleType.Rent:
        step = 100;
        break;
    }

    this.sliderOptions = {
      floor: this.quiz.availablePriceMin,
      ceil: this.quiz.availablePriceMax,
      minRange: this.quiz.availablePriceMin,
      maxRange: this.quiz.availablePriceMax,
      step,
      translate: (value: number): string => {
        return '$' + value;
      },
      combineLabels: (minValue: string, maxValue: string): string => {
        return 'from ' + minValue + ' up to ' + maxValue;
      },
      hideLimitLabels: true
    }
  }

  priceMinChanged(price: number): void {
    this.quiz.updatePriceMin(price);
  }

  priceMaxChanged(price: number): void {
    this.quiz.updatePriceMax(price);
  }
}
