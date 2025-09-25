import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'aperture',
    route: '/dashboards/dashboard1',
  },
  {
    navCap: 'Master',
  },
  {
    displayName: 'Add Invoice',
    iconName: 'file-invoice',
    route: '/master/addinvoice',
  },
  {
    displayName: 'Invoice List',
    iconName: 'list-details',
    route: '/master/invoicelist',
  },
  {
    displayName: 'Expenses',
    iconName: 'receipt-tax',
    route: '/master/expenses',
  },
  {
    displayName: 'Product Master',
    iconName: 'brand-asana',
    route: '/master/productmaster',
  },
  {
    displayName: 'Party Master',
    iconName: 'users',
    route: '/master/partymaster',
  },
  {
    displayName: 'Firm Master',
    iconName: 'building-store',
    route: '/master/firmmaster',
  },
  {
    displayName: 'Users',
    iconName: 'building-store',
    route: '/master/users',
  },
  {
    displayName: 'E-way Bill',
    iconName: 'building-store',
    route: '/master/e-waybill',
  },
  {
    displayName: 'Data Upload',
    iconName: 'building-store',
    route: '/master/dataUpload',
  },
  
]