import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/Modules/shared/components/dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string) {
    return this.dialog.open(DialogBoxComponent, {
      width: '390px',
      minHeight: '100px',
      disableClose: true,
      data: {
        message: msg
      }
    });
  }
}
