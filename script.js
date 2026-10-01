const FITUR=["F1 Object Detection","F2 Color Extraction","F3 Posisi Objek","F4 Dominasi Objek","F5 Background","F6 Objek Tambahan","F7 Manusia","F8 Teks"];
const KONS=["K1 Nama Produk","K2 Harga","K3 Diskon/Promo","K4 Periode Promo","K5 Syarat Promo","K6 Info Produk","K7 Klaim","K8 Visual–Caption"];
const POSTS=[{title:"Buy 1 Get 1 Full 7 Hari",user:"pentolgila",brand:"Pentol Gila",cat:"Kuliner",
url:"https://www.instagram.com/p/DZCwYyknch2/",
slides:["img/pentolgila-1.jpg","img/pentolgila-2.jpg"],
colors:["#e11d1d","#fbbf24","#f97316","#ffffff","#7c3f1d"],
f:[["Ada","Produk (paket makanan) menjadi objek utama."],["Merah, kuning, oranye","Dominan merah dan kuning, aksen oranye, putih, cokelat."],["Tengah–bawah","Produk berada di tengah hingga bawah poster."],["Tinggi","Produk jadi fokus utama, ukuran cukup besar."],["Merah-kuning, api","Gradasi merah dan kuning dengan elemen api."],["Ada","Api, badge, logo, ikon sosial media."],["Tidak ada","Tidak ada sosok manusia."],["Ada","Teks promosi, nama menu, periode promo."]],
k:[["Ada","Paket Gila Aja, Ramah 1, Ramah 2, Bumbu Kacang."],["Tidak ada","Tidak ada informasi harga."],["Ada","Promo “Buy 1 Get 1 Full 7 Hari”."],["Ada","Tgl 07 Sept – 13 Sept, 18.00 – 19.00."],["Terbatas","Hanya “*SK Berlaku” tanpa detail."],["Ada","“Original Recipe”, “Hujan Keju”, “Bumbu Medok”."],["Ada","Klaim “Original Recipe” dan “Buy 1 Get 1”."],["Cukup sesuai","Visual produk sesuai informasi menu."]],
kes:"Poster memiliki informasi promosi yang cukup jelas, terutama nama produk, jenis promo, periode promo, dan visual produk. Namun, informasi harga tidak terlihat dan syarat promo hanya dicantumkan secara singkat. Secara visual, produk menjadi objek utama dengan dominasi tinggi, memakai warna merah, kuning, dan oranye untuk menarik perhatian konsumen."}];
const $=i=>document.getElementById(i);
const bc=v=>/^(ada|tinggi|cukup sesuai)$/i.test(v)?"ok":/^tidak/i.test(v)?"no":"";
const bg=v=>`<span class="b ${bc(v)}">${v}</span>`;
let cat="Semua",q="",cur=0,sl=0,tab=0;
function gal(){
 const cats=["Semua",...new Set(POSTS.map(p=>p.cat))];
 $("bar").innerHTML=cats.map(c=>`<button class="chip ${c===cat?"on":""}" data-c="${c}">${c}</button>`).join("")+`<input id="q" placeholder="Cari..." value="${q}">`;
 const L=POSTS.map((p,i)=>({p,i})).filter(({p})=>(cat==="Semua"||p.cat===cat)&&(p.title+p.brand).toLowerCase().includes(q.toLowerCase()));
 $("gal").innerHTML=L.map(({p,i})=>`<div class="t" data-i="${i}"><img src="${p.slides[0]}" alt="${p.title}">${p.slides.length>1?'<span class="ic">❐</span>':''}<div class="ov"><span>${p.brand}</span><span>${p.title}</span></div></div>`).join("")+`<div class="soon">＋ Posting berikutnya</div>`;
 const qi=$("q");qi.oninput=e=>{q=e.target.value;const s=qi.selectionStart;gal();$("q").focus();$("q").setSelectionRange(s,s)}}
function panel(p){
 const R=(a,n,k)=>a.map((r,j)=>`<div class="rw"><b>${n[j]}</b><span class="v">${k||/^(ada|tinggi|tidak ada)$/i.test(r[0])?bg(r[0]):r[0]}</span><span class="k">${r[1]}</span></div>`).join("");
 return tab===0?R(p.f,FITUR,0):tab===1?R(p.k,KONS,1):`<p>${p.kes}</p><div class="cols">${p.colors.map(c=>`<i style="background:${c}"></i>`).join("")}</div>`}
function go(n){const p=POSTS[cur];sl=Math.max(0,Math.min(p.slides.length-1,n));
 $("tr").style.transform=`translateX(-${sl*100}%)`;$("cn")&&($("cn").textContent=`${sl+1}/${p.slides.length}`);
 document.querySelectorAll(".dots i").forEach((d,i)=>d.classList.toggle("on",i===sl))}
function open_(i){cur=i;sl=0;tab=0;const p=POSTS[i],m=p.slides.length>1;
 $("bx").innerHTML=`<div class="cr" id="cr"><div class="tr" id="tr">${p.slides.map(s=>`<div><img src="${s}" alt=""></div>`).join("")}</div>
 ${m?`<button class="ar l" data-a="-1">‹</button><button class="ar r" data-a="1">›</button><span class="cn" id="cn">1/${p.slides.length}</span><div class="dots">${p.slides.map((_,j)=>`<i class="${j?"":"on"}"></i>`).join("")}</div>`:""}</div>
 <div class="sd"><div class="hd"><div class="av"><img src="${p.slides[0]}" alt=""></div><div><b>${p.user}</b><br><small>${p.brand} · ${p.cat}</small></div><a class="btn p" href="${p.url}" target="_blank" rel="noopener">Buka di Instagram ↗</a></div>
 <div class="tabs">${["Analisis","Indikator","Kesimpulan"].map((t,j)=>`<button data-tab="${j}" class="${j?"":"on"}">${t}</button>`).join("")}</div>
 <div class="pn" id="pn">${panel(p)}</div>
 <div class="ft"><button class="btn" data-n="-1">← Post</button><small style="color:var(--mut)">${cur+1} / ${POSTS.length}</small><button class="btn" data-n="1">Post →</button></div></div>`;
 let x0=null;const c=$("cr");c.ontouchstart=e=>x0=e.touches[0].clientX;c.ontouchend=e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)go(sl+(d<0?1:-1));x0=null};
 $("md").classList.add("on");document.body.style.overflow="hidden"}
function close_(){$("md").classList.remove("on");document.body.style.overflow=""}
document.addEventListener("click",e=>{const t=e.target;
 if(t.dataset.c){cat=t.dataset.c;gal();return}
 const c=t.closest(".t");if(c)return open_(+c.dataset.i);
 if(t.id==="cl"||t.id==="md")close_();
 if(t.dataset.a)go(sl+ +t.dataset.a);
 if(t.dataset.n)open_((cur+ +t.dataset.n+POSTS.length)%POSTS.length);
 if(t.dataset.tab){tab=+t.dataset.tab;document.querySelectorAll(".tabs button").forEach((b,i)=>b.classList.toggle("on",i===tab));$("pn").innerHTML=panel(POSTS[cur])}});
document.addEventListener("keydown",e=>{if(!$("md").classList.contains("on"))return;if(e.key==="Escape")close_();if(e.key==="ArrowRight")go(sl+1);if(e.key==="ArrowLeft")go(sl-1)});
$("th").onclick=()=>{const r=document.documentElement,d=r.dataset.theme==="dark"||(!r.dataset.theme&&matchMedia("(prefers-color-scheme:dark)").matches);r.dataset.theme=d?"light":"dark"};
gal();