import { Component, OnInit, Input } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';
import { EAmenities, RentAmenities } from 'src/app/core/enums/amenities';
import { IAmenity } from 'src/app/core/models/amenity';

@Component({
  selector: 'app-quiz-question-amenities',
  templateUrl: './quiz-question-amenities.component.html',
  styleUrls: ['./quiz-question-amenities.component.scss']
})
export class QuizQuestionAmenitiesComponent implements OnInit {

  @Input() quiz: Quiz;
  quizOptionItems: IAmenityOptionItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeQuestionOptions();
  }

  initializeQuestionOptions(): void {
    this.quizOptionItems = JSON.parse(JSON.stringify(RentAmenities));

    if (this.quiz.amenities)
      this.quiz.amenities.forEach(amenity => {
        this.quizOptionItems.find(q => q.value == amenity).selected = true;
      });
  }

  selectOption(amenity: EAmenities): void {
    this.quiz.updateAmenity(amenity);
    this.updateSelectedOption();
  }

  updateSelectedOption(): void {
    this.quizOptionItems.forEach(option => {
      option.selected = false;
    });

    this.quiz.amenities.forEach(amenity => {
      this.quizOptionItems.find(q => q.value == amenity).selected = true;
    })
  }

}

interface IAmenityOptionItem extends IAmenity {
  selected?: boolean;
  disabled?: boolean;
}