---
time: '1996-09-08T23:37:07+08:00'
id: 'pbwuuw2'
---

实现一个函数
输入 命令行
输出 此命令行的执行结果

# c++

```cpp
#include "stdafx.h"
#include <Windows.h>
#include <string>
#include <iostream>
#include <sstream>
#define BUFSIZE 4096
using namespace std;

std::string GetLastErrorAsString()
{
    //Get the error message, if any.
    DWORD errorMessageID = ::GetLastError();
    if (errorMessageID == 0)
        return std::string(); //No error message has been recorded

    LPSTR messageBuffer = nullptr;
    size_t size = FormatMessageA(FORMAT_MESSAGE_ALLOCATE_BUFFER | FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS,
        NULL, errorMessageID, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT), (LPSTR)&messageBuffer, 0, NULL);

    std::string message(messageBuffer, size);

    //Free the buffer.
    LocalFree(messageBuffer);

    return message;
}
int eval(string cmd, string &res) {
    SECURITY_ATTRIBUTES saAttr;
    saAttr.nLength = sizeof(SECURITY_ATTRIBUTES);
    saAttr.bInheritHandle = TRUE;
    saAttr.lpSecurityDescriptor = NULL;

    HANDLE read = NULL;
    HANDLE write = NULL;

    //when process write in 'write' you could read from 'read'
    if (!CreatePipe(&read, &write, &saAttr, 0)) {
        res ="CreatePipe Err" ;
        return -1;
    }

    //init PROCESS_INFORMATION
    PROCESS_INFORMATION piProcInfo;
    ZeroMemory(&piProcInfo, sizeof(PROCESS_INFORMATION));
    //init STARTUPINFO set output handle of process
    STARTUPINFOA siStartInfo;
    ZeroMemory(&siStartInfo, sizeof(STARTUPINFO));
    siStartInfo.cb = sizeof(STARTUPINFO);
    siStartInfo.hStdOutput = write;
    siStartInfo.dwFlags |= STARTF_USESTDHANDLES;

    BOOL bSuccess = FALSE;
    bSuccess = CreateProcessA(
        NULL,
        (LPSTR)cmd.c_str(),     // command line
        NULL,          // process security attributes
        NULL,          // primary thread security attributes
        TRUE,          // handles are inherited
        CREATE_NO_WINDOW,// creation flags
        NULL,          // use parent's environment
        NULL,          // use parent's current directory
        &siStartInfo,  // STARTUPINFO pointer
        &piProcInfo);  // receives PROCESS_INFORMATION
    if (!bSuccess)
    {
        res= GetLastErrorAsString();
        return -1;
    }

    CloseHandle(write);
    CloseHandle(piProcInfo.hProcess);
    CloseHandle(piProcInfo.hThread);

    //now we can read the output of process
    DWORD dwRead;
    char chBuf[BUFSIZE + 1];
    stringstream ss;
    for (;;)
    {
        if (!ReadFile(read, chBuf, BUFSIZE, &dwRead, NULL))
        {
            break;
        }
        if (dwRead > 0)
        {
            chBuf[dwRead] = '\0';
            ss << chBuf;
        }
    }
    res = ss.str();
    return 0;
}

int main()
{
    string cmd = "cmd /C echo test";
    string res;
    if (eval(cmd, res)==0) {
        cout << "eval " << cmd << " ok" << endl;
        cout << res << endl;
    }
    else
    {
        cout << "eval " << cmd << " fail" << endl;
        cout << res << endl;
    }
    cin.get();
    return 0;
}
```

# Rust

```rust
// power by https://github.com/hniksic/rust-subprocess.git
/*
[target.'cfg(windows)'.dependencies]
winapi = "0.2"
kernel32-sys = "0.2"
*/

#[cfg(windows)]
extern crate kernel32;
#[cfg(windows)]
extern crate winapi;
use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;
use std::iter;
use std::ptr;
use std::mem;

// OsStr to zero-terminated owned vector
fn to_nullterm(s: &OsStr) -> Vec<u16> {
    s.encode_wide().chain(iter::once(0u16)).collect()
}

fn create_process(cmd: String) -> Result<String, String> {
    use winapi::minwinbase::{LPSECURITY_ATTRIBUTES, SECURITY_ATTRIBUTES};
    use winapi::winbase::{CREATE_NO_WINDOW, STARTF_USESTDHANDLES};
    use winapi::minwindef::{BOOL, DWORD};
    use winapi::{PROCESS_INFORMATION, STARTUPINFOW};
    use winapi::winnt::PHANDLE;
    use std::fs::File;
    use std::os::windows::io::{AsRawHandle, FromRawHandle};
    use std::ffi::OsStr;
    use std::io::Read;
    let mut attributes = SECURITY_ATTRIBUTES {
        nLength: mem::size_of::<SECURITY_ATTRIBUTES>() as DWORD,
        lpSecurityDescriptor: ptr::null_mut(),
        bInheritHandle: true as BOOL,
    };

    let (mut r, mut w) = (ptr::null_mut(), ptr::null_mut());
    unsafe {
        kernel32::CreatePipe(
            &mut r as PHANDLE,
            &mut w as PHANDLE,
            &mut attributes as LPSECURITY_ATTRIBUTES,
            0,
        )
    };
    let (mut read, write) = unsafe { (File::from_raw_handle(r), File::from_raw_handle(w)) };

    let mut sinfo: STARTUPINFOW = unsafe { mem::zeroed() };
    sinfo.cb = mem::size_of::<STARTUPINFOW>() as DWORD;
    sinfo.hStdOutput = write.as_raw_handle();
    sinfo.dwFlags = STARTF_USESTDHANDLES;

    let cmd_line = OsStr::new(&cmd);
    let mut pinfo: PROCESS_INFORMATION = unsafe { mem::zeroed() };
    unsafe {
        kernel32::CreateProcessW(
            ptr::null(),
            to_nullterm(cmd_line).as_mut_ptr(),
            ptr::null_mut(),  // lpProcessAttributes
            ptr::null_mut(),  // lpThreadAttributes
            true as BOOL,     // bInheritHandles
            CREATE_NO_WINDOW, // dwCreationFlags
            ptr::null_mut(),  // lpEnvironment
            ptr::null_mut(),  // lpCurrentDirectory
            &mut sinfo,
            &mut pinfo,
        )
    };
    unsafe {
        kernel32::CloseHandle(write.as_raw_handle());
    }
    unsafe {
        kernel32::CloseHandle(pinfo.hProcess);
    }
    unsafe {
        kernel32::CloseHandle(pinfo.hThread);
    }

    let mut contents = Vec::new();
    read.read_to_end(&mut contents).map_err(|e|e.to_string())?;
    String::from_utf8(contents).map_err(|e| e.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_create_process() {
        let msg = "test".to_owned();
        let res = create_process(format!("cmd /c echo {}", msg));
        assert_eq!(res, Ok(format!("{}\r\n", msg)));
    }
}
```