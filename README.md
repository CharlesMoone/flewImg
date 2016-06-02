#用flex实现的瀑布式图片布局

demo: https://charlesmoone.github.io/flewImg

测试环境：Safari 9.1.1、chrome50.0

使用说明：需要添加head里style的样式以及包含

    <script src="compatible.js"></script>

    <script src="imageClass.js"></script>

    <script>
        var image = new ImageClass();
        image.init();
        image.widthCheck(document.body.clientWidth);
        image.pull();
    </script>

特意说明：
1. init方法的参数选填,不选默认为dom级元素body。
1. widthCheck方法在宽度发生改变的时候使用,eg:window.onresize;
2. pull方法在需要新图片加入的时候使用,eg:window.onscroll;
3. firefox不兼容、IE没有测试;

demo使用说明：加载页面后，滚动条到底则继续申请20个图片

实现方法是给div使用diplay:flex，然后通过js去手动给div中添加图片

##逻辑：
ImageClass类
>#####初始化类操作
>1. div为创建的{dom级元素['DIV'], length},前者表示列的数量,在resize()的时候会进行一次列的数量的修改;后者表示当前div的高度,用来判断下一个img插入的位置。
>2. img为当前页面所有dom级元素['IMG'],表示当前所有图片的集合,在pull()里会进行图片初始化操作。
>3. 其他初始化则为了进行状态转化等作用

>#####原型方法
>+ init - 初始化div,需要提供显示目标[dom元素]。
>+ widthCheck - 宽度监测,配合css使用,自动监测,1440以上6列,每隔288降低一列。最低2列为576
>+ resize - div重排,配合widthCheck使用,或者手动进行配置,参数为divNumber(列数)和target(插入目标)。
>+ resetImg - 实现div重排。
>+ pull - 初始化img,每次做请求的时候调用pull即可。