import{S as M,a as E,i as l}from"./assets/vendor-BjRz3xa9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const g=document.querySelector(".gallery"),y=document.querySelector(".loader"),b=document.querySelector(".load-btn"),O=new M(".gallery a",{captionsData:"alt",captionDelay:250});function L(r){const o=r.map(({webformatURL:i,largeImageURL:a,tags:e,likes:t,views:n,comments:q,downloads:$})=>`<li class="gallery-item">
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
`).join("");g.insertAdjacentHTML("beforeend",o),O.refresh()}function h(){g.innerHTML=""}function v(){y.classList.add("visible")}function S(){y.classList.remove("visible")}function P(){b.classList.add("btn-visible")}function u(){b.classList.remove("btn-visible")}const R="49830885-3c4fb55cab3b8487f16091a9c",w=async(r,o)=>{const i=await E.get("https://pixabay.com/api/",{params:{key:R,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}}),a=i.data.totalHits;return{pictures:i.data.hits,total:a}},B=document.querySelector(".inp"),d=document.querySelector(".form"),x=document.querySelector(".load-btn");let c="",s=1,f,p,m;d.addEventListener("submit",async r=>{if(r.preventDefault(),c=B.value.trim(),s=1,c===""){l.warning({title:"Warning",message:"Search field cannot be empty.",position:"topRight"}),h(),u(),d.reset();return}h(),u(),v();try{const{pictures:o,total:i}=await w(c,s);if(o.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(o),f=Math.ceil(i/15),s<f&&P(),p=document.querySelector(".gallery-item"),p&&(m=p.getBoundingClientRect())}catch(o){l.error({title:"Error",message:`${o}`,position:"topRight"})}finally{S(),d.reset()}});x.addEventListener("click",async()=>{if(s>=f){l.info({title:"Oops",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),u();return}s+=1,v();try{const{pictures:r}=await w(c,s);L(r),m&&window.scrollBy({top:m.height*2,behavior:"smooth"}),s>=f&&(l.info({title:"Info",message:"You've reached the end of search results.",position:"topRight"}),u())}catch(r){l.error({title:"Error",message:`${r}`,position:"topRight"})}finally{S()}});
//# sourceMappingURL=index.js.map
