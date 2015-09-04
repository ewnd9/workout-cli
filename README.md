# workout-cli

Remind you to distract from laptop from time to time

:warning: You need to `$ workout --restart` after reboot anyway due to strange
bug with invisible notifications  

## Install

```
$ npm install -g workout-cli
```

## Usage

```
workout --setup

# app lifecycle
workout --start
workout --stop
workout --restart
workout --status

# start completing scheduled session
workout --session

# skip scheduled session with given excuse
workout --excuse <excuse>
```

## Inspiration

> My personal life hack is: add the following line to your crontab: */30 9-17 * * 1-5 say "Stand up and walk around"

http://rubyflow.ru/items/1572

## License

MIT © [ewnd9](http://ewnd9.com)
