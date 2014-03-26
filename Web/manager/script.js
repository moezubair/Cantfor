/*Javascript "backend" for UI Demo*/

function InvoiceRecord(id, title, date, record_status){
    this.id = id; 
    this.title = title; 
    this.date = date;
    this.record_status = record_status;
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
var record_2 = new InvoiceRecord(2, "10000 Pages of Paper", "2014-01-01", "NEW"); 
var record_3 = new InvoiceRecord(3, "New Desk From Staples", "2014-01-01", "NEW"); 

var records = new Array(record_1, record_2, record_3);

console.log(records); 

function show_records(type){
    for(i in records){
        if(type == "ALL"){
            addInvoiceRow(i);
        }else if(type == "NEW"){
            addInvoiceRow(i);
        }
    }
};

function addInvoiceRow(record){
    var s = "<tr>";
    s += "<td>"+record.id+"</td>";
    s += "</tr>";
    $("#invoice-record-table").append(s)
};
