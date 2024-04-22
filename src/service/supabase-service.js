import { Supabase } from "../config/supabase"

export const LoginModel = ({ email, password }) => {

    return Supabase.auth.signInWithPassword({
        email,
        password
        // ends here
    })
}

export function fetchAllProducts() {
    return Supabase
        .from("products")
        .select("*")
        .eq("inStock", true)
}

export function SaveInvoiceModel({
    product, salesRep, amount, vat, invoiceID, generated_by, branch
}) {
    return Supabase
        .from("invoices")
        .insert([{
            product,
            salesRep,
            amount,
            vat,
            invoiceID,generated_by,
            branch
        }])
        .select()
}

export function fetchAllInvoicesAdmin() {
    return Supabase
        .from("invoices")
        .select("*") 
}


export function fetchAllInvoices() {
    return Supabase
        .from("invoices")
        .select("*")
        .eq('deleted', false)
}


export function fetchAllInvoicesBySalesRep(user) {
    return Supabase
        .from("invoices")
        .select("*")
        .eq('generated_by', user)
        .eq('deleted', false)
}


export function fetchSingleInvoices(id) {
    console.log("Fething ", id)
    return Supabase
        .from("invoices")
        .select("*")
        .eq('invoiceID', id)
        .eq('deleted', false)
}

export function updateInvoiceStatus(id,marketerid,customerphone,data) {
    console.log(id)
    return Supabase
        .from('invoices')
        .update({
            paid: true,
            marketerid:marketerid,
            customerphone:customerphone,
            payData:data
        })
        .eq('invoiceID', id)
        // .select()
}

export function deleteInvoice(id, user) {
    return Supabase
        .from("invoices")
        .update({
            who_deleted: user,
            deleted:true
        })
        .eq('invoiceID', id)
}

// all marketers
export function getAllMarketers() {
    return Supabase
        .from("admins")
        .select("*")
        .eq('type', "Marketer")
}
 