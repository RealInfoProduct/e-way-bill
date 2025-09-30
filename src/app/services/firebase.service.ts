import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { PartyList, FirmList, ProductList, InvoiceList, IncomeList, ExpensesList, ExpensesmasterList, UsersmasterList, AdminRegisterUser, DomainList } from '../interface/invoice';
import { collection } from '@firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  constructor(private fService: Firestore, private firestore: AngularFirestore) { }


  /////////////////////// registerUser List ////////////////////////


  addUserList(data: AdminRegisterUser) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'AdminRegisterUser'), data)
  }

  getUserList() {
    let dataRef = collection(this.fService, 'AdminRegisterUser')
    return collectionData(dataRef, { idField: 'id' })
  }

  ///////////////////////get Commonmethod Data ////////////////////////

 getAllCommonmethod(collectionName: string): Observable<any[]> {
    const userid = localStorage.getItem("userId")
    return this.firestore.collection(collectionName, (ref: any) => ref.where('userId', '==', userid)).valueChanges();
  }


  /////////////////////// Party List Data ////////////////////////

  addParty(payload: PartyList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'PartyList'), payload)
  }

  // getAllParty() {
  //   let dataRef = collection(this.fService, 'PartyList')
  //   return collectionData(dataRef, { idField: 'id' })
  // }

  deleteParty(deleteId: any) {
    let docRef = doc(collection(this.fService, 'PartyList'), deleteId);
    return deleteDoc(docRef)
  }

  updateParty(updateId: PartyList, payload: any) {
    let dataRef = doc(this.fService, `PartyList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Firm List Data ////////////////////////


  addFirm(payload: FirmList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'FirmList'), payload)
  }

  // getAllFirm() {
  //   let dataRef = collection(this.fService, 'FirmList')
  //   return collectionData(dataRef, { idField: 'id' })
  // }

  deleteFirm(deleteId: any) {
    let docRef = doc(collection(this.fService, 'FirmList'), deleteId);
    return deleteDoc(docRef)
  }

  updateFirm(updateId: FirmList, payload: any) {
    let dataRef = doc(this.fService, `FirmList/${updateId}`);
    return updateDoc(dataRef, payload)
  }


  /////////////////////// Product List Data ////////////////////////


  addProduct(payload: ProductList) {
    payload.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'ProductList'), payload)
  }

  getAllProduct() {
    let dataRef = collection(this.fService, 'ProductList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteProduct(deleteId: any) {
    let docRef = doc(collection(this.fService, 'ProductList'), deleteId);
    return deleteDoc(docRef)
  }

  updateProduct(updateId: ProductList, payload: any) {
    let dataRef = doc(this.fService, `ProductList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  /////////////////////// Invoice List ////////////////////////


  addInvoice(data: InvoiceList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'InvoiceList'), data)
  }

  
  updateInvoice(updateId: InvoiceList, payload: any) {
    let dataRef = doc(this.fService, `InvoiceList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteInvoice(deleteId: any) {
    let docRef = doc(collection(this.fService, 'InvoiceList'), deleteId);
    return deleteDoc(docRef)
  }

  getAllInvoice() {
    let dataRef = collection(this.fService, 'InvoiceList')
    return collectionData(dataRef, { idField: 'id' })
  }

  /////////////////////// Income List ////////////////////////


  addIncome(data: IncomeList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'IncomeList'), data)
  }

  getAllIncome() {
    let dataRef = collection(this.fService, 'IncomeList')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  updateIncome(updateId: number, payload: any) {
    let dataRef = doc(this.fService, `IncomeList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteIncome(deleteId: any) {
    let docRef = doc(collection(this.fService, 'IncomeList'), deleteId);
    return deleteDoc(docRef)
  }

  /////////////////////// Expenses List ////////////////////////


  addExpenses(data: ExpensesList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'ExpensesList'), data)
  }

  getAllExpenses() {
    let dataRef = collection(this.fService, 'ExpensesList')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  updateExpenses(updateId: number, payload: any) {
    let dataRef = doc(this.fService, `ExpensesList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  deleteExpenses(deleteId: any) {
    let docRef = doc(collection(this.fService, 'ExpensesList'), deleteId);
    return deleteDoc(docRef)
  }

  /////////////////////// Expenses Master List ////////////////////////

  addExpensesmaster(data: ExpensesmasterList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'ExpensesMasterList'), data)
  }

  getAllExpensesmaster() {
    let dataRef = collection(this.fService, 'ExpensesMasterList')
    return collectionData(dataRef, { idField: 'id' })
  }

    /////////////////////// Users List ////////////////////////


  addUsers(data: UsersmasterList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UsersList'), data)
  }

  getAllUsers() {
    let dataRef = collection(this.fService, 'UsersList')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  updateUsers(updateId: number, payload: any) {
    let dataRef = doc(this.fService, `UsersList/${updateId}`);
    return updateDoc(dataRef, payload)
  }

  // deleteUsers(deleteId: any) {
  //   let docRef = doc(collection(this.fService, 'UsersList'), deleteId);
  //   return deleteDoc(docRef)
  // }

    /////////////////////// Domain List ////////////////////////


  addDomain(data: DomainList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'DomainList'), data)
  }

  getAllDomain() {
    let dataRef = collection(this.fService, 'DomainList')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  // updateDomain(updateId: number, payload: any) {
  //   debugger
  //   let dataRef = doc(this.fService, `DomainList/${updateId}`);
  //   return updateDoc(dataRef, payload)
  // }

  deleteDomain(deleteId: any) {
    let docRef = doc(collection(this.fService, 'DomainList'), deleteId);
    return deleteDoc(docRef)
  }
}


