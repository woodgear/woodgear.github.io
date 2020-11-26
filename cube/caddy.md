---
time: '2019-12-24 14:10'
id: '6efde81'
---

# proxy
```Caddyfile
*:10000 {
	log / stdout "{common} {upstream}"
    tls off

    proxy /storage http://192.168.2.218:9000 {
    	without /storage
        transparent
    }
}
```
/storage/a/b/c.data => http://192.168.2.218:9000/