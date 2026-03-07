// src/watchStrapData.js

import case1 from "./assets/case1.png";
import case2 from "./assets/case2.png";
import case3 from "./assets/case3.png";
import case4 from "./assets/case4.png";
import case5 from "./assets/case5.png";
import case6 from "./assets/case6.png";
import case7 from "./assets/case7.png";
import case8 from "./assets/case8.png";
import case9 from "./assets/case9.png";

export const watchStrapProducts = [

{
id:1,
name:"Dark Gray Sport Loop",
price:699,
mrp:1199,
images:[case1,case2,case3],
details:"Premium compatible watch strap designed for comfort, durability and everyday style. Crafted for a secure fit with breathable material.",
specs:[
"Premium nylon woven strap",
"Comfortable breathable fabric",
"Secure hook and loop closure",
"Lightweight everyday wear",
"Sweat resistant design",
"Compatible with Apple Watch"
],
variants:[
{label:"38mm / 40mm / 41mm",price:699,mrp:1199},
{label:"42mm / 44mm / 45mm",price:699,mrp:1199},
{label:"Apple Watch Ultra",price:799,mrp:1299}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Clean gently with a soft cloth and avoid harsh chemicals."
}
},

{
id:2,
name:"Forest Sport Loop",
price:729,
mrp:1229,
images:[case4,case5,case6],
details:"Sport loop watch strap built for durability and comfort with breathable woven material and adjustable secure fit.",
specs:[
"Premium woven strap material",
"Comfortable breathable design",
"Secure adjustable closure",
"Lightweight flexible strap",
"Durable everyday use",
"Compatible with Apple Watch"
],
variants:[
{label:"38mm / 40mm / 41mm",price:729,mrp:1229},
{label:"42mm / 44mm / 45mm",price:729,mrp:1229},
{label:"Apple Watch Ultra",price:829,mrp:1329}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid harsh chemicals and clean gently."
}
},

{
id:3,
name:"Purple Fog Sport Loop",
price:749,
mrp:1249,
images:[case7,case8,case9],
details:"Modern sport loop strap designed for daily comfort with stylish color finish and durable woven material.",
specs:[
"Soft woven nylon material",
"Comfortable all-day wear",
"Secure hook and loop design",
"Lightweight premium strap",
"Breathable sport loop fabric",
"Compatible with Apple Watch"
],
variants:[
{label:"38mm / 40mm / 41mm",price:749,mrp:1249},
{label:"42mm / 44mm / 45mm",price:749,mrp:1249},
{label:"Apple Watch Ultra",price:849,mrp:1349}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Clean gently with soft cloth."
}
}

];

export function getWatchStrapById(id){
return watchStrapProducts.find((p)=>p.id===Number(id))||null;
}

export function getRelatedWatchStraps(currentId){
return watchStrapProducts
.filter((p)=>p.id!==Number(currentId))
.slice(0,4);
}