import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() percentage: number;
  @Input() size: ProgressBarSizeOption;
  ProgressBarSizeOption = ProgressBarSizeOption;

  constructor() { }

  ngOnInit(): void { }
}

export enum ProgressBarSizeOption {
  small = 'sm',
  medium = 'md',
  large = 'lg'
}
