import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Quiz } from 'src/app/core/classes/quiz';
import { environment } from 'src/environments/environment';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ISearchLocation } from 'src/app/core/models/location';

@Component({
  selector: 'app-quiz-question-location',
  templateUrl: './quiz-question-location.component.html',
  styleUrls: ['./quiz-question-location.component.scss']
})
export class QuizQuestionLocationComponent implements OnInit {

  @Input() quiz: Quiz;
  citySearchPrefix: string;
  timer;

  searchLocations: ISearchLocation[];

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {
  }

  queryCitiesAfterTimerExpires(): void {
    clearTimeout(this.timer);

    // Make a new timeout set to go off in 500ms
    this.timer = setTimeout(() => {
      this.getCities()
    }, 500);
  }

  async getCities(): Promise<void> {
    if (this.citySearchPrefix == "") return;
    this.searchLocations = (await this.citiesService.getCitiesFromPrefix(this.citySearchPrefix)).splice(0, 5);
  }

  chooseLocation(location: ISearchLocation): void {
    this.citySearchPrefix = this.getFullStringOfLocation(location);
    this.quiz.updateLocation(location);
  }

  isSelectedLocation(location: ISearchLocation): boolean {
    return location == this.quiz.location;
  }

  getFullStringOfLocation(location: ISearchLocation): string {
    return location.city + ", " + location.state;
  }

  get showChosenOptionSeparately(): boolean {
    return !!this.quiz.location && (!this.searchLocations || !this.searchLocations.find(l => l == this.quiz.location));
  }

  get showNoLocationsMessage(): boolean {
    return this.citySearchPrefix && this.citySearchPrefix.length > 0 && (this.searchLocations && this.searchLocations.length == 0);
  }
}
