!function(){var e=document.querySelector(".calculator"),t=[],n="",c="",l=!1;function r(e,t,n){var c=0;return e.forEach((function(l,r){if(l=parseFloat(l),0===r)c=l;else if(r-2>=0&&t&&r-2==e.length-3)if(n){var a=c,o=e[r-1],s=l;c=function(e,t,n){var c=0;console.log(e,t,n),"+"===t?c=e+n/100*e:"-"===t?c=e-n/100*e:"*"===t&&(c=e*(n/100),console.log(c));return console.log(c),c}(a,o,s),console.log(a,o,s)}else{var u=c,i=e[r-1];c=function(e,t,n){var c;["+","-"].includes(t)?c=e*(n/100):["*","/"].includes(t)&&(c=n/100);return console.log(c),c}(u,i,l)}else if(r-2>=0){var d=e[r-1];l>=0&&("+"===d?c+=l:"-"===d?c-=l:"*"===d?c*=l:"/"===d?c/=l:"%"===d&&(c=c/100*l))}})),String(c)}e.addEventListener("click",(function(a){var o,s,u,i,d=a.target;d.classList.contains("calculator__col")&&(!function(e){e>=0?(c="number",n="0"===n?e:n+e):"float"===e?(c="number",/\./.test(n)||(n?n+=".":n="0.")):"delete"===e&&"number"===c?(n=(n=n.substring(0,n.length-1))||"0",l=!1):["+","-","*","/"].includes(e)&&n?(c=e,t.push(n,c),n="",l=!1):"clear"===e?(t=[],n="0",l=!1):"%"===e?(t.push(n),n=r(t,l=!0,!1)):"="===e&&(l||t.push(n),n=r(t,l,!0),t=[],l=!1)}(d.dataset.type),i=n,e.querySelector(".calculator__total").innerHTML=i,o=t,s=e.querySelector(".calculator__history"),u="",o.forEach((function(e){e>=0?u+="&nbsp;<span>".concat(e,"</span>"):["+","-","*","/","%"].includes(e)&&(u+="&nbsp;<strong>".concat(e="*"===e?"×":"/"===e?"÷":e,"</strong>"))})),s.innerHTML=u)}));var a=document.querySelector(".theme-day"),o=document.querySelector(".theme-night"),s=document.querySelector(".theme");s.addEventListener("click",(function(){s.classList.contains("theme_dark")?(s.classList.remove("theme_dark"),o.style.fill="#fafafa",e.classList.add("calculator_dark")):(s.classList.add("theme_dark"),e.classList.remove("calculator_dark"),o.style.fill="transparent",a.style.fill="#00223A")}))}();
//# sourceMappingURL=index.2d91b0c3.js.map
