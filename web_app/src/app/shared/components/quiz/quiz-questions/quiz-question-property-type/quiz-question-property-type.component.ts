import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';
import { IQuizOptionItem } from '../../quiz-option-item/quiz-option-item.component';
import { EPropertyType } from 'src/app/core/enums/propertyTypes';
import { ESaleType } from 'src/app/core/enums/saleTypes';

@Component({
  selector: 'app-quiz-question-property-type',
  templateUrl: './quiz-question-property-type.component.html',
  styleUrls: ['./quiz-question-property-type.component.scss']
})
export class QuizQuestionPropertyTypeComponent implements OnInit {

  @Input() quiz: Quiz;
  quizOptionItems: IQuizOptionItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeQuestionOptions();
  }

  initializeQuestionOptions(): void {
    this.quizOptionItems = [
      {
        iconPath: "assets/icons/apartments.svg",
        label: "Apartment",
        value: EPropertyType.Apartment
      },
      {
        iconPath: "assets/icons/condo.svg",
        label: "Condo",
        value: EPropertyType.Condo
      },
      {
        iconPath: "assets/icons/house.svg",
        label: "House",
        value: EPropertyType.House
      }
    ];

    this.disableRestrictedOptions();

    if (this.quiz.propertyTypes)
      this.quiz.propertyTypes.forEach(propertyType => {
        this.quizOptionItems.find(q => q.value == propertyType).selected = true;
      });
  }

  selectOption(propertyType: EPropertyType): void {
    let propertyTypeIndexInQuiz: number = this.quiz.propertyTypes.findIndex(q => q == propertyType);
    if (propertyTypeIndexInQuiz > -1) this.quiz.propertyTypes.splice(propertyTypeIndexInQuiz, 1);
    else this.quiz.propertyTypes.push(propertyType);

    this.quiz.updatePropertyTypes(this.quiz.propertyTypes);
    this.updateSelectedOption();
  }

  updateSelectedOption(): void {
    this.quizOptionItems.forEach(option => {
      option.selected = false;
    });

    this.quiz.propertyTypes.forEach(propertyType => {
      this.quizOptionItems.find(q => q.value == propertyType).selected = true;
    })
  }

  disableRestrictedOptions(): void {
    this.quizOptionItems.forEach(o => {
      if (!this.quiz.availablePropertyTypes.find(propertyType => propertyType == o.value))
        o.disabled = true;
    })
  }
}
