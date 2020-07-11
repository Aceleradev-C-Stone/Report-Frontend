import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  title: string;
  btnCancelTitle: string;
  btnConfirmTitle: string;

  onConfirmPressed: () => void;

  constructor(
    public modalRef: BsModalRef
  ){}

  ngOnInit() {}

  onConfirmPress() {
    this.onConfirmPressed();
    this.close();
  }

  onCancelPress() {
    this.close();
  }

  private close() {
    this.modalRef.hide();
  }

}
