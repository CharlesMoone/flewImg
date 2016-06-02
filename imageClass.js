/**
 * 图片类
 * @returns {ImageClass} 安全模式
 * @constructor 指向自己
 */
var ImageClass = function (pullNumber) {
    if (this instanceof ImageClass) {
        this.constructor = this;            //构造函数指向自己
        this.div = new Array(6);            //创建一个div的容器,最大为6个
        this.img = [];                      //创建一个img的容器,不设上限
        //创建一个状态储存器,分别对应2,3,4,5,6个div
        this.widthStatus = [false, false, false, false, false];
        this.number = 0;                    //储存总图片数量
        this.pullNumber = pullNumber || 20; //储存每次申请图片数量,默认为20
        this.pullRequest = true;            //变更对新图片申请的状态
        this.divNumber = 0;                 //保存当前width对应div的数量
        this.target = null;                 //保存要插入的目标
    } else {
        return new ImageClass();
    }
};

/**
 * 原型方法
 * @type {{
     * init: ImageClass.init,                   初始化
     * widthCheck: ImageClass.widthCheck,       宽度检查
     * resize: ImageClass.resize                宽度达到标准进行resize
     * }}
 */
ImageClass.prototype = {
    init: function (target) {
        try {
            this.target = target || document.getElementsByTagName('body')[0];
        } catch (e) {console.error(e)}
        for (var i = 0; i < 6; i++) {
            this.div[i] = {
                dom: document.createElement('DIV'),
                length: 0
            };
        }
    },
    widthCheck: function (width) {
        if (width >= 1440 && !this.widthStatus[4]) {
            this.resize(6);
        } else if (width < 1440 && width >= 1152 && !this.widthStatus[3]) {
            this.resize(5);
        } else if (width < 1152 && width >= 864 && !this.widthStatus[2]) {
            this.resize(4);
        } else if (width < 864 && width >= 576 && !this.widthStatus[1]) {
            this.resize(3);
        } else if (width < 576 && !this.widthStatus[0]) {
            this.resize(2);
        }
    },
    resize: function (divNumber, target) {
        this.target = target || this.target;
        this.divNumber = divNumber;
        this.target.innerHTML = null;
        this.widthStatus = [false, false, false, false, false];
        this.widthStatus[divNumber-2] = true;
        this.resetImg();
    },
    resetImg : function () {
        for (var i = 0; i < this.divNumber; i ++) {
            this.target.appendChild(this.div[i].dom);
            this.div[i].dom.style.width = 100 / this.divNumber - 1 + "%";
            this.div[i].length = 0;
        }
        for (i = 0; i < this.img.length; i ++) {
            this.div[i%this.divNumber].dom.appendChild(this.img[i]);
            this.div[i%this.divNumber].length += this.img[i].height;
        }
    },
    setImg: function (img, height) {
        var i = 0, temp = 0;
        for (; i < this.divNumber; i ++) {
            if (this.div[temp].length > this.div[i].length) {
                temp = i;
            }
        }
        this.div[temp].dom.appendChild(img);
        this.div[temp].length += height;
    },
    pull: function () {
        if (!this.pullRequest) return ;
        console.log('pull success!');
        this.pullRequest = false;
        var max = this.number + this.pullNumber, count = 0, that = this;
        for (; this.number < max; this.number ++) {
            this.img[this.number] = document.createElement('IMG');
            var width = (100 + Math.floor(Math.random() * 100)),
                height = (Math.floor(Math.random() * 100) + 100),
                divWidth = (100 / this.divNumber - 1) * document.body.clientWidth;
            this.img[this.number].src = 'http://placehold.it/' + width + 'x' + height;
            that.setImg(this.img[this.number], height*divWidth/width);
//                this.img[this.number].src = 'http://lorempixel.com/' + (100 + Math.floor(Math.random() * 100)) + '/' + (Math.floor(Math.random() * 100) + 100) + "?id=" + this.number;
            this.img[this.number].onload = this.img[this.number].onerror = function () {
                if (++count == that.pullNumber) {
                    that.pullRequest = true;
                }
            };
        }
    }
};