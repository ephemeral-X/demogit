var wrapUl = $('.wrapUl');
var wrapW = parseInt(wrapUl.css('width'));
var wrapH = parseInt(wrapUl.css('height'));
var liW = wrapW / 5;
var liH = wrapH / 5;

creatDom();
// 实现多图随机展示
// 两个for循环插入 25 个li结构
// 利用 transform 属性使照片旋转不同角度，看上去排列散乱。
function creatDom(){
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            $('<li><div class="box"><img src=""></div></li>')
            .css({
                'width': liW + 'px',
                'height': liH + 'px',
                'left': j*liW + 'px',
                'top': i*liH + 'px',
                'transform': 'scale(0.9) rotate('+ (Math.random() * 40 - 20) +'deg)' + 
                    'translateX(' + (30 * j - 60) + 'px)' +
                    'translateY(' + (30 * i - 60) + 'px)' +
                    'translateZ(-' + Math.random() * 500 + 'px)'
            })
            .find('img').attr('src','./img/bg' + (i*5+j) + '.jpg')
            .end()
            .appendTo(wrapUl);
        }
    }
    bindEvent();
}

function bindEvent(){
    var change = true;
    // 绑定点击事件
    // change 作为一个指示，为true时 小图-->大图，为false时 大图-->小图
    $('li').on('click',function(){
        if(change){
            // 小图 ->大图
            var bgImg = $(this).find('img').attr('src');
            var bgLeft = 0;
            var bgTop = 0;
            // jQuery each() 方法
            $('li').each(function(index){
                var $this = $(this);
                // jQuery delay() 方法
                $this.delay(10*index).animate({'opacity': 0},200,function(){
                    $this.css({
                        'transform': 'rotate(0deg)' + 
                        'translateX(0px)' +
                        'translateY(0px)' +
                        'translateZ(0px)'
                    });
                    $this.find('.box').css({
                        'transform':'scale(1)'
                    });        
                    // 拼图
                    $this.find('img').attr('src',bgImg).css({
                        'position':'absolute',
                        'width':wrapW + 'px',
                        'height': wrapH + 'px',
                        'left': -bgLeft  + 'px',
                        'top': -bgTop + 'px'
                    });
                    bgLeft += liW;
                    if(bgLeft >= wrapW){
                        bgTop += liH;
                        bgLeft = 0;
                    }
                    $this.animate({'opacity':1},200);
                })
            })
            change = false;
        }else{
            // 大图 -> 小图    
            change = true;
            $('li').each(function(index){
                //console.log(index);
                var j = index % 5;
                var i = Math.floor(index/5);
                var $this = $(this);
                $this.delay(10*index).animate({'opacity': 0},200,function(){
                    $this.css({
                        'transform': 'scale(0.9)rotate('+ (Math.random() * 40 - 20) +'deg)' + 
                            'translateX(' + (30 * j - 60) + 'px)' +
                            'translateY(' + (30 * i - 60) + 'px)' +
                            'translateZ(-' + Math.random() * 500 + 'px)'
                    });
                    $this.find('.box').css({
                        'transform':'scale(0.9)'
                    });
                    
                    $this.find('img').attr('src','./img/bg' + index + '.jpg').css({
                        'position': 'absolute',
                        'width': '100%',
                        'height': '100%',
                        'left': 0,
                        'top': 0
                    });
                    $this.animate({'opacity':1},200);
                })
            })
        }
    })
}