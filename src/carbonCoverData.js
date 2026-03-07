// src/carbonCoverData.js

import cb1 from "./assets/cb1.png";
import cb2 from "./assets/cb2.png";
import cb3 from "./assets/cb3.png";
import cb4 from "./assets/cb4.png";
import cb5 from "./assets/cb5.png";
import cb6 from "./assets/cb6.png";
import cb7 from "./assets/cb7.png";
import cb8 from "./assets/cb8.png";
import cb9 from "./assets/cb9.png";
import cb10 from "./assets/cb10.png";
import cb11 from "./assets/cb11.png";
import cb12 from "./assets/cb12.png";
import cb13 from "./assets/cb13.png";
import cb14 from "./assets/cb14.png";
import cb15 from "./assets/cb15.png";
import cb16 from "./assets/cb16.png";
import cb17 from "./assets/cb17.png";
import cb18 from "./assets/cb18.png";
import cb19 from "./assets/cb19.png";
import cb20 from "./assets/cb20.png";
import cb21 from "./assets/cb21.png";
import cb22 from "./assets/cb22.png";
import cb23 from "./assets/cb23.png";
import cb24 from "./assets/cb24.png";
import cb25 from "./assets/cb25.png";
import cb26 from "./assets/cb26.png";
import cb27 from "./assets/cb27.png";

export const carbonCoverProducts = [
{
id:1,
name:"Real Aramid Carbon Fiber - Red",
price:1299,
mrp:1799,
images:[cb1,cb2,cb3],
details:"Premium aramid carbon fiber case with sleek texture and strong everyday protection.",
specs:[
"Real aramid carbon fiber build",
"Lightweight slim body",
"Shock resistant frame",
"Raised camera protection",
"Anti-slip grip",
"Premium textured finish"
],
variants:[
{label:"iPhone 15 Pro Max",price:1299,mrp:1799},
{label:"iPhone 15 Pro",price:1299,mrp:1799},
{label:"iPhone 15",price:1299,mrp:1799}
]
},

{
id:2,
name:"Real Aramid Carbon Fiber - Red & Black",
price:1329,
mrp:1829,
images:[cb4,cb5,cb6],
details:"Dual tone red and black carbon fiber design with durable protection.",
specs:[
"Premium carbon weave",
"Shock resistant edges",
"Slim lightweight body",
"Raised display protection",
"Comfortable grip",
"Scratch resistant finish"
],
variants:[
{label:"iPhone 15 Pro Max",price:1329,mrp:1829},
{label:"iPhone 15 Pro",price:1329,mrp:1829},
{label:"iPhone 15",price:1329,mrp:1829}
]
},

{
id:3,
name:"Real Aramid Carbon Fiber - Black & Grey",
price:1359,
mrp:1859,
images:[cb7,cb8,cb9],
details:"Premium black and grey carbon fiber case offering modern styling and strong durability.",
specs:[
"Aramid fiber texture",
"Shock absorbing structure",
"Slim protective design",
"Raised camera lip",
"Anti-slip grip",
"Premium finish"
],
variants:[
{label:"iPhone 15 Pro Max",price:1359,mrp:1859},
{label:"iPhone 15 Pro",price:1359,mrp:1859},
{label:"iPhone 15",price:1359,mrp:1859}
]
},

{
id:4,
name:"Real Aramid Carbon Fiber - Blue",
price:1389,
mrp:1889,
images:[cb10,cb11,cb12],
details:"Stylish blue carbon fiber cover with slim body and premium protective frame.",
specs:[
"Carbon fiber textured body",
"Shock resistant frame",
"Raised display protection",
"Slim ergonomic build",
"Comfortable grip",
"Scratch resistant surface"
],
variants:[
{label:"iPhone 15 Pro Max",price:1389,mrp:1889},
{label:"iPhone 15 Pro",price:1389,mrp:1889},
{label:"iPhone 15",price:1389,mrp:1889}
]
},

{
id:5,
name:"Real Aramid Carbon Fiber - Green",
price:1419,
mrp:1919,
images:[cb13,cb14,cb15],
details:"Green carbon fiber case with modern look and reliable everyday protection.",
specs:[
"Premium aramid fiber build",
"Shock absorbing corners",
"Slim protective shell",
"Raised camera protection",
"Comfortable grip texture",
"Durable finish"
],
variants:[
{label:"iPhone 15 Pro Max",price:1419,mrp:1919},
{label:"iPhone 15 Pro",price:1419,mrp:1919},
{label:"iPhone 15",price:1419,mrp:1919}
]
},

{
id:6,
name:"Real Aramid Carbon Fiber - Blue & Black",
price:1449,
mrp:1949,
images:[cb16,cb17,cb18],
details:"Blue and black carbon fiber combination case with sporty styling and strong protection.",
specs:[
"Premium dual color carbon fiber",
"Impact resistant edges",
"Raised screen lip",
"Slim lightweight body",
"Comfortable grip",
"Scratch resistant finish"
],
variants:[
{label:"iPhone 15 Pro Max",price:1449,mrp:1949},
{label:"iPhone 15 Pro",price:1449,mrp:1949},
{label:"iPhone 15",price:1449,mrp:1949}
]
},

{
id:7,
name:"iPhone Carbon Cover - Green & Black",
price:1479,
mrp:1979,
images:[cb19,cb20,cb21],
details:"Green and black carbon cover with bold styling and durable protective design.",
specs:[
"Carbon weave finish",
"Strong protective frame",
"Raised camera protection",
"Slim modern body",
"Grip enhanced texture",
"Scratch resistant build"
],
variants:[
{label:"iPhone 15 Pro Max",price:1479,mrp:1979},
{label:"iPhone 15 Pro",price:1479,mrp:1979},
{label:"iPhone 15",price:1479,mrp:1979}
]
},

{
id:8,
name:"iPhone Carbon Cover - Yellow & Blue",
price:1509,
mrp:2009,
images:[cb22,cb23,cb24],
details:"Yellow and blue sporty carbon case designed for bold looks and everyday safety.",
specs:[
"Performance carbon finish",
"Shock absorbing body",
"Raised display protection",
"Slim lightweight build",
"Anti-slip grip",
"Premium durable coating"
],
variants:[
{label:"iPhone 15 Pro Max",price:1509,mrp:2009},
{label:"iPhone 15 Pro",price:1509,mrp:2009},
{label:"iPhone 15",price:1509,mrp:2009}
]
},

{
id:9,
name:"iPhone Carbon Cover - Sky Blue",
price:1539,
mrp:2039,
images:[cb25,cb26,cb27],
details:"Sky blue carbon fiber case with sleek design and reliable everyday protection.",
specs:[
"Carbon fiber texture",
"Impact resistant frame",
"Raised screen safety",
"Slim protective shell",
"Comfortable grip",
"Premium finish"
],
variants:[
{label:"iPhone 15 Pro Max",price:1539,mrp:2039},
{label:"iPhone 15 Pro",price:1539,mrp:2039},
{label:"iPhone 15",price:1539,mrp:2039}
]
}
];

export function getCarbonCoverById(id){
return carbonCoverProducts.find(p=>p.id===Number(id))||null;
}

export function getRelatedCarbonCovers(currentId){
return carbonCoverProducts
.filter(p=>p.id!==Number(currentId))
.slice(0,4);
}