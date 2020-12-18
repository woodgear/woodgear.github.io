---
id: 'e70708'
time: '2020-10-15T11:12:49+08:00'
title: speeeed up! add gh to you workflow.
tag: 工程效率,workflow优化
---
当辛辛苦苦搬完砖后,你优雅的
1. `git commit -m "xxx"`
2. `git push xxx`
3. 手动到网页上点击那个绿色的按钮"New pull request"
4. 点击确定

实际第三步和第四步破坏了开发的体验
我们要做的事情的语义是确定的,理论上讲只要两步就可以了
1. 在本地准备好一个分支
2. 以这个分支提一个pr

[gh](https://cli.github.com/)是一个官方的GitHub CLI 管理工具.将其加入到workflow中可以修复这一体验

##  push current branch and request a pull request
gh pr create -f
## review workflow
review时一般分为四步  
1. 查看pr list 获取到到一个number 这个number后续操作的id `gh pr list`
2. 查看pr diff `gh pr diff ${number}` 会显示出如同git diff的输出 来检查这次的pr的更改
3. review pr `gh pr review ${number}` 会显示三个选项 approve comment body 使用箭头和回车进行选择
4. merge pr `gh pr merge ${number}` 同样会让你选择是 rebase 还是squash 还是 create merge commit

## one more
总而言之,gh所带来的体验于图形界面无二. 但命令行的优势在于其的可组合性
review workflow中的3-4 两部实际上也可以归并起来   
`PR_ID=${} && gh pr review $PR_ID -a && gh pr merge $PR_ID -d -r`

当当前分支就是提出pr的分支时 number实际上是不需要指定的.  
所以实际上也可以
1. `gh pr list`
2. `gh pr checkout $number && gh pr diff` 
3. `gh pr -a && gh pr merge -d -r`
不过这要求切换到一个分支所以不是很实用  
总而言之
### create pr
`gh pr create -f`
### review and merge pr
1. `gh pr list`
2. `gh pr diff ${number}`
3. `PR_ID=${} && gh pr review $PR_ID -a && gh pr merge $PR_ID -d -r`
## 不足/优化
1. 可能是因为网络的原因 使用gh有时会失败
2. 目前的工作流中的一个要求是 多个commit使用squash merge到master使用create merge commit.可能要写函数
3. 理论上讲,在正常的工作中,pr只有一个,所以第一步和第二步可以合成一个

## one more more

通过使用alias 我们可以继续进行优化
### create pr
`gh alias set cpr 'pr create -f'`
### check diff
`gh alias set --shell see "gh pr list |cat|tail |awk '{print \$1}' | xargs -I {} sh -c 'echo {} && gh pr diff {}'"`​
### merge pr
`gh alias set --shell  mg "gh pr review \$1 -a && gh pr merge \$1 -d -r"`

这样的话使用的体验就是
* 创建pr `gh cpr`
* 查看pr `gh see`
* merge pr `gh mg $number`
>丝滑
不足/优化
1. 可能是因为网络的原因 使用gh有时会失败
2. 目前的工作流中的一个要求是 多个commit使用squash merge到master使用create merge commit.可能要写函数