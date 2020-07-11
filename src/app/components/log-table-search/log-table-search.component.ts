import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { LogQueryOptions } from 'src/app/models/enums/LogQueryOptions';

@Component({
  selector: 'app-log-table-search',
  templateUrl: './log-table-search.component.html',
  styleUrls: ['./log-table-search.component.css'],
  providers: [{
    provide: BsDropdownConfig,
    useValue: { isAnimated: true, autoClose: true }
  }]
})
export class LogTableSearchComponent implements OnInit {

  // Enum type declaration
  public LogQueryOptions = LogQueryOptions;

  @Output() public onQueryTermChanged = new EventEmitter<string>();

  @Output() public onQueryByChanged = new EventEmitter<string>();
  @Output() public onOrderByChanged = new EventEmitter<string>();
  @Output() public onChannelChanged = new EventEmitter<string>();

  public queryBy: LogQueryOptions;
  public orderBy: LogQueryOptions;
  public channel: LogQueryOptions;

  constructor() {}

  ngOnInit() {
    // Initial selected options
    this.onQueryByChange(LogQueryOptions.Description);
    this.onOrderByChange(LogQueryOptions.Level);
    this.onChannelChange(LogQueryOptions.Development);
  }

  onQueryTermChange(queryTerm: string) {
    this.onQueryTermChanged.emit(queryTerm);
  }

  onQueryByChange(queryBy: LogQueryOptions) {
    this.queryBy = queryBy;
    let option = this.getQueryOption(queryBy);
    this.onQueryByChanged.emit(option);
  }

  onOrderByChange(orderBy: LogQueryOptions) {
    this.orderBy = orderBy;
    let option = this.getQueryOption(orderBy);
    this.onOrderByChanged.emit(option);
  }

  onChannelChange(channel: LogQueryOptions) {
    this.channel = channel;
    let option = this.getQueryOption(channel);
    this.onChannelChanged.emit(option);
  }

  private getQueryOption(searchBy: LogQueryOptions): string {
    switch (searchBy) {
      case LogQueryOptions.Level:         return 'level';
      case LogQueryOptions.Description:   return 'description';
      case LogQueryOptions.Source:        return 'source';
      case LogQueryOptions.Frequency:     return 'frequency';
      case LogQueryOptions.Production:    return 'production';
      case LogQueryOptions.Development:   return 'development';
      case LogQueryOptions.Homologation:  return 'homologation';
    }
  }

}
