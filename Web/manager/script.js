/*Javascript "backend" for UI Demo*/

function InvoiceRecord(id, title, date, record_status){
    this.id = id; 
    this.title = title; 
    this.date = date;
    this.record_status = record_status;
    this.owner = "APAR Manager";
    this.subscribers = new Array();
}
InvoiceRecord.prototype.getTitle = function(){
    return this.title;
};
InvoiceRecord.prototype.getId = function(){
    return this.id;
};
InvoiceRecord.prototype.getDate = function(){
    return this.date;
};
InvoiceRecord.prototype.getRecordStatus = function(){
    return this.record_status;
};
InvoiceRecord.prototype.setRecordStatus = function(x){
    this.record_status = x;
};
InvoiceRecord.prototype.setDate = function(x){
    this.date = x;
};
InvoiceRecord.prototype.setId = function(x){
    this.id = x;
};
InvoiceRecord.prototype.setTitle = function(x){
    this.title = x;
};

var record_1 = new InvoiceRecord(1, "MacBook Air Purchase", "2014-01-01", "NEW"); 
var record_2 = new InvoiceRecord(2, "10000 Pages of Paper", "2014-02-15", "FLAGGED"); 
var record_3 = new InvoiceRecord(3, "New Desk From Staples", "2014-01-11", "NEW"); 
var record_4 = new InvoiceRecord(4, "Black liquid ink pens", "2014-03-10", "APPROVED"); 
var record_5 = new InvoiceRecord(5, "Monitors from Acer", "2014-03-15", "VERIFIED"); 
var record_6 = new InvoiceRecord(6, "Coffee from Thrifties", "2014-03-01", "PAID"); 

var records = new Array(record_1, record_2, record_3, record_4, record_5, record_6);

show_records("ALL");

console.log(records); 

/*
* Updates the invoice record side
* bar to display the invoice records
* that have a record_status @param:type
*/
function show_records(type){
    clearInvoiceRecords();
    for(i in records){
        if(type === "ALL"){ //show all of the records
            addInvoiceRow(records[i], i);
        } 
        else if(records[i].record_status === type){ //filter by type
            addInvoiceRow(records[i], i);
        }
    }
};

/*
* Adds a new row in the invoice record
* table with the data in record.
*/
function addInvoiceRow(record, i){
    var s = "<tr onclick='displayInvoiceRecord("+i+")'>";
    s += "<td>";
    s += "<a href='#'>"
    if(record.record_status === "NEW"){
        s+= "<div class='small-box small-box-new'></div>"
    }else if(record.record_status === "APPROVED"){
        s+= "<div class='small-box small-box-approved'></div>"
    }else if(record.record_status === "FLAGGED"){
        s+= "<div class='small-box small-box-flagged'></div>"
    }else if(record.record_status === "VERIFIED"){
        s+= "<div class='small-box small-box-verified'></div>"
    }else if(record.record_status === "PAID"){
        s+= "<div class='small-box small-box-paid'></div>"
    }else{
        s+= "<div class='small-box'></div>"
    }

    s += "</td>"
    s += "</a>"
    s += "<td>"+record.id+"</td>";
    s += "<td><a href='#'>"+record.title+"</a></td>";
    s += "<td>"+record.date+"</td>";
    s += "</tr>";
    $("#invoice-record-table-body").append(s)
};

/*
* Clears the invoice records in the 
* side pane so that they can be replaced
*/
function clearInvoiceRecords(){
   var table = document.getElementById("invoice-record-table-body");
   for(var i = table.rows.length - 1; i >= 0; i--){
        table.deleteRow(i);
   }
}

/*
* Displays the invoice record information in the main pane
*/
function displayInvoiceRecord(i){
    console.log("displayInvoiceRecord("+i+")");

    clearInvoiceRecordDisplay();  //clear all fields. 

    // Update all fields within the invoice display.
    $("#invoice-record-title").text(records[i].title); 
    $("#invoice-record-date-field").text(records[i].date); 
    $("#invoice-record-owner-field").text(records[i].owner); 
    $("#invoice-record-id-field").text(records[i].id); 

    //enable appropriate buttons
    if(records[i].record_status === "NEW"){
        $("#approve-button").removeAttr("disabled");
        $("#reject-button").removeAttr("disabled");
        $("#flag-button").removeAttr("disabled");
    }else if(records[i].record_status === "APPROVED"){
        $("#verify-button").removeAttr("disabled");
    }else if(records[i].record_status === "FLAGGED"){
        $("#approve-button").removeAttr("disabled");
        $("#reject-button").removeAttr("disabled");
    }else if(records[i].record_status === "VERIFIED"){
        $("#paid-button").removeAttr("disabled");
    }else if(records[i].record_status === "PAID"){
        $("#reconcile-button").removeAttr("disabled");
    }
}

/*
* Clears all fields in the invoice records
* display
*/
function clearInvoiceRecordDisplay(){
    console.log("clearInvoiceRecordDisplay()");
    $("#invoice-record-title").empty();     
    $("#invoice-record-id-field").empty();     
    $("#invoice-record-date-field").empty();     
    $("#invoice-record-owner-field").empty();     
    $("#invoice-record-subscribers-field").empty();     

    //disable all buttons.
    $("#approve-button").attr("disabled",'disabled'); 
    $("#verify-button").attr("disabled",'disabled'); 
    $("#flag-button").attr("disabled",'disabled'); 
    $("#reject-button").attr("disabled",'disabled'); 
    $("#paid-button").attr("disabled",'disabled'); 
    $("#reconcile-button").attr("disabled",'disabled'); 
}
