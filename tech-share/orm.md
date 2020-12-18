---
time: '1996-09-08T23:37:07+08:00'
id: 'xfq7njk'
---

# what a orm should be
1. define table
2. insert
3. query
4. 删除约束
5. migrate

# python
## pydal
### define table
[doc](http://www.web2py.com/books/default/chapter/29/06/the-database-abstraction-layer)

构造出DAL对象后可以直接通过此对象定义table和访问表格中的数据
```python
self.db = DAL(sqlite_uri, folder=self.folder_path)
self.db.define_table('word', Field('user_id'), Field(
    'word'), Field('word_type'), Field('time'))
self.db.commit()
# 直接使用
 [item.word for item in self.db((self.db.word.user_id == id) & (self.db.word.word_type == "unknow")).select(self.db.word.ALL)]
```
通过定义Field对象来描述field (类型约束之类的)
```python
Field(fieldname, type='string', length=None, default=DEFAULT,
      required=False, requires=DEFAULT,
      ondelete='CASCADE', notnull=False, unique=False,
      uploadfield=True, widget=None, label=None, comment=None,
      writable=True, readable=True, searchable=True, listable=True,
      update=None, authorize=None, autodelete=False, represent=None,
      uploadfolder=None, uploadseparate=None, uploadfs=None,
      compute=None, filter_in=None, filter_out=None,
      custom_qualifier=None, map_none=None, rname=None)
```
### insert
```
cropus_id = self.db.corpus_meta.insert(**corpus_meta_data)
```
### 约束
通过在Field中设置reference属性
```python
db.define_table("user_corpus",
                Field("user_id", type="string"),
                Field("corpus_id", type="reference corpus_meta")
                )
```

## 额外的事
pydal 会为每个表自动创建一个自增主键id 可以通过在定义时知名type='id'来将某个field设为自增主键(但是pydal的作者并不推荐)