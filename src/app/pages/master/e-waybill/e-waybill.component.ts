import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-e-waybill',
  templateUrl: './e-waybill.component.html',
  styleUrls: ['./e-waybill.component.scss']
})
export class EWaybillComponent  implements OnInit{
ewaybillForm:FormGroup

supplytype:any =[
  'Outward',
  'lnward'
]

subtype:any =[
'Supply',
'Export',
'Job Work',
'SKD/CKD?Lots',
'Recipient Not Known',
'For Own Use',
'Exhibition or Fairs',
'Line Sales',
'Others'
]

documentTypeList:any =[
  'Tax Invoice',
  'Bill of Supply'
];

transactionTypeList:any = [
    'Regular',
  'Bill To - Ship To',
  'Bill From - Dispatc From',
  'Combination of 2 and 3',
]

Modetype:any =[
  'Road',
  'Rall',
  'Air',
  'Ship or ship Cum Road/Rall',
]

vehicletype:any =[
'Regular',
'Over Dimensional Cargo',
]

constructor(private fb: FormBuilder){}

ngOnInit(): void {
  this.ewaybillFormlist()  
}

ewaybillFormlist(){
this.ewaybillForm = this.fb.group({
  supplytype:[''],
  subtype:[''],
  documentType:[''],
  documentNo:[''],
  documentDate:[new Date()],
  transactionType:[''],
  name:[''],
  gstin:[''],
  state:[''],
  address1:[''],
  address2:[''],
  place:[''],
  pincode:[''],
  itemDetails: this.fb.array([this.createEWayBillDetailGroup()]),
  totalTaxbleAmount:[''],
  cGSTAmount:[''],
  sGSTAmount:[''],
  iGSTAmount:[''],
  cESSAdvolAmount:[''],
  cESSNonAdvolAmount:[''],
  otherAmount:[''],
  totalInvAmount:[''],
  transporterID:[''],
  modetype:[''],
  vehicletype:[''],
  vehicleNo:[''],
  transporterNo:[''],
  transporterDate:[new Date()],
})
}

 createEWayBillDetailGroup(): FormGroup {
    return this.fb.group({
       productName:[''],
       description:[''],
       hsn:[''],
       quantity:[''],
       unit:[''],
       taxableValue:[''],
       cgstsgst:[''],
       igst:[''],
       cESSAdvalRate:[''],
       cGSTnonAdvol:[''],
    });
  }


 get itemDetails(): FormArray {
    return this.ewaybillForm.get('itemDetails') as FormArray;
  }


removeRentDetail(index: number) {
    this.itemDetails.removeAt(index);
  }

   addRentDetail() {
    this.itemDetails.push(this.createEWayBillDetailGroup());
  }

  Preview(){}

  submit(){}

  exit(){}


}
