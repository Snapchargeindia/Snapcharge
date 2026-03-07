// src/laptopAccessoriesData.js

import lp1 from "./assets/lp1.png";
import lp2 from "./assets/lp2.png";
import lp3 from "./assets/lp3.png";
import lp4 from "./assets/lp4.png";
import lp5 from "./assets/lp5.png";
import lp6 from "./assets/lp6.png";
import lp7 from "./assets/lp7.png";
import lp8 from "./assets/lp8.png";
import lp9 from "./assets/lp9.png";
import lp10 from "./assets/lp10.png";
import lp11 from "./assets/lp11.png";
import lp12 from "./assets/lp12.png";
import lp13 from "./assets/lp13.png";
import lp14 from "./assets/lp14.png";
import lp15 from "./assets/lp15.png";
import lp16 from "./assets/lp16.png";
import lp17 from "./assets/lp17.png";
import lp18 from "./assets/lp18.png";
import lp19 from "./assets/lp19.png";
import lp20 from "./assets/lp20.png";
import lp21 from "./assets/lp21.png";

export const laptopAccessoryProducts = [

{
id:1,
name:"Space Capsule Wireless Mouse",
price:1499,
mrp:2199,
images:[lp1,lp2,lp3],
details:"Compact wireless mouse designed for smooth navigation and portable productivity.",
specs:[
"Precision wireless tracking",
"Ergonomic compact design",
"Long battery life",
"Silent click buttons",
"Portable lightweight build",
"Stable wireless connection"
],
variants:[
{label:"Standard",price:1499,mrp:2199},
{label:"Pro",price:1699,mrp:2399},
{label:"Multi-Device",price:1899,mrp:2599}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep dry and clean gently with a soft cloth."
}
},

{
id:2,
name:"Carbon Steel Laptop Stand with 360 Rotating",
price:1579,
mrp:2279,
images:[lp4,lp5,lp6],
details:"Premium carbon steel laptop stand built for ergonomic viewing and workspace comfort.",
specs:[
"Heavy-duty carbon steel build",
"360° rotating base",
"Anti-slip stability pads",
"Adjustable viewing height",
"Durable workspace design",
"Improves posture while working"
],
variants:[
{label:"Standard",price:1579,mrp:2279},
{label:"Pro",price:1779,mrp:2479},
{label:"Multi-Angle",price:1979,mrp:2679}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep dry and wipe gently with cloth."
}
},

{
id:3,
name:"3-in-1 USB-C Docking Station",
price:1659,
mrp:2359,
images:[lp7,lp8,lp9],
details:"Compact docking station that expands laptop connectivity for productivity setups.",
specs:[
"3-in-1 USB-C expansion",
"High-speed data transfer",
"Plug & play compatibility",
"Compact travel design",
"Stable device connection",
"Durable aluminum body"
],
variants:[
{label:"Standard",price:1659,mrp:2359},
{label:"Pro",price:1859,mrp:2559},
{label:"Multi-Port",price:2059,mrp:2759}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid moisture and clean gently."
}
},

{
id:4,
name:"Wired Gaming Keyboard Punk Keyboard Retro",
price:1739,
mrp:2439,
images:[lp10,lp11,lp14],
details:"Retro styled wired gaming keyboard designed for responsive typing and gaming.",
specs:[
"Retro mechanical style keys",
"Responsive gaming switches",
"Durable wired connectivity",
"Comfortable typing layout",
"Stylish vintage design",
"Long-lasting key durability"
],
variants:[
{label:"Standard",price:1739,mrp:2439},
{label:"Pro",price:1939,mrp:2639},
{label:"RGB",price:2139,mrp:2839}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep keyboard dust-free."
}
},

{
id:5,
name:"POP Keys Mechanical Bluetooth Keyboard - Purple Tricolor",
price:1819,
mrp:2519,
images:[lp17,lp18],
details:"Stylish mechanical Bluetooth keyboard designed for creative and comfortable typing.",
specs:[
"Mechanical tactile switches",
"Bluetooth wireless connectivity",
"Colorful keycap design",
"Multi-device support",
"Comfortable typing feedback",
"Modern aesthetic look"
],
variants:[
{label:"Standard",price:1819,mrp:2519},
{label:"Pro",price:2019,mrp:2719},
{label:"Multi-Device",price:2219,mrp:2919}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Clean with soft cloth."
}
},

{
id:6,
name:"POP Keys Mechanical Bluetooth Keyboard - Yellow Tricolor",
price:1819,
mrp:2519,
images:[lp20,lp21],
details:"Colorful mechanical Bluetooth keyboard offering comfortable typing and stylish setup.",
specs:[
"Mechanical switches",
"Bluetooth connectivity",
"Compact premium design",
"Multi-device pairing",
"Responsive typing feedback",
"Stylish desk setup accessory"
],
variants:[
{label:"Standard",price:1819,mrp:2519},
{label:"Pro",price:2019,mrp:2719},
{label:"Multi-Device",price:2219,mrp:2919}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Avoid liquid exposure."
}
},

{
id:7,
name:"POP Keys Mechanical Bluetooth Keyboard - Gray Tricolor",
price:1819,
mrp:2519,
images:[lp21],
details:"Premium mechanical Bluetooth keyboard built for productivity and modern workspace setups.",
specs:[
"Mechanical keyboard switches",
"Wireless Bluetooth pairing",
"Premium keycap build",
"Comfortable typing experience",
"Durable design",
"Stylish workspace accessory"
],
variants:[
{label:"Standard",price:1819,mrp:2519},
{label:"Pro",price:2019,mrp:2719},
{label:"Multi-Device",price:2219,mrp:2919}
],
deliveryReturn:{
shipping:"Free delivery on prepaid orders. Dispatch within 24-48 hours.",
returns:"7-day replacement for manufacturing defects only.",
care:"Keep dry and dust-free."
}
}

];

export function getLaptopAccessoryById(id){
return laptopAccessoryProducts.find((p)=>p.id===Number(id))||null;
}

export function getRelatedLaptopAccessories(currentId){
return laptopAccessoryProducts
.filter((p)=>p.id!==Number(currentId))
.slice(0,4);
}