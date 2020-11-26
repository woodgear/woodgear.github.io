---
id: '5rx9fwv'
time: '2019-06-14T08:09:59+08:00'
---

# windows host ubuntu18.04 guest 无法全屏
Settings (of the VM) > Display > Graphics Controller > and select "VBoxVGA"
# vm control
VBoxManage.exe  controlvm  driver poweroff
VBoxManage.exe  startvm  driver
# get vm ip
VBoxManage guestproperty get "vm-name" "/VirtualBox/GuestInfo/Net/0/V4/IP"