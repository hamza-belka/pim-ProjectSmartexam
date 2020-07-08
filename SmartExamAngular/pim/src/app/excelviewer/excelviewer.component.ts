import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExcelService } from 'app/services/excel/excel.service';
@Component({
  selector: 'app-excelviewer',
  templateUrl: './excelviewer.component.html',
  styleUrls: ['./excelviewer.component.scss']
})
export class ExcelviewerComponent implements OnInit {
  importContacts: any[];

  constructor( public dialogRef: MatDialogRef<ExcelviewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private excelserv:ExcelService) { }

  ngOnInit() {
   
  }

}
