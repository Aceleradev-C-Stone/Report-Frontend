import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/models/Log';
import { LogService } from 'src/app/services/log.service';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { Button } from 'src/app/models/Button';

@Component({
  selector: 'app-list-user-logs',
  templateUrl: './list-user-logs.component.html',
  styleUrls: ['./list-user-logs.component.css']
})
export class ListUserLogsComponent implements OnInit {

  public title: string = "Seus logs";
  public btnArchivedLogs: Button = { title: 'Arquivados', link: '/dashboard/yours/archived' };
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
    this.logService.getAllUnarchivedByUserId(this.user.id)
      .subscribe(logs => this.logs = logs);
  }

}
