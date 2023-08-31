class CustomToolTip{
    //Author Janith v1.5

    #defaultOptions = {
        targetClass:'ctp-tooltip',
        collision:'window',
        colors:{
            background:'#707070',
            text:'white',
            border:'#e1e1e1'
        },
        typoGraphy:{
            size:14,
            weight:200
        },
        transition:{
            duration:0.4,
            delay:0,
            easing:'ease-in-out'
        }
    };
    #options = {};
    #defaultDimensions = {
        tp:{
            left:55,
            Width:window.innerWidth <= 320 ? 170 : 240,
            bottom:20,
            padding:2
        }
    };

    #showCallback = ()=>{};
    #hideCallback = ()=>{};

    constructor (options = {
        targetClass,
        collision,
        colors:{background,text,border},
        typoGraphy:{size,weight},
        transition:{duration,delay,easing}
    }){
        if(options === undefined){
            console.error('CustomTooltip | Options are not Declared');
            return
        };
        this.#prePareOptions(options);
        this.#initializeStyles();
        this.#bindTP();
        this.#run();
    };

    #prePareOptions(options){
        this.#options = {
            targetClass: options.targetClass !== undefined ? options.targetClass : this.#defaultOptions.targetClass,

            collision: options.collision !== undefined ? options.collision : this.#defaultOptions.collision,

            colors: options.colors  !== undefined ? {
                background: options.colors.background  !== undefined ? options.colors.background : this.#defaultOptions.colors.background,
                text: options.colors.text  !== undefined ? options.colors.text : this.#defaultOptions.colors.text,
                border: options.colors.border  !== undefined ? options.colors.border : this.#defaultOptions.colors.border
            } : this.#defaultOptions.colors ,

            typoGraphy: options.typoGraphy  !== undefined ? {
                size: options.typoGraphy.size  !== undefined ? options.typoGraphy.size : this.#defaultOptions.typoGraphy.size,
                weight: options.typoGraphy.weight  !== undefined ? options.typoGraphy.weight : this.#defaultOptions.typoGraphy.weight
            } : this.#defaultOptions.typoGraphy,

            transition: options.transition  !== undefined ? {
                duration: options.transition.duration  !== undefined ? options.transition.duration : this.#defaultOptions.transition.duration,
                delay: options.transition.delay  !== undefined ? options.transition.delay : this.#defaultOptions.transition.delay,
                easing: options.transition.easing  !== undefined ? options.transition.easing : this.#defaultOptions.transition.easing
            } : this.#defaultOptions.transition,
        };
    };

    #initializeStyles(){
        let styleContent = '';
        let isInitialized = false;

        const styles = document.createElement('style');
        const tooltip = `
            position: absolute;
            opacity:0;
            bottom: ${this.#defaultDimensions.tp.bottom}px;
            left: -${this.#defaultDimensions.tp.left}px;
            z-index: -1;
            background:${this.#options.colors.background};
            color:${this.#options.colors.text};
            height: auto;
            max-width: 305px;
            width: ${this.#defaultDimensions.tp.Width}px;
            border: 0.5px solid ${this.#options.colors.border};
            border-radius: 5px;
            box-shadow: #e5e7eb 0 4px 6px 0;
            transform:translateY(0px);
            transition: all ${this.#options.transition.duration}s cubic-bezier(0.68, -0.55, 0.265, 1.55) ;
            transition-delay: ${this.#options.transition.delay}s;
            pointer-events:none;
        `;
        const tooltipBody = `
            position: relative;
            padding: 10px;
            overflow-wrap: break-word;
            text-align:left;
            font-size: ${this.#options.typoGraphy.size}px;
            font-weight: ${this.#options.typoGraphy.weight};
        `;
        const tooltipBody_after = `
            content: '';
            position: absolute;
            width: 10px;
            height: 10px;
            bottom: -6px;
            left: 62px;
            transform: ;
            background: ${this.#options.colors.background};
            border-bottom: 0.5px solid ${this.#options.colors.border};
            border-right: 0.5px solid ${this.#options.colors.border};
        `;
        const activeTp = `
            opacity:1;
            z-index:500;
            transform:translateY(-10px);
        `;
        const queryXSM = `
            @media (max-width:320px){
                .ct-body{
                    font-size:${this.#options.typoGraphy.size - 3}px
                }
            }
        `;
        const querySM = `
            @media (max-width:425px){
                .ct-body{
                    font-size:${this.#options.typoGraphy.size - 2}px
                }
            }
        `;

        styleContent += `.ct-tooltip{${tooltip}}`;
        styleContent += `.ct-body{${tooltipBody}}`;
        styleContent += `.ct-active{${activeTp}}`;
        styleContent += `.ct-tooltip::after{${tooltipBody_after}}`;
        styleContent += queryXSM;
        styleContent += querySM;
        styles.innerHTML = styleContent;
        styles.title = 'tpStyleSheet';

        const Sheets = document.styleSheets;
        
        try{
            Sheets.forEach((sheet)=>{
                if(sheet.title == 'tpStyleSheet'){
                    isInitialized = true;
                };
            });
        }catch(e){

        };

        if(!isInitialized){
            document.head.appendChild(styles);
        };
    };

    #initializeTP(elm,key){
        if(!elm.getAttribute('tp-content')){elm.setAttribute('tp-content',"Add your text content through \"tp-content\" attribute")};

        document.querySelector(`#tp${key}`)?.remove();

        const tp = document.createElement('div');
        tp.id = `tp${key}`;
        tp.classList.add('ct-tooltip');

        const tpb = document.createElement('div');
        tpb.innerHTML = elm.getAttribute('tp-content');
        tpb.classList.add('ct-body');
        tp.appendChild(tpb);
        elm.appendChild(tp);

        //Tooltip Body
        let ToolTip = elm.querySelector('div .ct-tooltip');
        const textLen = elm.getAttribute('tp-content').length;
        const Width = this.#defaultDimensions.tp.Width + (textLen / 2);
        ToolTip.style.width = `${Width}px`;

        const targetElmDim = elm.getBoundingClientRect();
        const collisionDim = this.#options.collision == 'window'? document.body.getBoundingClientRect() : document.querySelector(this.#options.collision).getBoundingClientRect();
        const tooltipDim = ToolTip.getBoundingClientRect();

        const rightClip = collisionDim.right - tooltipDim.right;
        const leftClip =  collisionDim.left - tooltipDim.left;
        const bottomClip = targetElmDim.top - tooltipDim.bottom;
        const TopClip = collisionDim.top - tooltipDim.top;

        if(leftClip > 0){
            ToolTip.style.left = `-${(this.#defaultDimensions.tp.left - leftClip) - this.#defaultDimensions.tp.padding }px`;
        }else{
            ToolTip.style.left = `-${(tooltipDim.width/2) - this.#defaultDimensions.tp.padding }px`;
        }

        if(rightClip < 0){
            ToolTip.style.left = `-${(this.#defaultDimensions.tp.left - rightClip) + this.#defaultDimensions.tp.padding}px`;
        }

        if(TopClip > 0){
            ToolTip.style.bottom = `-${(TopClip + (tooltipDim.height/2)) + 10}px`;
            ToolTip.setAttribute('isTopClipped',true);
        }else{
            ToolTip.style.bottom = `${this.#defaultDimensions.tp.bottom + (bottomClip < 0 ? Math.abs(bottomClip) : 0)}px`;
        }


    };

    #showTP(targetElm){
        this.#updateArrow(targetElm);
        targetElm.querySelector('div .ct-tooltip').classList.add('ct-active');
    };

    #hideTP(targetElm){
        targetElm.querySelector('div .ct-tooltip').classList.remove('ct-active');
    };

    #toggleTP(targetElm){
        this.#updateArrow(targetElm);
        targetElm.querySelector('div .ct-tooltip').classList.toggle('ct-active');
    };

    #run(){
        let TargetElements
        TargetElements = document.querySelectorAll(`.${this.#options.targetClass}`);
        Array.prototype.forEach.call(TargetElements,(elm)=>{

            if(window.innerWidth <= 768){

                elm.onclick = ()=>{
                    this.#toggleTP(elm);
                };

                elm.onmouseleave = ()=>{
                    this.#hideTP(elm);
                    this.#hideCallback(elm.querySelector('div .ct-tooltip'));
                };

            }else{
                elm.onmouseover = ()=>{
                    this.#showTP(elm);
                    this.#showCallback(elm.querySelector('div .ct-tooltip'));
                };
                elm.onmouseleave = ()=>{
                    this.#hideTP(elm);
                    this.#hideCallback(elm.querySelector('div .ct-tooltip'));
                };
            }
        })
    };

    #bindTP(){
        const TargetElements = document.querySelectorAll(`.${this.#options.targetClass}`);
        TargetElements.forEach((elm,i)=>{
            elm.style.position = 'relative';
            elm.style.lineHeight = 1.25;
            this.#initializeTP(elm,i+1);
        });
    };

    #updateArrow(targetElm){
        const ToolTip = targetElm.querySelector('div .ct-tooltip');
        const targetDim = targetElm.getBoundingClientRect();
        const ToolTipDIm = ToolTip.getBoundingClientRect();
        const arrowPos = (targetDim.x + (targetDim.width/2) - 5 ) - ToolTipDIm.x;

        for (let i = 0; i < document.styleSheets.length; i++) {
            const sheet = document.styleSheets[i];
            if(sheet.title == 'tpStyleSheet'){
                if(ToolTip.getAttribute('isTopClipped')){
                    sheet.cssRules[3].style.transform = 'rotateZ(222deg)';
                    sheet.cssRules[3].style.bottom = 'unset';
                    sheet.cssRules[3].style.top = '-6px';
                }else{
                    sheet.cssRules[3].style.transform = 'rotateZ(45deg)';
                    sheet.cssRules[3].style.bottom = '-6px';
                    sheet.cssRules[3].style.top = 'unset';
                }
                sheet.cssRules[3].style.left = `${arrowPos}px`;
            }
        }
    }

    refresh(){
        window.onchange = ()=>{
            this.#bindTP();
            this.#run();
        };
    };

    onHover(callback){this.#showCallback = callback};
    onBlur(callback){this.#hideCallback = callback};
}