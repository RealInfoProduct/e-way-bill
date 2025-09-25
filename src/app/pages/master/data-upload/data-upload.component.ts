import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.scss']
})
export class DataUploadComponent implements OnInit{
  displayedColumns: string[] = [
    'srno',
    'invoiceDate',
    'partyName',
    'gstRegType',
    'gSTIN',
    'InvoiceType',
    'IsReverse',
    'State',
    'ItemName',
    'HSNCode',
    'Qty',
    'Rate',
    'GrossAmount',
    'SGSTRate',
    'SGSTAmount',
    'CGSTRate',
    'CGSTAmount',
    'IGSTRate',
    'IGSTAmount',
    'Cess',
    'NetTotal'
  ];

 datauploadList :any = []
  datauploadDataSource = new MatTableDataSource(this.datauploadList);

  @ViewChild(MatTable, { static: true }) table: MatTable<any> = Object.create(null);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);

  constructor(){}
  ngOnInit(): void {
   
  }

 applyFilter(filterValue: string): void {
      this.datauploadDataSource.filter = filterValue.trim().toLowerCase();
  }
    onExcelUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop();
  
      if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
  
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(worksheet);
  
          const formattedData = rawData.map((item: any) => {
            return {
              ...item,
              InvoiceDate: this.excelDateToString(item.InvoiceDate)
            };
          });
  
          this.datauploadList = formattedData;
          this.datauploadDataSource = new MatTableDataSource(this.datauploadList);
          this.datauploadDataSource.paginator = this.paginator;
          this.table.renderRows();
  
        };
  
        reader.readAsArrayBuffer(file);
      } else {
        console.error('Invalid file type. Please upload an Excel file.');
      }
    }
  }
  
  excelDateToString(serial: any): string {
    const excelEpoch = new Date(1899, 11, 30);
    const dayInMs = 24 * 60 * 60 * 1000;
  
    if (typeof serial === 'number') {
      const date = new Date(excelEpoch.getTime() + serial * dayInMs);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  
    return serial;
  }
  
}
