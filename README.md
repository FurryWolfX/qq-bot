# QQ 机器人

将收到的图自动保存到本地。

依赖 `mirai-api-http`，请配置好并成功启动。

```yaml
cors: 
  - '*'
host: 0.0.0.0
port: 18080
authKey: xxxxxxx
cacheSize: 4096
enableWebsocket: true
report: 
  enable: false
  groupMessage: 
    report: true
  friendMessage: 
    report: true
  tempMessage: 
    report: true
  eventMessage: 
    report: true
  destinations: []
  extraHeaders: {}

heartbeat: 
  enable: false
  delay: 1000
  period: 15000
  destinations: []
  extraBody: {}

  extraHeaders: {}
```