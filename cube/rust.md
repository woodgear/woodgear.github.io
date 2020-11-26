---
id: 'gjuqp5w'
time: '1996-09-08T23:37:07+08:00'
---

# 按照nightly版的component
rustup component add {{component}} --toolchain nightly
# 如何通过配置文件设置给定crate的toolchain version
新增rust-toolchain文件
内容写死期望的工具链
```
nightly-2019-04-19
```
[文档](https://github.com/rust-lang/rustup.rs#toolchain-specification)
# 安装rust
```
https://win.rustup.rs/x86_64
```
# 离线安装
必须用cmd 不能用powershell
[component-id](https://docs.microsoft.com/en-us/visualstudio/install/workload-component-id-vs-build-tools?view=vs-2017)
```
.\vs_community__1600658420.1558275487.exe ^
--layout C:\Users\developer\Desktop\ci\vs ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.CoreEditor ^
--add Microsoft.VisualStudio.Component.StartPageExperiment.Cpp ^
--add Microsoft.Component.MSBuild ^
--add Microsoft.VisualStudio.Component.Roslyn.Compiler ^
--add Microsoft.VisualStudio.Component.TextTemplating ^
--add Microsoft.VisualStudio.Component.VC.CoreIde ^
--add Microsoft.VisualStudio.Component.VC.Redist.14.Latest  ^
--add Microsoft.VisualStudio.ComponentGroup.NativeDesktop.Core   ^
--add Microsoft.VisualStudio.Component.NuGet  ^
--add Microsoft.VisualStudio.Component.Windows10SDK.17763 ^
--add Microsoft.VisualStudio.Component.VC.ATL  ^
--add Microsoft.VisualStudio.Component.VC.Tools.x86.x64  ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--includeRecommended ^
--lang en-US
```
# 国内源
touch $HOME/.cargo/config 
[registry]
index = "http://mirrors.ustc.edu.cn/crates.io-index"

# 静态编译
```bat
set RUSTFLAGS=-C target-feature=+crt-static
export RUSTFLAGS='-C target-feature=+crt-static'
```
## windows xp
```bat
set RUSTFLAGS=-C target-feature=+crt-static  -C link-arg=/SUBSYSTEM:CONSOLE,5.01
```


# FFI
1. String => * const c_char
```rust
CString("xxxx").as_ptr()
```
## build.rs
1. 在root下放一个build.rs
2. 在cargo.toml中设置build选项
[manifest](https://doc.rust-lang.org/cargo/reference/manifest.html)