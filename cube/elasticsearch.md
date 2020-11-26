---
time: '1996-09-08T23:37:07+08:00'
id: 'zqjrxrx'
---

# install
## docker
docker run -d -p 9200:9200 -e discovery.type=single-node elasticsearch:6.5.4
## docker-compose
```yaml
version: '3'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
    environment:
      - cluster.name=docker-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - xxxx:/usr/share/elasticsearch/data
    ports:
      - "9200:9200"
  kibana:
    image: docker.elastic.co/kibana/kibana:7.4.0
    ports:
      - "5601:5601"
```
## validiate docker
curl -u elastic:changeme localhost:9200

# 模型
index->node->shared->document->type->field
# version
```
GET /
```
## type是什么

## 为什么不同的type不能有相同的field
正确的将是因为es本身的机制导致相同的field必须是相同的type
## 如何创建一个index
```bash
POST /${index}
```
## list all index
```bash
GET /_cat/indices?v
```
## get all doc from index
```bash
GET  ${index}/${type}/_search 
{
    "query": {
        "match_all": {}
    }
}
```
## delete a document
```
DELETE ${index}/${type}/${id} 
```



# mapping
如何ts一样es一样有着类型的问题我们通过post put 等方法将数据丢给es那么其类型是什么? 如果没有显示指定的话es会自己尝试设置类型,同时也可以通过mapping来设置类型
## 获取mapping
```
GET  ${index}/_mapping/${type}
```
## how to mapping nest field/array datatype
```json
{
   "properties": {
        "comments": {
          "type": "nested", 
          "properties": {
            "stars":   { "type": "short"   },
            "date":    { "type": "date"    }
          }
        }
}
}
```

[nested-mapping](https://www.elastic.co/guide/en/elasticsearch/guide/master/nested-mapping.html)
# syntax
## aggregation 聚合
### nest object
```
GET .market/download_status/_search
{
  "aggs": {
    "download_status": {
      "nested": {
        "path": "detail"
      },
      "aggs": {
        "download_state": {
          "terms": {
            "field": "detail.state"
          }
        }
      }
    }
  }
}
```
[search-aggregations-bucket-nested-aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-nested-aggregation.html)

# make-elasticsearch-only-return-certain-fields
[ source filter](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html#request-body-search-source-filtering)
```
GET /_search
{
    "_source": [ "obj1.*", "obj2.*" ],
    "query" : {
        "term" : { "user" : "kimchy" }
    }
}
```

# 只返回聚合的数据
```
https://www.elastic.co/guide/en/elasticsearch/reference/current/returning-only-agg-results.htmls
 "size": 0,

```