---
id: 'ppi64uu'
time: '2020-01-16T09:45:51+08:00'
---

> 在某种程度上cmake和c++特别的相像,你必须谨慎选取一个子集来使用
# common
[](https://stackoverflow.com/a/28370892/5642024)
```bat
cmake -G "Visual Studio 16 2019" -A Win32 -S \path_to_source\ -B "build32"
cmake -G "Visual Studio 16 2019" -A x64 -S \path_to_source\ -B "build64"
cmake --build build32 --config Release
cmake --build build64 --config Release
```