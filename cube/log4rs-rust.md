---
time: '1996-09-08T23:37:07+08:00'
id: 'edrh9td'
---

```rust
pub use log::{self,*};
use log4rs::{
    config::Config,
    file::{Deserializers, RawConfig},
    Logger,
};
use serde::Deserialize;

pub fn init_log4rs(config: &str) -> Result<log4rs::Handle, failure::Error> {
    let log4rs_config: RawConfig = serde_yaml::from_str(config)?;

    let (appenders, _) = log4rs_config.appenders_lossy(&Deserializers::default());

    let (config, _) = Config::builder()
        .appenders(appenders)
        .loggers(log4rs_config.loggers())
        .build_lossy(log4rs_config.root());

    Ok(log4rs::init_config(config)?)
}
```
```yaml
refresh_rate: 30 seconds
appenders:
  stdout:
    kind: console
  root:
    kind: rolling_file
    path: "log/main.log"
    encoder:
      pattern: "{l} {d(%Y-%m-%d %H:%M:%S)} {T} {M}:{L} - {m}{n}"
    policy:
      kind: compound
      trigger:
        kind: size
        limit: 5 mb
      roller:
        kind: delete
root:
  level: info
  appenders:
    - root
    - stdout

```
```rust
let config = include_str!("log4rs.yaml");
println!("config {}",config);
let log = util::log::init_log4rs(config).unwrap();
```