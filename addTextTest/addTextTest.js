document.addEventListener('click',getCoodinate);


function getCoodinate(e){
    //座標の要素を取得
    const coodinateX = document.elementFromPoint(e.pageX,e.pageY);
    const substantialX = e.pageX - coodinateX.getBoundingClientRect().x;

    //spanにテキストをコピー
    const span1 = document.getElementById('span1');
    span1.style.opacity = '0';
    span1.textContent = coodinateX.textContent;

    //要素のフォントサイズを取得
    const cSize = window.getComputedStyle(coodinateX).getPropertyValue('font-size').replace('px','');

    //spanタグのフォントサイズを取得
    const SpanSize = window.getComputedStyle(span1).getPropertyValue('font-size').replace('px','');

    //縮尺の計算
    const scale = (Math.floor(SpanSize/cSize*10))/10;

    //spanタグ内での座標Xを計算
    const coodinateXX = Math.floor(substantialX * scale);

    //spanの幅
    const spanWidth = span1.getBoundingClientRect().width;
    //spanの文字数を取得
    const spanStrlen = span1.textContent.length;

    //spanの１文字幅の取得
    const strWidth = Math.floor(spanWidth / spanStrlen);

    //座標内に入る文字数を算出
    const countStr = Math.floor(coodinateXX / strWidth);

    //inputタグの挿入
    const input = document.createElement('input');
    input.style.width = '6px';
    coodinateX.textContent = span1.textContent.slice(0,countStr);
    coodinateX.insertAdjacentElement('beforeend',input);
    coodinateX.insertAdjacentText('beforeend',span1.textContent.slice(countStr,spanStrlen));
    input.focus();

    //inputタグの伸縮
    const span2 = document.getElementById('span2');
    span2.style.opacity = '0';
    input.addEventListener('input',()=>{
        span2.textContent = input.value;
        const inputWidth = span2.getBoundingClientRect().width;
        input.style.width = inputWidth + 'px';
    });


    //プリントアウト
    input.addEventListener('keydown',(e)=>{
        if(e.key === 'Enter'){
            input.replaceWith(input.value);
        }
    });

    //前のinputタグを消す
    document.addEventListener('click',()=>{
        const inputCount = document.querySelector('input');
        if(inputCount){
            input.remove();
        }
    });
}
