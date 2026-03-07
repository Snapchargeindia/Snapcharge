// src/siliconeCoverData.js

import sl1 from "./assets/sl1.png";
import sl2 from "./assets/sl2.png";
import sl3 from "./assets/sl3.png";
import sl4 from "./assets/sl4.png";
import sl5 from "./assets/sl5.png";
import sl6 from "./assets/sl6.png";
import sl7 from "./assets/sl7.png";
import sl8 from "./assets/sl8.png";
import sl9 from "./assets/sl9.png";
import sl10 from "./assets/sl10.png";
import sl11 from "./assets/sl11.png";
import sl12 from "./assets/sl12.png";
import sl13 from "./assets/sl13.png";
import sl14 from "./assets/sl14.png";
import sl15 from "./assets/sl15.png";
import sl16 from "./assets/sl16.png";
import sl17 from "./assets/sl17.png";
import sl18 from "./assets/sl18.png";
import sl19 from "./assets/sl19.png";
import sl20 from "./assets/sl20.png";
import sl21 from "./assets/sl21.png";
import sl22 from "./assets/sl22.png";
import sl23 from "./assets/sl23.png";
import sl24 from "./assets/sl24.png";
import sl25 from "./assets/sl25.png";


const variants = (price, mrp) => [
  { label: "iPhone 16 Pro Max", price, mrp, disabled: true },
  { label: "iPhone 16 Pro", price, mrp, disabled: true },
  { label: "iPhone 16 Plus", price, mrp },
  { label: "iPhone 16", price, mrp, disabled: true },
  { label: "iPhone 15 Pro Max", price, mrp },
  { label: "iPhone 15 Pro", price, mrp, disabled: true },
  { label: "iPhone 15", price, mrp, disabled: true },
  { label: "iPhone 14 Pro Max", price, mrp },
  { label: "iPhone 14 Pro", price, mrp },
  { label: "iPhone 14", price, mrp },
  { label: "iPhone 13 Pro Max", price, mrp },
  { label: "iPhone 13 Pro", price, mrp },
  { label: "iPhone 13", price, mrp, disabled: true },
  { label: "iPhone 12 Pro Max", price, mrp },
  { label: "iPhone 12/12 Pro", price, mrp, disabled: true },
];

export const siliconeCoverProducts = [
{
id:1,
name:"Apple Silicone Case with MagSafe - Midnight",
price:799,
mrp:1299,
images:[sl1,sl2,sl3],
details:"Premium Apple silicone case with MagSafe support and soft matte finish.",
specs:[
"Liquid silicone texture",
"MagSafe compatible",
"Raised camera protection",
"Soft microfiber lining",
"Premium grip"
],
variants:variants(799,1299)
},

{
id:2,
name:"Apple Silicone Case with MagSafe - Clay",
price:819,
mrp:1319,
images:[sl4,sl5,sl6],
details:"Elegant clay silicone MagSafe case offering smooth finish and reliable protection.",
specs:[
"Soft silicone finish",
"MagSafe support",
"Impact resistant corners",
"Slim ergonomic design",
"Scratch resistant"
],
variants:variants(819,1319)
},

{
id:3,
name:"Apple Silicone Case with MagSafe - Storm Blue",
price:839,
mrp:1339,
images:[sl7,sl8,sl9],
details:"Storm blue Apple silicone case designed with MagSafe and premium grip.",
specs:[
"MagSafe support",
"Shock absorbing frame",
"Soft-touch texture",
"Raised edge protection",
"Premium feel"
],
variants:variants(839,1339)
},

{
id:4,
name:"Apple Silicone Case with MagSafe - Stone Grey",
price:859,
mrp:1359,
images:[sl10,sl11,sl12],
details:"Stone grey silicone MagSafe case crafted for elegant minimal style.",
specs:[
"Matte silicone finish",
"Camera protection lip",
"MagSafe compatibility",
"Comfortable grip",
"Slim body"
],
variants:variants(859,1359)
},

{
id:5,
name:"Apple Silicone Case with MagSafe - Winter Blue",
price:879,
mrp:1379,
images:[sl13,sl14,sl15],
details:"Winter blue MagSafe silicone case with stylish smooth finish.",
specs:[
"Soft silicone outer",
"MagSafe magnet support",
"Shock resistant build",
"Premium texture",
"Slim design"
],
variants:variants(879,1379)
},

{
id:6,
name:"Apple Silicone Case with MagSafe - Denim",
price:899,
mrp:1399,
images:[sl16,sl17,sl18],
details:"Denim blue silicone case with MagSafe and strong everyday protection.",
specs:[
"Liquid silicone coating",
"MagSafe ready",
"Raised lens protection",
"Anti-slip grip",
"Comfortable hold"
],
variants:variants(899,1399)
},

{
id:7,
name:"Apple Silicone Case with MagSafe - Elderberry",
price:919,
mrp:1419,
images:[sl19,sl19,sl19],
details:"Elderberry colored MagSafe silicone case with stylish premium finish.",
specs:[
"Luxury silicone build",
"MagSafe compatibility",
"Shock protection",
"Smooth matte finish",
"Comfortable grip"
],
variants:variants(919,1419)
},

{
id:8,
name:"FineWoven Case with MagSafe - Pacific Blue",
price:939,
mrp:1439,
images:[sl20,sl21,sl22],
details:"FineWoven MagSafe case designed with elegant woven texture.",
specs:[
"FineWoven material",
"MagSafe support",
"Slim elegant design",
"Premium texture",
"Durable build"
],
variants:variants(939,1439)
},

{
id:9,
name:"Apple Silicone Case with MagSafe - Ultramarine",
price:959,
mrp:1459,
images:[sl23,sl24,sl25],
details:"Ultramarine silicone MagSafe case with premium soft-touch feel.",
specs:[
"MagSafe compatible",
"Soft silicone outer",
"Shock resistant body",
"Raised camera lip",
"Slim ergonomic design"
],
variants:variants(959,1459)
}
];

export function getSiliconeCoverById(id){
return siliconeCoverProducts.find(p=>p.id===Number(id))||null;
}

export function getRelatedSiliconeCovers(currentId){
return siliconeCoverProducts
.filter(p=>p.id!==Number(currentId))
.slice(0,4);
}