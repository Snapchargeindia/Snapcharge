// src/wirelessAccessoriesData.js

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

export const wirelessAccessoryProducts = [

{
id:1,
name:"3-in-1 Wireless Charging Station with Touch Buttons",
price:1299,
mrp:1899,
images:[wc1,wc2,wc3],
details:"Wireless charging station designed for iPhone, Apple Watch and AirPods with convenient touch button controls.",
specs:[
"3-in-1 wireless charging",
"Touch control buttons",
"Fast charging support",
"Compact desk design",
"Anti-slip base",
"Stable charging output"
],
variants:[
{label:"Standard",price:1299,mrp:1899},
{label:"MagSafe",price:1399,mrp:1999},
{label:"Premium",price:1499,mrp:2099}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep dry and clean with microfiber cloth."
}
},

{
id:2,
name:"4-in-1 Wireless Charging Station with Touch Buttons",
price:1349,
mrp:1949,
images:[wc4,wc5,wc6],
details:"4-in-1 wireless charging dock allowing simultaneous charging of multiple devices with convenient touch operation.",
specs:[
"4-in-1 wireless charging",
"Touch button controls",
"Fast charging support",
"Stable magnetic alignment",
"Premium desk design",
"Temperature protection"
],
variants:[
{label:"Standard",price:1349,mrp:1949},
{label:"MagSafe",price:1449,mrp:2049},
{label:"Premium",price:1549,mrp:2149}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid water exposure."
}
},

{
id:3,
name:"Auto Rotatable 3-in-1 Wireless Charging Station",
price:1399,
mrp:1999,
images:[wc7,wc8,wc9],
details:"Auto-rotating wireless charging stand designed for convenient viewing and fast wireless charging.",
specs:[
"Auto rotating charging stand",
"3-in-1 wireless charging",
"Stable phone alignment",
"Fast charging output",
"Durable premium build",
"Compact modern design"
],
variants:[
{label:"Standard",price:1399,mrp:1999},
{label:"MagSafe",price:1499,mrp:2099},
{label:"Premium",price:1599,mrp:2199}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep charger clean and dry."
}
},

{
id:4,
name:"Auto Rotatable 3-in-1 Wireless Charging Station",
price:1399,
mrp:1999,
images:[wc10,wc11,wc12],
details:"Wireless charging stand with auto rotating display designed for desk convenience and efficient charging.",
specs:[
"3-device charging support",
"Auto rotating stand",
"Stable wireless output",
"Compact charging base",
"Premium build quality",
"Temperature safety control"
],
variants:[
{label:"Standard",price:1399,mrp:1999},
{label:"MagSafe",price:1499,mrp:2099},
{label:"Premium",price:1599,mrp:2199}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Clean gently with soft cloth."
}
},

{
id:5,
name:"4-in-1 Fast Charging Wireless Charger",
price:1449,
mrp:2049,
images:[wc13,wc14,wc15],
details:"Fast wireless charging station supporting multiple devices with high efficiency and stable power delivery.",
specs:[
"4-device charging support",
"Fast wireless charging",
"Magnetic alignment support",
"Compact premium design",
"Anti-slip charging base",
"Overheat protection"
],
variants:[
{label:"Standard",price:1449,mrp:2049},
{label:"MagSafe",price:1549,mrp:2149},
{label:"Premium",price:1649,mrp:2249}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Store in cool dry place."
}
},

{
id:6,
name:"3-in-1 Foldable Magnetic with MagSafe Wireless Charger",
price:1499,
mrp:2099,
images:[wc16,wc17,wc18],
details:"Foldable MagSafe wireless charger designed for travel and compact everyday charging setups.",
specs:[
"Foldable travel design",
"MagSafe magnetic charging",
"3-in-1 device support",
"Compact portable charger",
"Durable premium finish",
"Fast wireless charging"
],
variants:[
{label:"Standard",price:1499,mrp:2099},
{label:"MagSafe",price:1599,mrp:2199},
{label:"Premium",price:1699,mrp:2299}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid water and dust."
}
}

];

export function getWirelessAccessoryById(id){
return wirelessAccessoryProducts.find((p)=>p.id===Number(id))||null;
}

export function getRelatedWirelessAccessories(currentId){
return wirelessAccessoryProducts
.filter((p)=>p.id!==Number(currentId))
.slice(0,4);
}