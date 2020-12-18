---
time: '1996-09-08T23:37:07+08:00'
id: 'g8zivhc'
---

>[vh](https://github.com/woodgear/VocabularyHunter),收藏你所阅读的(英文)文章作为词典例句.

# 为什么 是什么 或者讲有什么新意
> 想记住新的事情最有效的方法便是建起其与已有记忆的关联 --沃柴德夫斯基  

记忆单词也是同理,百词斩的记图,奇奇怪怪的谐音记忆法和联想记忆法同样.作为一名程序员(英语水平很烂的那种),我会阅读大量的英文文章,不禁在想如果能够在我开始阅读之前告诉我那些单词我不知道就好了,如果我查询的词典是从我之前看过的文章中生成的就更好了.于是VH应运而生

# 如何使用
## 如何安装
1. 下载[vh.crx](https://github.com/woodgear/VocabularyHunter/releases/download/vh-chrome-extenstion-v0.0.60/vh.crx)
2. 打开 chrome 扩展程序界面 (chrome://extensions/)
3. 将vh.crx拖动过去

## 找出当前网页上的生词
点击工具栏图标
## 将当前网页上的内容加入词典
右键vh->save this article to vh

## 搜索某一个单词
右键vh->dict mode  新窗口中输入单词点击查询

# 实际上如何工作
* [ECDICT](https://github.com/skywind3000/ECDICT)作为原始词典,
* 谷歌api发音
* nltk分词  

总的来讲就是chrome插件会将当前网页上的内容发送到服务器,分词后找到生词,在从ECDICT中找到解释,从收藏的文章中找到含有这个词的句子.

# 缺点 
1. 冷启动不好 在开始时要点很多次know
2. 界面太烂
3. 部署在谷歌云上,部分地区(T_T)必须使用特殊的姿势访问
4. 其他还有各种各样的嘈点

# 接下可能(也可能会鸽)的事情
* UI界面 (优先度可能较低)
* 查询单个单词
* 单词或者文章的管理界面
* 真正的登录系统