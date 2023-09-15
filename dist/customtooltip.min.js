class CustomToolTip{#a={targetClass:"ctp-tooltip",collision:"window",enableCollision:!0,enableTopCollision:!0,colors:{background:"#707070",text:"white",border:"#e1e1e1"},typoGraphy:{size:14,weight:200},transition:{duration:.4,delay:0,easing:"ease-in-out"}};#b={};#c={tp:{left:55,Width:window.innerWidth<=320?170:240,bottom:20,padding:2}};#d=()=>{};#e=()=>{};constructor(t={targetClass,collision,enableCollision,colors:{background,text,border},typoGraphy:{size,weight},transition:{duration,delay,easing}}){if(void 0===t){console.error("CustomTooltip | Options are not Declared");return}this.#f(t),this.#g(),this.#h(),this.#i()}#f(t){this.#b={targetClass:void 0!==t.targetClass?t.targetClass:this.#a.targetClass,collision:void 0!==t.collision?t.collision:this.#a.collision,enableCollision:void 0!==t.enableCollision?t.enableCollision:this.#a.enableCollision,enableTopCollision:void 0!==t.enableTopCollision?t.enableTopCollision:this.#a.enableTopCollision,colors:void 0!==t.colors?{background:void 0!==t.colors.background?t.colors.background:this.#a.colors.background,text:void 0!==t.colors.text?t.colors.text:this.#a.colors.text,border:void 0!==t.colors.border?t.colors.border:this.#a.colors.border}:this.#a.colors,typoGraphy:void 0!==t.typoGraphy?{size:void 0!==t.typoGraphy.size?t.typoGraphy.size:this.#a.typoGraphy.size,weight:void 0!==t.typoGraphy.weight?t.typoGraphy.weight:this.#a.typoGraphy.weight}:this.#a.typoGraphy,transition:void 0!==t.transition?{duration:void 0!==t.transition.duration?t.transition.duration:this.#a.transition.duration,delay:void 0!==t.transition.delay?t.transition.delay:this.#a.transition.delay,easing:void 0!==t.transition.easing?t.transition.easing:this.#a.transition.easing}:this.#a.transition}}#g(){let o="",i=!1,e=document.createElement("style"),s=`
            position: absolute;
            opacity:0;
            bottom: ${this.#c.tp.bottom}px;
            left: -${this.#c.tp.left}px;
            z-index: -1;
            background:${this.#b.colors.background};
            color:${this.#b.colors.text};
            height: auto;
            max-width: 305px;
            width: ${this.#c.tp.Width}px;
            border: 0.5px solid ${this.#b.colors.border};
            border-radius: 5px;
            box-shadow: #e5e7eb 0 4px 6px 0;
            transform:translateY(0px);
            transition: all ${this.#b.transition.duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ;
            transition-delay: ${this.#b.transition.delay}s;
            pointer-events:none;
        `,l=`
            position: relative;
            padding: 10px;
            overflow-wrap: break-word;
            text-align:left;
            font-size: ${this.#b.typoGraphy.size}px;
            font-weight: ${this.#b.typoGraphy.weight};
        `,n=`
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            bottom: -6px;
            left: 62px;
            transform: ;
            background: ${this.#b.colors.background};
            border-bottom: 0.5px solid ${this.#b.colors.border};
            border-right: 0.5px solid ${this.#b.colors.border};
        `,r=`
            opacity:1;
            z-index:500;
            transform:translateY(-10px);
        `,a=`
            @media (max-width:320px){
                .ct-body{
                    font-size:${this.#b.typoGraphy.size-3}px
                }
            }
        `,p=`
            @media (max-width:425px){
                .ct-body{
                    font-size:${this.#b.typoGraphy.size-2}px
                }
            }
        `;o+=`.ct-tooltip{${s}}`,o+=`.ct-body{${l}}`,o+=`.ct-active{${r}}`,o+=`.ct-tooltip::after{${n}}`,o+=a,o+=p,e.innerHTML=o,e.title="tpStyleSheet";let d=document.styleSheets;try{d.forEach(t=>{"tpStyleSheet"==t.title&&(i=!0)})}catch(h){}i||document.head.appendChild(e)}#j(c,u){c.getAttribute("tp-content")||c.setAttribute("tp-content",'Add your text content through "tp-content" attribute'),document.querySelector(`#tp${u}`)?.remove();let y=document.createElement("div");y.id=`tp${u}`,y.classList.add("ct-tooltip");let b=document.createElement("div");b.innerHTML=c.getAttribute("tp-content"),b.classList.add("ct-body"),y.appendChild(b),c.appendChild(y);let g=c.querySelector("div .ct-tooltip"),$=c.getAttribute("tp-content").length,f=this.#c.tp.Width+$/2;g.style.width=`${f}px`;let x=c.getBoundingClientRect(),m="window"==this.#b.collision?document.body.getBoundingClientRect():document.querySelector(this.#b.collision).getBoundingClientRect(),v=g.getBoundingClientRect(),C=m.right-v.right,w=m.left-v.left,S=x.top-v.bottom,T=m.top-v.top;w<0&&this.#b.enableCollision?g.style.left=`-${this.#c.tp.left-w-this.#c.tp.padding}px`:g.style.left=`-${v.width/2-this.#c.tp.padding}px`,C<0&&(g.style.left=`-${this.#c.tp.left-C+this.#c.tp.padding}px`),T>0&&this.#b.enableTopCollision?(g.style.bottom=`-${T+v.height/2+10}px`,g.setAttribute("isTopClipped",!0)):g.style.bottom=`${this.#c.tp.bottom+(S<0?Math.abs(S):0)}px`}#k(O){this.#l(O),O.querySelector("div .ct-tooltip").classList.add("ct-active")}#m(k){k.querySelector("div .ct-tooltip").classList.remove("ct-active")}#n(z){this.#l(z),z.querySelector("div .ct-tooltip").classList.toggle("ct-active")}#i(){let _;_=document.querySelectorAll(`.${this.#b.targetClass}`),Array.prototype.forEach.call(_,t=>{window.innerWidth<=768?(t.onclick=()=>{this.#n(t)},t.onmouseleave=()=>{this.#m(t),this.#e(t.querySelector("div .ct-tooltip"))}):(t.onmouseover=()=>{this.#k(t),this.#d(t.querySelector("div .ct-tooltip"))},t.onmouseleave=()=>{this.#m(t),this.#e(t.querySelector("div .ct-tooltip"))})})}#h(){let G=document.querySelectorAll(`.${this.#b.targetClass}`);G.forEach((t,o)=>{t.style.position="relative",t.style.lineHeight=1.25,this.#j(t,o+1)})}#l(R){let q=R.querySelector("div .ct-tooltip"),A=R.getBoundingClientRect(),D=q.getBoundingClientRect(),P=A.x+A.width/2-5-D.x;for(let B=0;B<document.styleSheets.length;B++){let L=document.styleSheets[B];"tpStyleSheet"==L.title&&(q.getAttribute("isTopClipped")?(L.cssRules[3].style.transform="rotateZ(222deg)",L.cssRules[3].style.bottom="unset",L.cssRules[3].style.top="-6px"):(L.cssRules[3].style.transform="rotateZ(45deg)",L.cssRules[3].style.bottom="-6px",L.cssRules[3].style.top="unset"),L.cssRules[3].style.left=`${P}px`)}}refresh(){window.onchange=()=>{this.#h(),this.#i()}}onHover(t){this.#d=t}onBlur(t){this.#e=t}}