import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'loqatePOC';
  public errorMessage: any;
  @ViewChild('searchBox') searchBox:ElementRef;

  public ngOnInit(): void {

  }
  constructor() {
  }

  public showClear() {
    // document.getElementById("clearButton").style.display = "block";
  }
  
  public clearSearch() {
    var input = this.searchBox.nativeElement.value;
    input = "";
  }
  
  public showError(message: any) {
    this.errorMessage = message;
  }
  
  public enterSearch(e?: any) {
    // if (e.keyCode == 13){
      this.findAddress();  
    // }
  }
  
  public findAddress(SecondFind?: any) {
    var Text = this.searchBox.nativeElement.value;
    
    if (Text === "") {
      this.showError("Please enter an address");
      return;
    }
    
    var Container = "";     
        
    if (SecondFind !== undefined){
       Container = SecondFind;
    } 
    
  var Key = "AE11-AY65-HH84-KU37",
      IsMiddleware = false,
      Origin = "",
      Countries = "GBR",
      Limit = "10",
      Language = "en-gb",  
      url = 'https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.10/json3.ws';
  var params = '';
      params += "&Key=" + encodeURIComponent(Key);
      params += "&Text=" + encodeURIComponent(Text);
      params += "&IsMiddleware=" + encodeURIComponent(IsMiddleware);
      params += "&Container=" + encodeURIComponent(Container);
      params += "&Origin=" + encodeURIComponent(Origin);
      params += "&Countries=" + encodeURIComponent(Countries);
      params += "&Limit=" + encodeURIComponent(Limit);
      params += "&Language=" + encodeURIComponent(Language);
  var http = new XMLHttpRequest();
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
        var response = JSON.parse(http.responseText);
        if (response.Items.length == 1 && typeof(response.Items[0].Error) != "undefined") {
          //  this.showError(response.Items[0].Description);
          //  this.errorMessage = response.Items[0].Description;
        }
        else {
          if (response.Items.length == 0) {
            // this.showError("Sorry, there were no results");
            // this.errorMessage = 'Sorry, there were no results';
          } else {
            var resultBox = document.getElementById("result");
            
            if (resultBox && resultBox.childNodes.length > 0) {
              var selectBox = document.getElementById("mySelect");
              if (selectBox !== null && selectBox.parentNode !== null) {
                selectBox.parentNode.removeChild(selectBox);
              }
            }
                
            var resultArea = document.getElementById("result");
            var list = document.createElement("select");
                list.id = "selectList";
                list.setAttribute("id", "mySelect");
                resultArea && resultArea.appendChild(list);
            
            var defaultOption = document.createElement("option");
             defaultOption.text = "Select Address";
            defaultOption.setAttribute("value", "");
            defaultOption.setAttribute("selected", "selected");
            list.appendChild(defaultOption);
  
            for (var i = 0; i < response.Items.length; i++){    
              var option = document.createElement("option"); 
              option.setAttribute("value", response.Items[i].Id)
              option.text = response.Items[i].Text + " " + response.Items[i].Description;
              option.setAttribute("class", response.Items[i].Type)
                                                          
              list.appendChild(option);
            }
                             
          }
      }
    }
  }
  this.selectAddress(Key);
    http.send(params);
  };  
  
  public selectAddress(Key?: any){
      var resultList = document.getElementById("result");
      if (resultList !== null) {
        if (resultList.childNodes.length > 0) {   
          var elem = document.getElementById("mySelect");
            
          //IE fix
          if (elem) {
            elem.onchange = function (e: any) {
                  
              var target = e.target && e.target[e.target.selectedIndex];
              
              if (target.text === "Select Address") {
                return;
              }   

              if (target.className === "Address"){
                // this.retrieveAddress(Key, target.value);
              }
              
              else {
                // this.findAddress(target.value)
              }             
          };  
          }      
            } 
      }
  };
  
  retrieveAddress(Key: any, Id: any){
    var Field1Format = "";
    var url = 'https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3.ws';
    var params = '';
        params += "&Key=" + encodeURIComponent(Key);
        params += "&Id=" + encodeURIComponent(Id);
        params += "&Field1Format=" + encodeURIComponent(Field1Format);
     
  var http = new XMLHttpRequest();
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
        var response = JSON.parse(http.responseText);
  
        if (response.Items.length == 1 && typeof(response.Items[0].Error) != "undefined") {
          // this.showError(response.Items[0].Description);
        }
        else {
          if (response.Items.length == 0) {
            // this.showError("Sorry, there were no results");
          }
          else {           
            var res = response.Items[0];
            var resBox = document.getElementById("output");
            if (resBox) {
              resBox.innerText = res.Label; 
            }    
            // document.getElementById("output").style.display = "block";
            // document.getElementById("seperator").style.display = "block";
         }
      }
    }
  }
    http.send(params); 
  }

}
