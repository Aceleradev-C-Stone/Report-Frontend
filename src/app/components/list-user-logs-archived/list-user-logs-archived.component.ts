import { Component, OnInit } from '@angular/core';
import { Button } from 'src/app/models/Button';
import { User } from 'src/app/models/User';
import { Log } from 'src/app/models/log';
import { AccountService } from 'src/app/services/account.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-list-user-logs-archived',
  templateUrl: './list-user-logs-archived.component.html',
  styleUrls: ['./list-user-logs-archived.component.css']
})
export class ListUserLogsArchivedComponent implements OnInit {

  public title: string = "Seus logs arquivados";
  public btnYourLogs: Button = { title: 'Seus logs', link: '/dashboard/yours' };
  public btnAllLogs: Button = { title: 'Todos os logs', link: '/dashboard/all' };

  private user: User;
  
  public logs: Log[];
  public selectedLog: Log;

  // Query options
  public queryTerm: string;
  public queryBy: string;
  public orderBy: string;
  public channel: string;

  constructor(
    private accountService: AccountService,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.setupUser();
    this.subscribeToLogs();
  }

  onLogSelected(log: Log) {
    this.selectedLog = log;
  }

  onLogsStateChanged() {
    this.subscribeToLogs();
  }

  onBackPressed() {
    this.selectedLog = null;
  }

  private setupUser() {
    this.user = this.accountService.userValue;
  }

  private subscribeToLogs() {
    this.logService.getAllArchivedByUserId(this.user.id)
      .subscribe(logs => this.logs = logs);
  }

}
