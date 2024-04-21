import {
  USER,
  STUDENTVIEW,
  PRODUCTS,
  INVOICEPRODUCTS,
  SAVEDINVOICES,
  VIEWINVOICE
} from "../state/types";


export const User = (payload) => {
  return {
    type: USER,
    payload

  }

};

export const Products = (payload) => {
  return {
    type: PRODUCTS,
    payload

  }

};


export const View_student = (payload) => {
  return {
    type: STUDENTVIEW,
    payload

  };

}; 

export const Invoice_Product = (payload) => {
  return {
    type: INVOICEPRODUCTS,
    payload
  };

}; 

export const Saved_invoices = (payload) => {
  return {
    type: SAVEDINVOICES,
    payload
  };

}; 

export const View_invoice = (payload) => {
  return {
    type: VIEWINVOICE,
    payload
  };

}; 

