---
time: '1996-09-08T23:37:07+08:00'
id: 'ayplmsk'
---

# import-package

# dependency
python 通过pip(类似于npm/cargo的包管理工具) pipenv(虚拟化python包依赖环境 使得每个python项目的包环境能够相互隔离 python特有的问题?) pipfile (记录安装的包)   
[pip 与 Pipfile](https://blog.windrunner.me/python/pip.html)  
所以看起来 pipenv <==> npm/cargo 值得注意的是只用使用`pipenv shell`才是真正的shell环境
## install pip3
```bash
sudo apt-get install python3-pip
```
## install pipenv
```bash
pip3 install pipenv
```
## install package by pipfile
```bash
pipenv install
```
## add-a-new-package
```bash
pipenv install <package>
```
[pipenv](https://pipenv-fork.readthedocs.io/en/latest/basics.html)
## import-into-local

# 规范
每个函数 必须通过文档(文档字符串) 表明参数类型返回值类型
[文档字符串](https://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/python_style_rules/#comments)

类型名驼峰.文件,方法,属性,变量 小写下划线(snake_case)
# 包管理 
pip pipenv
# 测试
## [unittest](https://docs.python.org/zh-cn/3/library/unittest.html)
python 自带的测试框架
原理应该是通过继承来使得某个类是拥有运行测试的能力
```python
python -m unittest discover # 自动跑所有测试
python -m unittest test.test_find_unknow_words 
# python -m unittest ${test-folder-name}.${test-file-name} # 制定测试文件
```
### test suite
通过在测试类中实现特定的方法来实现初始化和析构
setUp() => beforeEach()
tearDown() => afterEach()

```python3
# basic example
import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
```

# 语法
# l-string-fmt
最新的姿势叫做[f-strings](https://realpython.com/python-f-strings/)
```
name = "misaki"
age = "16"
desc = f"{name} is {age} years old"
print(desc)
```
# OO
类中如何定义属性 初始化 设置/获取属性 如何定义方法
```python
Class Demo:
    count_of_call_get = 0 # class attribute access via Demo.count_of_call_get
    def __init(self) {
        self.a = "a" # a is instance attribute
    }
    def get_a(self) {
        return self.a # acess via self
    }
    
    def set_a(self) {
        return self.a # modify via self
    }

```
```python
# 构造类
Demo(xx)
```
# capture-control-c-in-python
```python
try:
    # DO THINGS
except KeyboardInterrupt:
    # quit
    sys.exit()
```
实际上每个try catch 都必须处理KeyboardInterrupt才能生效

# try catch
```python3
try:
    raise Exception('spam', 'eggs')
except Exception as inst:
    print(inst)  
```
# 抛出异常
```
raise Exception('x should not exceed 5. The value of x was: {}'.format(x))
```
# 控制流
```python
name = 'luren'
if name == 'python': 
    print 'welcome boss'
else:
    print name   
```

# import
```python3

```
# l-io
## l-console-out
```python3
# python3中并没有println print 会默认带换行
print("xxx")
```