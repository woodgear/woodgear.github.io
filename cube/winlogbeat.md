---
time: '1996-09-08T23:37:07+08:00'
id: 'hkxqnps'
---

# tips
winlogbeat will auto recreate index
# install as service
[install](https://www.elastic.co/guide/en/beats/winlogbeat/current/winlogbeat-installation.html)

# how to change default index name
```yaml
setup.ilm.enabled: false
setup.template:
    name:    'winlogbeat-%{[agent.version]}-edr'
    pattern: 'winlogbeat-%{[agent.version]}-edr'
    overwrite: true

output.elasticsearch:
    hosts: ['http://xxxxx:xxxx']
    index: 'winlogbeat-%{[agent.version]}-xxx'
```