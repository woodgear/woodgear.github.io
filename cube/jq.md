---
time: '2020-03-21 23:14:4'
id: '2435ea2'
---

# only show keys
```bash
jq '.subitem|keys'
```
# array of object select
```bash
# | .[]|
.elements[0].elements| .[]|select(.name=="Configurations") 
```
# create json
```bash
jq -n --arg greeting world '{"hello":"\($greeting)"}'
```