/**
 * drawing Board
 * canvas
 * 
 */ 

var drawingLineObj = {
    cavs: $('.cavs'),
    context: $('.cavs').get(0).getContext('2d'),
    arrImg:[],
    bool: false,

    init: function(){   
        this.draw();
        this.btnFn();
    },
    draw: function(){
        var cavs = this.cavs,
            self = this;
        //获取偏移距离
        var c_x = cavs.offset().left,
            c_y = cavs.offset().top;

        this.context.lineCap = 'round';     //线条起始和结尾样式
        this.context.lineJoin = 'round';    //转弯时的线条样式
    
        //鼠标按下之后
        cavs.mousedown(function(e){
            e = e || window.event;
            self.bool = true;
            //减去添加的画板的边距
            var m_x = e.pageX - c_x,
                m_y = e.pageY - c_y;
            self.context.beginPath();
            self.context.moveTo(m_x,m_y);   //鼠标在画布上的触点
            cavs.mousemove(function(e){
                //判断鼠标抬起来时是不移动的
                if(self.bool){
                    self.context.lineTo(e.pageX-c_x, e.pageY-c_y);
                    self.context.stroke();
                }
            })
            cavs.mouseup(function(){
                self.context.closePath();
                self.bool = false;
            })
            cavs.mouseleave(function(){
                self.context.closePath();
                self.bool = false;
            })

            //撤销功能,每画一笔就复制以下整个画布，将这些数据存在一个数组中
            //点击一下撤销就把数组的最后一个粘贴到画布上并删除此数据
            var imgData = self.context.getImageData(0,0,self.cavs[0].width,self.cavs[0].height);
            self.arrImg.push(imgData);
            //console.log(self.arrImg);

            
        })
    },
    btnFn: function(){
        var self = this;
        $('.btn-list').on('click',function(e){
            e = e || window.event;
            switch(e.target.id){
                case 'clean':
                    self.context.clearRect(0,0,self.cavs[0].width,self.cavs[0].height);
                    break;
                case 'rubber':
                    self.context.strokeStyle = "#fff";
                    break
                case 'cancel':
                    if(self.arrImg.length>0){
                        self.context.putImageData(self.arrImg.pop(),0,0);
                    }
                    break
                    
            }
        })
        $('#colorBoard').change(function(e){
            //颜色改变，同步字体颜色
            self.context.strokeStyle = $(this).val();
        })
        $('#wide').change(function(e){
            //线条粗细
            self.context.lineWidth = $(this).val();
        })
    }
}
drawingLineObj.init();