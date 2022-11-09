import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  cols = 3
  category: string | undefined
  constructor() { }

  ngOnInit(): void {
  }

  onColumnsCountChange(colsNum: number): void{
    this.cols = colsNum
  }

  onShowCategory(category: string): void {
    this.category = category;
  }

}
