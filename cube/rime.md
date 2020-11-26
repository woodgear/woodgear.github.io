---
time: '1996-09-08T23:37:07+08:00'
id: 'e6gt9v6'
---

# 默认快捷键
切换中英文 :shift
切换全角半角:shift+space
# 关闭全角半角切换
[参照](https://github.com/rime/weasel/issues/96)
# 配置文件位置
~/.config/fcitx/rime
# install
`sudo apt-get install fcitx-rime`
# 我的配置文件
```yaml
# luna_pinyin_simp.custom.yaml
patch:
  'punctuator/import_preset': alternative
  'key_binder/bindings':
    - { accept: "Shift+space", toggle: noop, when: always}
```