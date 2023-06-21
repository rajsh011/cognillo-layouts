import { registerUnbound } from "discourse-common/lib/helpers";
import { registerHelper } from "discourse-common/lib/helpers";


/* registerUnbound("Check_cat",function ( a, b ) {
  //  let temp = a.split(",",3);
  let temp = [ ...a ];
alert(temp);
  temp.indexOf(b);
 // temp.includes( b);
 /*    if (  ){
        return true;
    }else{
        return false;
    } 

});
 */

registerUnbound("Check_cat",function (a,b) {

    if (a == b ){
        return true;
    }else{
        return false;
    }

});
