import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() public onSearchTermChanged = new EventEmitter<string>();

  public focused;

  constructor() {}

  ngOnInit() {}

  onSearchTermChange(term: string) {
    this.onSearchTermChanged.emit(term);
  }

}
