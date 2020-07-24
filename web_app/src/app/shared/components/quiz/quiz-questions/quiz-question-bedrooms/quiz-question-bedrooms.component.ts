import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';
import { IQuizOptionItem } from '../../quiz-option-item/quiz-option-item.component';
import { EBedroomCount } from 'src/app/core/enums/bedroomCount';

@Component({
  selector: 'app-quiz-question-bedrooms',
  templateUrl: './quiz-question-bedrooms.component.html',
  styleUrls: ['./quiz-question-bedrooms.component.scss']
})
export class QuizQuestionBedroomsComponent implements OnInit {


  @Input() quiz: Quiz;
  quizOptionItems: IQuizOptionItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeQuestionOptions();
  }

  initializeQuestionOptions(): void {
    this.quizOptionItems = [
      {
        iconPath: "assets/icons/bed.svg",
        label: "Studio",
        value: EBedroomCount.Studio,
        selected: false
      },
      {
        iconPath: "assets/icons/one-person.svg",
        label: "One",
        value: EBedroomCount.One,
        selected: false
      },
      {
        iconPath: "assets/icons/two-persons.svg",
        label: "Two",
        value: EBedroomCount.Two,
        selected: false
      },

      {
        iconPath: "assets/icons/three-persons.svg",
        label: "Three or more",
        value: EBedroomCount.ThreeOrMore,
        selected: false
      }
    ];

    if (this.quiz.bedroomCounts)
      this.quiz.bedroomCounts.forEach(bedroomCount => {
        this.quizOptionItems.find(q => q.value == bedroomCount).selected = true;
      });
  }

  selectOption(bedroomCount: EBedroomCount): void {
    let bedroomCountIndexInQuiz: number = this.quiz.bedroomCounts.findIndex(q => q == bedroomCount);
    if (bedroomCountIndexInQuiz > -1) this.quiz.bedroomCounts.splice(bedroomCountIndexInQuiz, 1);
    else this.quiz.bedroomCounts.push(bedroomCount);

    this.quiz.updateBedroomCounts(this.quiz.bedroomCounts);
    this.updateSelectedOption();
  }

  updateSelectedOption(): void {
    this.quizOptionItems.forEach(option => {
      option.selected = false;
    });

    this.quiz.bedroomCounts.forEach(bedroomCount => {
      this.quizOptionItems.find(q => q.value == bedroomCount).selected = true;
    })
  }

}
