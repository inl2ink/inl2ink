// jquery 动画加载首页
$(window).on("load",function(){
    $('.wrap').fadeOut("slow")
})


// 导航栏切换效果
var lis = document.querySelectorAll('li')
var nav = document.querySelector('.nav')
var items = document.querySelector('.container').querySelectorAll('.item')
var footer = document.getElementById('footer')
var container = document.querySelector('.container')

// 定义数组方便后续操作
var colorClass = ['#54caf2','#aa54f2','#f293d2']
var btnsColorClass = ['#00bfff','#8b00ff','#ff66cc']
var navColorClass = ['#cceffb','#e6ccfb','#fbdff2']
var fileNameClass = ['live','study','up']


for ( var i = 0; i < lis.length; i++) {
    lis[i].index = i;
    lis[i].onclick = function() {
        // 先把所有的按钮背景颜色去掉 
        for (var i = 0; i < lis.length; i++){
            lis[i].style.backgroundColor = ''
            lis[i].style.color = ''
            items[i].style.display = 'none'
        }
        //给当前元素及相关div盒子匹配颜色
           this.style.backgroundColor = btnsColorClass[this.index]
           this.style.color = '#fff'
           nav.style.backgroundColor = navColorClass[this.index]
           items[this.index].style.display = "block"
           footer.style.backgroundColor = colorClass[this.index]
           container.style.backgroundColor = colorClass[this.index]

        // 切换当前的图片的二级路径，为查看大图的箭头切换做准备
            secondSrc = fileNameClass[this.index]
    }
}
// 自动触发一次选中第一个
lis[0].click()



// 点击查看大图
var liveItems = document.querySelector('.live').querySelectorAll('.grid-item')
var studyItems = document.querySelector('.study').querySelectorAll('.grid-item')
var upItems = document.querySelector('.up').querySelectorAll('.grid-item')
var original = document.querySelector('.original')
var showImg = original.querySelector('img')
var left = original.querySelector('.left')
var right = original.querySelector('.right')
var close = original.querySelector('.close')

// 存储图片总数
const liveLength = liveItems.length
const studyLength = studyItems.length
const upLength = upItems.length

// 渲染大图
ImgSrcChange(liveItems,fileNameClass[0])
ImgSrcChange(studyItems,fileNameClass[1])
ImgSrcChange(upItems,fileNameClass[2])

// 左箭头的无缝点击
function lengthMin(){
    if(secondSrc == 'live'){
        cur = liveLength-1
    } else if (secondSrc == 'study'){
        cur = studyLength-1
    } else {
        cur = upLength-1
    }
}

//右箭头的无缝点击 
function lengthMax(){
    if(secondSrc == 'live'){
        max = liveLength - 1
    } else if (secondSrc == 'study'){
        max = studyLength-1
    } else {
        max = upLength-1
    }
}


function imgShow(index,fileName){
    cur = index
    if( index + 1 < 10) {
        showImg.src = `./images/${fileName}/0${index + 1}.jpg`
    }
    else {
        showImg.src = `./images/${fileName}/${index + 1}.jpg`
    }
    original.style.display = "block"
}

// 封装点击查看大图的函数
function ImgSrcChange (box,fileName){
    for(i=0; i<box.length; i++){
        box[i].index = i
        box[i].onclick = function(){
            imgShow(this.index,fileName)
        }
    }
}

right.addEventListener('click',function(){
    ++cur
    lengthMax()
    if(cur > max){
        cur = 0
    }
    imgShow(cur,secondSrc)
    console.log(cur);
})

left.addEventListener('click',function(){
    --cur == 0 ? cur - 1 : cur
    if(cur < 0){
        lengthMin()
    }
    imgShow(cur,secondSrc)
})


// 点击关闭大图
close.addEventListener('click',()=>{
    original.style.display = "none"
})


// 回到顶部功能
var backTop = document.querySelector('.backTop')

backTop.addEventListener('click',function(){
    window.scrollTo(0,0)
    backTop.style.display = 'none'
}
)

window.onscroll = function() {
    //为了保证兼容性，这里取两个值，哪个有值取哪一个
    //scrollTop就是触发滚轮事件时滚轮的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop > 500){
        backTop.style.display = 'block'
    } else {
        backTop.style.display = 'none'
    }
}
