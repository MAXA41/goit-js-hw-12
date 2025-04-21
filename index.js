import{S as M,a as O,i as s}from"./assets/vendor-BjRz3xa9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const m=document.querySelector(".gallery"),g=document.querySelector(".loader"),y=document.querySelector(".load-btn"),R=new M(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const o=r.map(({webformatURL:i,largeImageURL:a,tags:e,likes:t,views:n,comments:q,downloads:$})=>`<li class="gallery-item">
  <a class="gallery-link" href="${a}">
    <img
      class="gallery-image"
      src="${i}"
      alt="${e}"
    />
    <ul class="gallery-info">
      <li class="info-item">
        <h3 class="title">Likes</h3>
        <p class="info">${t}</p>
      </li>
      <li class="info-item">
        <h3 class="title">Views</h3>
        <p class="info">${n}</p>
      </li>
      <li class="info-item">
        <h3 class="title">Comments</h3>
        <p class="info">${q}</p>
      </li>
      <li class="info-item">
        <h3 class="title">Downloads</h3>
        <p class="info">${$}</p>
      </li>
    </ul>
  </a>
</li>
`).join("");m.insertAdjacentHTML("beforeend",o),R.refresh()}function p(){m.innerHTML=""}function L(){g.classList.add("visible")}function v(){g.classList.remove("visible")}function E(){y.classList.add("btn-visible")}function c(){y.classList.remove("btn-visible")}const P="49830885-3c4fb55cab3b8487f16091a9c",S=async(r,o)=>{const i=await O.get("https://pixabay.com/api/",{params:{key:P,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}}),a=i.data.totalHits;return{pictures:i.data.hits,total:a}},B=document.querySelector(".inp"),d=document.querySelector(".form"),x=document.querySelector(".load-btn");let f="",l=1,u,h,w;d.addEventListener("submit",async r=>{if(r.preventDefault(),f=B.value.trim(),l=1,f===""){s.warning({title:"Warning",message:"Search field cannot be empty.",position:"topRight"}),p(),c(),d.reset();return}p(),c(),L();try{const{pictures:o,total:i}=await S(f,l);if(o.length===0){s.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(o),u=Math.ceil(i/15),l<u?E():s.info({title:"Oops",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),h=document.querySelector(".gallery-item"),w=h.getBoundingClientRect()}catch(o){s.error({title:"Error",message:`${o}`,position:"topRight"})}finally{v(),d.reset()}});x.addEventListener("click",async()=>{if(l>=u){s.info({title:"Oops",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c();return}l+=1,L();try{const{pictures:r}=await S();b(r),window.scrollBy({top:w.height*2,behavior:"smooth"}),l>=u&&(s.info({title:"Info",message:"You've reached the end of search results.",position:"topRight"}),c())}catch(r){s.error({title:"Error",message:`${r}`,position:"topRight"}),console.log(r)}finally{v()}});
//# sourceMappingURL=index.js.map
