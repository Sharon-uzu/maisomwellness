import {
    USER,
    PRODUCTS,
    INVOICEPRODUCTS,
    SAVEDINVOICES,
    VIEWINVOICE
} from '../state/types'


const initialState = {
    User: null,
    AllProducts: [],
    AllInvoiceProducts: [],
    SavedInvoices: [],
    ViewInvoice: null
}





const reducer = (state = initialState, action) => {
    switch (action.type) {

        case USER:
            return {
                ...state,
                User: action.payload,
            }
        case PRODUCTS:
            return {
                ...state,
                AllProducts: action.payload

            }
        case INVOICEPRODUCTS:
            return {
                ...state,
                AllInvoiceProducts: action.payload

            }
        case SAVEDINVOICES:
            return {
                ...state,
                SavedInvoices: action.payload

            }
        case VIEWINVOICE:
            return {
                ...state,
                ViewInvoice: action.payload

            }


        default: return state
    }
}

export default reducer