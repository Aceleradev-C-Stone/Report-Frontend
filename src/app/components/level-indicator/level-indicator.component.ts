import { Component, OnInit, Input } from '@angular/core';
import { LogLevel } from 'src/app/models/enums/LogLevel';

@Component({
  selector: 'app-level-indicator',
  templateUrl: './level-indicator.component.html',
  styleUrls: ['./level-indicator.component.css']
})
export class LevelIndicatorComponent implements OnInit {

  // Enum type declaration
  public LogLevel = LogLevel;

  public logLevelName: string;
  private _logLevel: LogLevel;

  public get logLevel() {
    return this._logLevel;
  }
  
  @Input() public set logLevel(value: any) {
    this._logLevel = value;
    this.logLevelName = this.getLogLevelName();
  }

  constructor() {}

  ngOnInit() {}

  private getLogLevelName(): string {
    return LogLevel.getName(this._logLevel);
  }

}
