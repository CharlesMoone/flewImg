# flexImg
用flex实现的瀑布式图片布局

使用方法：加载页面后，滚动条到底则继续申请20个图片

实现方法是给div使用diplay:flex，然后通过js去手动给div中添加图片

－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
逻辑：
ImageClass类
－－初始化
  构造器指向自己
  div容器,最大为6个
  img容器,不设上限
  状态储存器,分别对应2,3,4,5,6个div
  总图片数量
  对新图片申请的状态
  保存当前width对应div的数量
  保存要插入的目标
－－方法
  初始化方法
  宽度检查，需要宽度和插入目标
  resize导致的图片重新布局
  插入图片
  新图片申请