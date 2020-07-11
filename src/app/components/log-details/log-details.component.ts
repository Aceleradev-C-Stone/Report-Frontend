import { Component, OnInit, Input, Output, EventEmitter, LOCALE_ID, Inject } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogLevel } from 'src/app/models/enums/LogLevel';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.css']
})
export class LogDetailsComponent implements OnInit {

  @Input() log: Log;

  @Output() onBackPressed = new EventEmitter<void>();

  public introPhrase: string;

  constructor(
    @Inject(LOCALE_ID) private locale: string
  ) {}

  ngOnInit() {
    this.generateIntroductionPhrase();
  }

  onBackPress() {
    this.onBackPressed.emit();
  }

  private generateIntroductionPhrase() {
    let data = this.getLogDataAsString();
    this.introPhrase = `${ data.level } no ${ data.source } em ${ data.when }`;
  }

  private getLogDataAsString(): any {
    return {
      level: this.getLogLevelName(this.log.level),
      source: this.log.source,
      when: this.getLogCreatedAtFormatted(this.log.createdAt)
    };
  }

  private getLogLevelName(level: LogLevel): string {
    return LogLevel.getName(level);
  }

  private getLogCreatedAtFormatted(createdAt: Date): string {
    return formatDate(createdAt, "dd/MM/yyyy HH:mm:ss", this.locale);
  }

}
