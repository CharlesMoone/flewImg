/**
 * 兼容性方法-单例模式
 * @type 方法
 */
var compatible = {
    /**
     * 获取Y方向滚动高度的兼容模式
     * @returns {number}
     */
    getScrollTop: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        } else if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },

    /**
     * 获取文档总高度的兼容模式
     * @returns {number}
     */
    getScrollHeight: function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        } else if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },

    /**
     * 获取浏览器视口高度的兼容模式
     * @returns {number}
     */
    getWindowHeight: function () {
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },

    /**
     * 添加事件监听的兼容模式
     * @param dom dom级对象
     * @param type 事件类型eg.click,change...
     * @param fn 回调函数
     */
    addEvent: function (dom, type, fn) {
        fn = fn || function () {};
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent('on' + type, fn);
        } else {
            dom['on' + type] = fn;
        }
    },

    /**
     * 删除事件监听的兼容模式
     * !!!!!谨记!!!!!删除不可以删除用匿名函数创建的事件监听
     * @param dom dom级对象
     * @param type 事件类型eg.click,change...
     * @param fn 回调函数
     */
    removeEvent: function (dom, type, fn) {
        fn = fn || function () {};
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fn, false);
        } else if (dom.detachEvent) {
            dom.detachEvent('on' + type, fn);
        } else {
            dom['on' + type] = null;
        }
    },

    /**
     * 获取event事件的兼容模式
     * @param event
     * @returns {*|Event}
     */
    getEvent: function (event) {
        return event || window.event;
    },

    /**
     * 获取target的兼容模式
     * @param event
     * @returns {EventTarget|Object}
     */
    getTarget: function (event) {
        return this.getEvent(event).target || this.getEvent(event).srcElement;
    },
};