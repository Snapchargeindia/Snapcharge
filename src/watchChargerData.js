// src/watchChargersData.js

import wc1 from "./assets/wc1.png";
import wc2 from "./assets/wc2.png";
import wc3 from "./assets/wc3.png";
import wc4 from "./assets/wc4.png";
import wc5 from "./assets/wc5.png";
import wc6 from "./assets/wc6.png";
import wc7 from "./assets/wc7.png";
import wc8 from "./assets/wc8.png";
import wc9 from "./assets/wc9.png";
import wc10 from "./assets/wc10.png";
import wc11 from "./assets/wc11.png";
import wc12 from "./assets/wc12.png";
import wc13 from "./assets/wc13.png";
import wc14 from "./assets/wc14.png";
import wc15 from "./assets/wc15.png";
import wc16 from "./assets/wc16.png";
import wc17 from "./assets/wc17.png";
import wc18 from "./assets/wc18.png";

export const watchChargerProducts = [

{
id:1,
name:"3-in-1 Apple Watch Wireless Charging Dock",
price:1299,
mrp:1899,
images:[wc1,wc2,wc3],
details:"Compact 3-in-1 charging dock designed for Apple Watch, iPhone and AirPods. Provides stable and efficient wireless charging with a clean desk setup.",
specs:[
"3-in-1 charging support",
"Magnetic watch alignment",
"Stable wireless charging output",
"Compact desktop design",
"Anti-slip base support",
"Premium durable build"
],
variants:[
{label:"Standard",price:1299,mrp:1899},
{label:"Fast Charging",price:1399,mrp:1999},
{label:"Travel Edition",price:1499,mrp:2099}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep charger away from moisture and clean gently."
}
},

{
id:2,
name:"Magnetic Apple Watch Fast Charger Stand",
price:1349,
mrp:1949,
images:[wc4,wc5,wc6],
details:"Magnetic charging stand designed for Apple Watch with stable positioning and comfortable bedside charging setup.",
specs:[
"Magnetic watch alignment",
"Fast charging support",
"Stable stand design",
"Anti-slip base",
"Compact bedside charger",
"Durable ABS build"
],
variants:[
{label:"Standard",price:1349,mrp:1949},
{label:"Fast Charging",price:1449,mrp:2049},
{label:"Premium",price:1549,mrp:2149}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Clean with soft cloth and avoid dust buildup."
}
},

{
id:3,
name:"Portable Apple Watch Magnetic Charger",
price:1399,
mrp:1999,
images:[wc7,wc8,wc9],
details:"Portable magnetic charger designed for Apple Watch users who need convenient charging during travel and daily commuting.",
specs:[
"Portable magnetic charging",
"Compact pocket-friendly size",
"Stable watch alignment",
"Travel friendly design",
"Lightweight charger body",
"Reliable charging performance"
],
variants:[
{label:"Standard",price:1399,mrp:1999},
{label:"Travel Pack",price:1499,mrp:2099},
{label:"Pro",price:1599,mrp:2199}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Store in dry place and avoid excessive heat."
}
},

{
id:4,
name:"Apple Watch Foldable Travel Charger",
price:1399,
mrp:1999,
images:[wc10,wc11,wc12],
details:"Foldable Apple Watch charger designed for travelers who want a compact and easy-to-carry charging solution.",
specs:[
"Foldable travel design",
"Magnetic watch support",
"Compact pocket charger",
"Lightweight build",
"Stable charging connection",
"Durable portable body"
],
variants:[
{label:"Standard",price:1399,mrp:1999},
{label:"Travel Edition",price:1499,mrp:2099},
{label:"Premium",price:1599,mrp:2199}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid dropping and clean gently."
}
},

{
id:5,
name:"Apple Watch Magnetic Charging Pad",
price:1449,
mrp:2049,
images:[wc13,wc14,wc15],
details:"Minimal magnetic charging pad built for stable Apple Watch charging with a clean and modern desk setup.",
specs:[
"Magnetic charging pad",
"Stable wireless output",
"Slim minimal design",
"Anti-slip base support",
"Compact desk charger",
"Premium surface finish"
],
variants:[
{label:"Standard",price:1449,mrp:2049},
{label:"Fast Charging",price:1549,mrp:2149},
{label:"Pro",price:1649,mrp:2249}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep dry and wipe with microfiber cloth."
}
},

{
id:6,
name:"Apple Watch Magnetic Fast Charging Dock",
price:1499,
mrp:2099,
images:[wc16,wc17,wc18],
details:"Premium fast charging dock designed for Apple Watch users who want quick and reliable daily charging.",
specs:[
"Magnetic fast charging support",
"Stable docking alignment",
"Premium desktop design",
"Durable build quality",
"Reliable power output",
"Long-lasting charging performance"
],
variants:[
{label:"Standard",price:1499,mrp:2099},
{label:"Fast Charging",price:1599,mrp:2199},
{label:"Premium Dock",price:1699,mrp:2299}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid moisture and store safely."
}
}

];

export function getWatchChargerById(id){
return watchChargerProducts.find((p)=>p.id===Number(id))||null;
}

export function getRelatedWatchChargers(currentId){
return watchChargerProducts
.filter((p)=>p.id!==Number(currentId))
.slice(0,4);
}