import { scheduleOnce } from "@ember/runloop";
import { createWidget } from 'discourse/widgets/widget';

let layoutsError;
let layouts;


document.addEventListener("DOMContentLoaded", function() {
//mutation observer for labels
const observer = new MutationObserver(list => {
    add_labels();
let tempint =   setInterval(()=>{
  test_tags();
 clearInterval(tempint);
},500 );
  
});

//
let element = document.querySelector("#main-outlet");
observer.observe(element, {
    attributes: true,
    childList: true,
    subtree: true
});

//mutation observer for tags list


//change labels
add_labels();
   
//add header buttons
header_buttons();


test_tags();

if(!document.querySelectorAll('.brand-header .b-header').length){
  document.querySelector('.d-header-wrap').style.top = 0; 
}else{
  document.querySelector('.d-header .title').style.maxWidth = "100%";
}

});

function add_labels(){
  

let sub_cats = document.querySelectorAll("div.subcategories");
 if(sub_cats != null){

  sub_cats.forEach(element => {
 
  if( element.querySelector('.sub_cats') == null ){
    if(settings.sub_category_label.trim() != ""){
      let p = document.createElement(`h3`);
     // p.textContent = "Sub categories";
       p.textContent = settings.sub_category_label;
       p.classList.add("sub_cats");
       element.prepend(p);
     }
  }
  

 });
 }
 
 

  /* //add product help and support label
  if( document.querySelector('.cst_label') == null  ){

  if(settings.category_label.trim() != ""){

    if(document.querySelector('#categories-only-category') != null){
      document.querySelector('#categories-only-category').innerHTML = '<h3 class= "cst_label" >' + settings.category_label + '</h3>';
    }
  } 
    if(document.querySelectorAll('.cst_label').length > 1){
      document.querySelector('#categories-only-category').removeChild(document.querySelectorAll('.cst_label')[0])
    }

  } */

}

//if users is not loged in remove login/sugnup buttons from header and add them to top navigation bar
function header_buttons(){
  if(document.querySelectorAll('.brand-header .b-header').length){
    let btns = document.createElement('div');
    btns.classList.add('header-buttons');
    if(document.querySelector('.d-header .header-buttons .sign-up-button')){
    btns.appendChild(document.querySelector('.d-header .header-buttons .sign-up-button'));
    }
    if(document.querySelector('.d-header .header-buttons .login-button')){
    btns.appendChild(document.querySelector('.d-header .header-buttons .login-button'));
    }
    document.querySelector('.b-header .panel.clearfix').appendChild(btns);
  }
}


//show tags on sub-category page 
function test_tags(){


  let arr =[];
  let lis = null;
  let current_nav ;
  //check and select current navigation page tag || category
  if(document.querySelector("table.cst_tag_list") != null){
    return null;
  }
  if( document.querySelector(".category-navigation ") != null ){
  
      current_nav = document.querySelector(".category-navigation ");
     //  lis = document.querySelectorAll(".category-navigation .tag-drop .select-kit-collection li");
  }
  else if( document.querySelector(".tag-navigation ") != null ){
  
         current_nav =  document.querySelector(".tag-navigation ");
  
     //  lis = document.querySelectorAll( ".tag-navigation .tag-drop .select-kit-collection li");
  }
  
  if( current_nav?.querySelectorAll(".category-drop summary")[1]?.getAttribute("data-value") == ''){
  
      return;
  }

 // if( current_nav?.querySelector(".tag-drop summary").getAttribute("data-value") == '' ){
      
  // console.log("sdsds");
  
   //click tag filter to load tags to fetch from it 
    if( document.querySelector(".category-navigation .tag-drop .select-kit-header") != null || document.querySelector(".tag-navigation .tag-drop .select-kit-header") != null ){

    document.querySelector(".tag-drop .select-kit-header").click();
    
    }
  //get list of available tags
  lis = current_nav?.querySelectorAll(".tag-drop .select-kit-collection li");
  // console.log(lis);
  if( lis?.length != 0 && lis != undefined   ){
        //  console.log(lis);
      // console.log("lis not null");


        for (var i = 0; i <lis.length; ++i) {
         // console.log("for11");
            arr.push(lis[i].querySelector("a.discourse-tag ").innerText);

        }
       // console.log(arr);
        document.querySelector(".tag-drop .select-kit-header").click();

        let tag_html = '<table class="category-list cst_tag_list"> <thead> <tr> <th class="category"> <span role="heading" aria-level="2" id="categories-only-category"> <h3 class="cst_label"> Tags </h3> </span></th> </tr> </thead> <tbody aria-labelledby="categories-only-category">';
          
        
        if(arr.length == 0){
          return;
        }
        for (var j = 0; j < arr.length; ++j ){
         // console.log("for22");
          let is_active = "";
         if(document.querySelector(".tag-drop .select-kit-header").getAttribute('data-name') == arr[j]){
            is_active = "active"; 
         }
    tag_html += '<tr  class="no-description no-logo '+ is_active + ' "><td class="category" > <h3 id="ember63" class="ember-view tnms"> '+ arr[j] + '</h3></td></tr>';
    
        }
      
        tag_html += '</tbody></table>' ;
        
        //insert after tab nav
          if(document.querySelector(".navigation-container.tag-navigation") != undefined ){
            let ins_after = document.querySelector(".navigation-container.tag-navigation");
            ins_after.insertAdjacentHTML("afterend",  tag_html);
          
           // console.log('abc');
          }else if(document.querySelector(".navigation-container.category-navigation ") != undefined){
            let ins_after = document.querySelector(".navigation-container.category-navigation ");
            ins_after.insertAdjacentHTML("afterend",  tag_html);
          
          // console.log('xyz');
          }

          
       

        //document.querySelector("#list-area .contents").innerHTML = tag_html ;
        


        const buttons = document.querySelectorAll('h3.tnms');
        
        buttons.forEach( (button) => {
            button.addEventListener('click', (event) => {
              
        
                //console.log(event.target.innerText);
              //  document.querySelector(`[data-name=${CSS.escape(name)}]`);
              document.querySelector(".tag-drop .select-kit-header").click();
              document.querySelector(" .tag-drop .select-kit-body").style.visibility = "hidden";
            
              let interval = setInterval(function (){
           
                if(current_nav.querySelector(`.tag-drop .select-kit-collection li[data-name=${CSS.escape(event.target.innerText.trim().toLowerCase())}]`) != null){

                    clearInterval(interval);
                    current_nav.querySelector(`.tag-drop .select-kit-collection li[data-name=${CSS.escape(event.target.innerText.trim().toLowerCase())}]`).click();

                    

                }else if( current_nav.querySelector(`.tag-drop .select-kit-collection li[data-value=${CSS.escape(event.target.innerText.trim().toLowerCase())}]`) != null ){
  
                  clearInterval(interval);
                  current_nav.querySelector(`.tag-drop .select-kit-collection li[data-value=${CSS.escape(event.target.innerText.trim().toLowerCase())}]`).click();

                  if( document.querySelector(" .tag-drop .select-kit-body") != undefined){
                    document.querySelector(" .tag-drop .select-kit-body").style.visibility = "visible";
                  }
                
                  
                }
        
            },500);
                      
            })
        });
  
  }
  
//}
  
  }


