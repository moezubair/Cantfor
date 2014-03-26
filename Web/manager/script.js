/*Javascript "backend" for UI Demo*/

/*
* Invoice record class
*/
function InvoiceRecord(id, title, date, record_status, owner){
    this.id = id; 
    this.title = title; 
    this.date = date;
    this.record_status = record_status;
    if(typeof owner == 'undefined'){
        this.owner = "APAR Manager";
        this.subscribers = new Array("APAR Manager");
    }else{
        this.owner = owner; 
        this.subscribers = new Array("APAR Manager", owner);
    }
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

/*
* Manages the entire display and the current user
*/
function Display(arr, curr){
    this.user = "APAR Manager"
    this.records = arr; 
    this.current = curr; 
    this.current_filter = "ALL";
}
/*
* Updates the invoice record side
* bar to display the invoice records
* that have a record_status @param:type
*/
Display.prototype.show_records = function(type){
    this.clearInvoiceRecords();
    this.current_filter = type; 
    for(i in this.records){
        if(type === "ALL" && this.records[i].subscribers.indexOf(this.user) != -1){ //show all of the records that the user is subscribed too.
            this.addInvoiceRow(this.records[i], i);
        } 
        else if(type === "OWNER" && this.records[i].owner === this.user && this.records[i].subscribers.indexOf(this.user) != -1){
            this.addInvoiceRow(this.records[i], i);
        }
        else if(records[i].record_status === type && this.records[i].subscribers.indexOf(this.user) != -1){ //filter by type
            this.addInvoiceRow(this.records[i], i);
        }
    }
    this.displayInvoiceRecord(this.current); 
};

/*
* Adds a new row in the invoice record
* table with the data in record.
*/
Display.prototype.addInvoiceRow = function(record, i){
    var s = "<tr onclick='disp.displayInvoiceRecord("+i+")'>";
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
Display.prototype.clearInvoiceRecords = function(){
   var table = document.getElementById("invoice-record-table-body");
   for(var i = table.rows.length - 1; i >= 0; i--){
        table.deleteRow(i);
   }
}

/*
* Displays the invoice record information in the main pane
*/
Display.prototype.displayInvoiceRecord = function(i){
    console.log("Display.displayInvoiceRecord("+i+")");

    this.clearInvoiceRecordDisplay();  //clear all fields. 
    this.current = i; 

    // Update all fields within the invoice display.
    $("#invoice-record-title").text(this.records[i].title); 
    $("#invoice-record-date-field").text(this.records[i].date); 
    $("#invoice-record-owner-field").text(this.records[i].owner); 
    $("#invoice-record-id-field").text(this.records[i].id); 
    $("#invoice-record-status-field").text(this.records[i].record_status); 

    var s = ""; 
    for(j in this.records[i].subscribers){
       s += this.records[i].subscribers[j]+", " 
    }
    $("#invoice-record-subscribers-field").text(s); 

    //enable appropriate buttons
    if(this.records[i].owner === this.user){
        if(this.records[i].record_status === "NEW"){
            $("#approve-button").removeAttr("disabled");
            $("#reject-button").removeAttr("disabled");
            $("#flag-button").removeAttr("disabled");
        }else if(this.records[i].record_status === "APPROVED"){
            $("#verify-button").removeAttr("disabled");
        }else if(this.records[i].record_status === "FLAGGED"){
            $("#approve-button").removeAttr("disabled");
            $("#reject-button").removeAttr("disabled");
        }else if(this.records[i].record_status === "VERIFIED"){
            $("#paid-button").removeAttr("disabled");
        }else if(this.records[i].record_status === "PAID" && this.user === "Accountant"){
            $("#reconcile-button").removeAttr("disabled");
        }
    }
};

/*
* Clears all fields in the invoice records
* display
*/
Display.prototype.clearInvoiceRecordDisplay = function(){
    console.log("Display.clearInvoiceRecordDisplay()");
    $("#invoice-record-title").empty();     
    $("#invoice-record-id-field").empty();     
    $("#invoice-record-date-field").empty();     
    $("#invoice-record-owner-field").empty();     
    $("#invoice-record-subscribers-field").empty();     
    $("#invoice-record-status-field").empty();     


    //disable all buttons.
    $("#approve-button").attr("disabled",'disabled'); 
    $("#verify-button").attr("disabled",'disabled'); 
    $("#flag-button").attr("disabled",'disabled'); 
    $("#reject-button").attr("disabled",'disabled'); 
    $("#paid-button").attr("disabled",'disabled'); 
    $("#reconcile-button").attr("disabled",'disabled'); 
};

Display.prototype.changeInvoiceStatus = function(stat){
    this.records[this.current].setRecordStatus(stat);   
    this.show_records(this.current_filter); 
    this.displayInvoiceRecord(this.current); 
};

Display.prototype.assumeOwnership = function(){
    this.records[this.current].owner = this.user; 
    this.show_records(this.current_filter); 
    this.displayInvoiceRecord(this.current); 
};

Display.prototype.subscribe = function(user){
    this.records[this.current].subscribers.push(user); 
    this.show_records(this.current_filter); 
    this.displayInvoiceRecord(this.current); 
}
Display.prototype.assign = function(user){
    this.records[this.current].owner = user; 
    this.show_records(this.current_filter); 
    this.displayInvoiceRecord(this.current); 
}

Display.prototype.init = function(){
    $("#username").text(this.user);
}
/*===========================================*/
//END FUNCTIONS
/*===========================================*/









//===================================================
//Main Code
//===================================================
var record_1 = new InvoiceRecord(1, "MacBook Air Purchase", "2014-01-01", "NEW", "Branch Clerk"); 
var record_2 = new InvoiceRecord(2, "10000 Pages of Paper", "2014-02-15", "FLAGGED", "Branch Clerk"); 
var record_3 = new InvoiceRecord(3, "New Desk From Staples", "2014-01-11", "PAID", "Branch Manager"); 
var record_4 = new InvoiceRecord(4, "Black liquid ink pens", "2014-03-10", "APPROVED", 'APAR Clerk'); 
var record_5 = new InvoiceRecord(5, "Monitors from Acer", "2014-03-15", "VERIFIED", 'APAR Manager'); 
var record_6 = new InvoiceRecord(6, "Coffee from Thrifties", "2014-03-01", "NEW"); 
var record_7 = new InvoiceRecord(7, "Wall clock from Homehardware", "2014-03-12", "NEW", "Branch Manager"); 
var record_8 = new InvoiceRecord(8, "Overhead projector", "2013-09-12", "PAID", "APAR Manager"); 
var record_9 = new InvoiceRecord(9, "New set of desk top phones", "2014-02-03", "NEW", "APAR Clerk"); 
var record_10 = new InvoiceRecord(10, "Desk chairs", "2014-01-21", "NEW", "Branch Manager"); 

//add some subscribers
record_1.subscribers.push("John");
record_1.subscribers.push("Joe");

record_2.subscribers.push("Sarah");
record_2.subscribers.push("Joe");

record_3.subscribers.push("Logan");
record_3.subscribers.push("Alex");

record_4.subscribers.push("Logan");
record_4.subscribers.push("Alex");
record_4.subscribers.push("Warren");

var records = new Array(
    record_1, 
    record_2,
    record_3, 
    record_4,
    record_5, 
    record_6, 
    record_7,
    record_8,
    record_9,
    record_10
);
var disp = new Display(records, 0);
disp.user = "Branch Manager";
disp.show_records(disp.current_filter);
disp.init(); 
console.log(disp.records); 


