---
id: 'qxkpbyb'
time: '2019-05-05T17:58:39+08:00'
tag: 'sentry,log,rust'
---

# 是什么

很明显 sentry 是一个日志收集与分析系统(俺觉得是),那么当我们将我们想要去了解如何使用 sentry 时我们实际上是在想如何让 sentry 帮我们收集分析日志.
所以 sentry 的文档应当告诉我们

1. 如何把日志报上去
2. 如何分析这些日志
3. sentry 是如何工作的(从开发者视角看了)

# 如何上报

## 模型

sentry 作为一个被集成在应用中,log 时调用 sentry 的 API 发送请求,然后在 sentry 的控制台(网页)上做分析

## 所指向之物

Q:
无论如何我们需要标识 logger 自身,不同的人/程序 使用 sentry 必须要区别开来
A:
sentry 提供了[DSN](https://docs.sentry.io/error-reporting/quickstart/?platform=rust)

```rust
#[macro_use]
extern crate log;

use pretty_env_logger;
use sentry;

fn init_log() {
    let _guard = sentry::init("https://b91b96b0b6304d3a8c8dc44eab1bf965@sentry.io/479965");

    let mut log_builder = pretty_env_logger::formatted_builder();
    log_builder.parse("info"); // or env::var("RUST_LOG")
    let logger = log_builder.build();
    let options = sentry::integrations::log::LoggerOptions {
        global_filter: Some(logger.filter()),
        ..Default::default()
    };
    sentry::integrations::log::init(Some(Box::new(logger)), options);
}

fn main() {
    init_log();
    error!("some log");
}

```

如上 你就可以将日志上报至 sentry

## 分析与聚合

现在我们有能力将日志上传至 sentry,但日志实际上就只是字符串的流而已,我么们要想办法从中做出区分,用 sentry 的术语就是要能够从 Event 中聚类出 Issue,即 [Rollups & Grouping](https://docs.sentry.io/data-management/rollups/?platform=rust)

### sentry style