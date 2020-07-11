import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/log.service';
import { Button } from 'src/app/models/Button';
import { title } from 'process';

@Component({
  selector: 'app-list-all-logs',
  templateUrl: './list-all-logs.component.html',
  styleUrls: ['./list-all-logs.component.css'],
})
export class ListAllLogsComponent implements OnInit {

  public title: string = "Todos os logs";
  public btnYourLogs: Button = { title: 'Seus logs', link: '/dashboard/yours' };

  public logs: Log[];
  public selectedLog: Log;

  // Query options
  public queryTerm: string;
  public queryBy: string;
  public orderBy: string;
  public channel: string;

  constructor(
    private logService: LogService
  ) {}

  ngOnInit() {
    this.subscribeToLogs();
  }

  onLogSelected(log: Log) {
    this.selectedLog = log;
  }

  onLogDeleted() {
    this.subscribeToLogs();
  }

  onBackPressed() {
    this.selectedLog = null;
  }

  private subscribeToLogs() {
    this.logService.getAll()
      .subscribe(logs => this.logs = logs);
  }

}
