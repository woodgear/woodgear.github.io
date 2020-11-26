---
time: '1996-09-08T23:37:07+08:00'
id: 'sfkzmdc'
---

# 定义变量
```
string testString = "This is a string.";
```
# 函数定义
```c++
return_type function_name( parameter list ) {
   body of the function
}
```
# class
```c++
//a.h
class A
{ 
    public:   
    string name; 
  
    string getname();
    void sayHi();
    // 同名函数为构造函数
    A();
    // 类方法 或者讲静态方法
    static A fromOther();
}; 


//a.cpp
A::A() {

}
std::string A::getname()
{
    return this.name;
}
std::string A::sayHi()
{
    printf("hi,i am %s".this->getname());
}
```
# 调用构造函数
```cpp
// a: A*
// A* a = new A();
auto a = new A();
// a: A
// A a = A();
auto a = A();

A a();
//std::vector<char> data(buffer, buffer + size);
```
# exception
```cpp
double division(int a, int b)
{
   if( b == 0 )
   {
      throw "Division by zero condition!";
   }
   return (a/b);
}
```



# l-string-format
```cpp
#include <string>       // std::string
#include <iostream>     // std::cout
#include <sstream>      // std::stringstream

int main () {

  std::stringstream ss;
  ss << 100 << ' ' << 200;
  std::string real_string = ss.str();

  std::cout << real_string;  
  return 0;
}

```
# l-log
PLOG 看起来比较好
```cpp
// in init
#include <plog/Log.h>
#include <plog/Initializers/RollingFileInitializer.h>
#include <plog/Appenders/ConsoleAppender.h>
void init_log() {
    static plog::RollingFileAppender<plog::TxtFormatter> fileAppender("log.log", 8000, 3);
    static plog::ConsoleAppender<plog::TxtFormatter> consoleAppender;
    plog::init(plog::debug, &fileAppender).addAppender(&consoleAppender); 
}

// in use
#include <plog/Log.h>
PLOGD <<"xxx";

```