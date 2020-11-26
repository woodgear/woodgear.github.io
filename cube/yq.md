---
time: '1996-09-08T23:37:07+08:00'
id: 'wcfnxmu'
---

# what it is
本质上讲还是jq的语法
# install 
```
pip install yq
```

# example
```yaml
# example.yaml
title: i am a yaml
```

```sh
yq r example.yaml title
```

```sh
cat  example.yaml | yq r - title
```