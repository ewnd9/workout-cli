# workout-cli

Interval reminder to distract from laptop

## Install

```
# package for running workout-cli in background
$ npm install -g pm2

# instruction for setup autostart of pm2 after reboot
$ pm2 startup

# in future, now just clone repo && npm link
$ npm install -g workout-cli
```

## Usage

```
$ workout --start
$ workout --stop
$ workout --restart
$ workout --status
```

## Draft

- every n-minutes notifications
- stop when complete dialog via `$ workout` or `$ workout skip` to write excuse
- generate statistics

## Inspiration

> My personal life hack is: add the following line to your crontab: */30 9-17 * * 1-5 say "Stand up and walk around"

http://rubyflow.ru/items/1572

## License

MIT © [ewnd9](http://ewnd9.com)
