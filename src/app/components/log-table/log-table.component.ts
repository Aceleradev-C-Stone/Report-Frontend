import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Log } from 'src/app/models/log';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { Button } from 'src/app/models/Button';
import { LogService } from 'src/app/services/log.service';
import { AlertService } from 'src/app/services/alert.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.css']
})
export class LogTableComponent implements OnInit {

  @Input() public title: string;
  @Input() public btnArchiveTitle: string;
  @Input() public btnArchived: Button;
  @Input() public btnGoto: Button;

  @Input() public logs: Log[];

  @Input() public queryTerm: string;
  @Input() public queryBy: string;
  @Input() public orderBy: string;
  @Input() public channel: string;

  @Output() public onLogClicked = new EventEmitter();
  @Output() public onLogArchived = new EventEmitter();
  @Output() public onLogDeleted = new EventEmitter();

  public checkedLogs: Log[] = [];
  private isAllChecked: boolean = false;
  public get hasCheckedLog(): boolean {
    return this.checkedLogs && this.checkedLogs.length > 0;
  }

  public user: User;

  constructor(
    private modalService: BsModalService,
    private accountService: AccountService,
    private logService: LogService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.setupUser();
  }

  onAllLogsSelectionChange() {
    this.isAllChecked = !this.isAllChecked;
    this.checkedLogs = this.changeStateAndGetCheckedLogs();
  }

  onLogSelectionChange(event: any, log: Log) {
    this.changeCheckState(log, event.target.checked);
    if (log.isChecked) {
      this.checkedLogs.push(log);
    } else {
      this.removeArrayItem(this.checkedLogs, log);
    }
  }

  onLogClick(log: Log) {
    this.onLogClicked.emit(log);
  }

  onArchivePress() {
    this.archiveCheckedLogs();
  }

  onDeletePress() {
    this.showDeleteConfirmModal();
  }
  
  canUserChangeLog(log: Log): boolean {
    return log.userId === this.user.id;
  }

  private setupUser() {
    this.user = this.accountService.userValue;
  }

  private showDeleteConfirmModal() {
    const state = {
      title: `Tem certeza que deseja deletar os ${ this.checkedLogs.length } logs selecionados?`,
      btnCancelTitle: "Cancelar",
      btnConfirmTitle: "Deletar",
      onConfirmPressed: () => this.deleteCheckedLogs()
    };
    this.modalService.show(
      ConfirmModalComponent,
      {
        class: 'modal-dialog-centered',
        keyboard: true,
        initialState: state
      });
  }

  private archiveCheckedLogs() {
    this.checkedLogs.forEach(log => {
      this.logService.archive(log.id)
        .subscribe(() => {
          this.onLogArchived.emit();
          this.clearCheckedLogs();
        }, error => {
          this.alertService.error(error);
        });
    });
  }

  private deleteCheckedLogs() {
    this.checkedLogs.forEach(log => {
      this.logService.delete(log.id)
        .subscribe(() => {
          this.onLogDeleted.emit();
          this.clearCheckedLogs();
        }, error => {
          this.alertService.error(error);
        });
    });
  }

  private changeStateAndGetCheckedLogs(): Log[] {
    let changedLogs = [];
    this.logs.forEach(log => {
      var success = this.changeCheckState(log, this.isAllChecked);
      if (success)
        changedLogs.push(log);
    });
    return this.isAllChecked ? changedLogs : [];
  }

  private changeCheckState(log: Log, isChecked: boolean): boolean {
    if (this.canUserChangeLog(log)) {
      log.isChecked = isChecked;
      // Successful
      return true;
    }
    // Cannot change
    return false;
  }

  private clearCheckedLogs() {
    this.checkedLogs = [];
  }

  private removeArrayItem(array: any[], item: any) {
    let index = array.indexOf(item);
    array.splice(index, 1);
  }

}

