import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {

  @Output() showCategory = new EventEmitter<string>()
  categoriesSubcription: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getAllCategory().subscribe((resposne) => {
      this.categories = resposne;
    })
  }

  onShowCategory(category: string): void {
    this.showCategory.emit(category)
  }
  ngOnDestroy(): void {
    if (this.categoriesSubcription) {
      this.categoriesSubcription.unsubscribe()
    }
  }

}
