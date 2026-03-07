// src/watchCaseData.js

import watch1 from "./assets/watch1.png";
import watch2 from "./assets/watch2.png";
import watch3 from "./assets/watch3.png";
import watch4 from "./assets/watch4.png";
import watch5 from "./assets/watch5.png";
import watch6 from "./assets/watch6.png";
import watch7 from "./assets/watch7.png";
import watch8 from "./assets/watch8.png";
import watch9 from "./assets/watch9.png";
import watch10 from "./assets/watch10.png";
import watch11 from "./assets/watch11.png";
import watch12 from "./assets/watch12.png";
import watch13 from "./assets/watch13.png";
import watch14 from "./assets/watch14.png";
import watch15 from "./assets/watch15.png";
import watch16 from  "./assets/watch16.png";
import watch17 from "./assets/watch17.png";
import watch18 from "./assets/watch18.png";

export const watchCaseProducts = [

{
id:1,
name:"Apple Watch Protective Hard Case - Clear",
price:599,
mrp:999,
images:[watch1,watch2,watch3],
details:"Transparent protective hard case designed to protect Apple Watch from scratches and bumps.",
specs:[
"Crystal clear protective case",
"Raised edge protection",
"Lightweight slim design",
"Scratch resistant finish",
"Easy snap-on installation",
"Precise button cutouts"
],
variants:[
{label:"41mm",price:599,mrp:999},
{label:"45mm",price:599,mrp:999},
{label:"49mm",price:699,mrp:1099}
]
},

{
id:2,
name:"Apple Watch Protective Hard Case - Midnight",
price:629,
mrp:1029,
images:[watch4,watch5,watch6],
details:"Midnight color protective case offering stylish look with durable protection.",
specs:[
"Premium midnight finish",
"Durable protective shell",
"Shock resistant design",
"Slim lightweight profile",
"Easy installation",
"Precise cutouts"
],
variants:[
{label:"41mm",price:629,mrp:1029},
{label:"45mm",price:629,mrp:1029},
{label:"49mm",price:729,mrp:1129}
]
},

{
id:3,
name:"Apple Watch Protective Hard Case - Light Pink",
price:629,
mrp:1029,
images:[watch16,watch17,watch18],
details:"Light pink protective watch case for stylish everyday protection.",
specs:[
"Premium protective material",
"Stylish pink finish",
"Scratch resistant surface",
"Raised edge protection",
"Lightweight slim design",
"Perfect Apple Watch fit"
],
variants:[
{label:"41mm",price:629,mrp:1029},
{label:"45mm",price:629,mrp:1029},
{label:"49mm",price:729,mrp:1129}
]
},

{
id:4,
name:"Apple Watch Protective Hard Case - Storm Blue",
price:649,
mrp:1049,
images:[watch13,watch14,watch15],
details:"Storm blue case designed for durable protection and modern style.",
specs:[
"Storm blue premium finish",
"Durable hard shell",
"Raised screen protection",
"Scratch resistant coating",
"Lightweight design",
"Easy snap-on installation"
],
variants:[
{label:"41mm",price:649,mrp:1049},
{label:"45mm",price:649,mrp:1049},
{label:"49mm",price:749,mrp:1149}
]
},

{
id:5,
name:"Apple Watch Protective Hard Case with Screen Guard - White",
price:699,
mrp:1099,
images:[watch10,watch11,watch12],
details:"Protective case with built-in screen guard for complete watch protection.",
specs:[
"Integrated screen protector",
"Full watch protection",
"Shock resistant frame",
"Clear display protection",
"Easy installation",
"Precise cutouts"
],
variants:[
{label:"41mm",price:699,mrp:1099},
{label:"45mm",price:699,mrp:1099},
{label:"49mm",price:799,mrp:1199}
]
},

{
id:6,
name:"Apple Watch Protective Hard Case with Screen Guard - Storm Blue",
price:699,
mrp:1099,
images:[ watch7,watch8,watch9],
details:"Storm blue protective case with integrated screen guard.",
specs:[
"Built-in screen protector",
"Shock resistant protection",
"Premium storm blue finish",
"Scratch resistant surface",
"Slim protective design",
"Perfect Apple Watch fit"
],
variants:[
{label:"41mm",price:699,mrp:1099},
{label:"45mm",price:699,mrp:1099},
{label:"49mm",price:799,mrp:1199}
]
}

];

export function getWatchCaseById(id){
return watchCaseProducts.find((p)=>p.id===Number(id))||null;
}

export function getRelatedWatchCases(currentId){
return watchCaseProducts
.filter((p)=>p.id!==Number(currentId))
.slice(0,4);
}