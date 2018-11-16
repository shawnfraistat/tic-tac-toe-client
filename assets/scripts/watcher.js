// watcher.js

'use strict'

// resourceWatcher() is a constructor function for a resourceWatcher class that
// will enable multiplayer to work; it is borrowed from code provided by
// General Assembly
const resourceWatcher = function (url, conf) {
  let token = function (conf) {
    return conf && (conf = conf.Authorization) &&
      (conf = typeof conf === 'string' &&
        conf.split('=')) &&
      Array.isArray(conf) && conf[1]
  }

  url += '?token=' + token(conf)
  url += conf.timeout ? '&timeout=' + conf.timeout : ''
  let es = new EventSource(url) //jshint ignore: line
  let close = function () {
    console.log('closing gameWatcher')
    es.close()
  }

  const makeHandler = function (handler, close) {
    return function (e) {
      if (close) {
        close()
      }

      return handler(e.data ? JSON.parse(e.data) : e)
    }
  }

  const on = function (event, handler) {
    switch (event) {
      case 'connect':
        es.onopen = makeHandler(handler)
        break
      case 'change':
        es.onmessage = makeHandler(handler)
        break
      case 'error':
        es.onerror = makeHandler(handler, close)
        break
      default:
        console.error('Unknown event type:' + event)
        break
    }
  }
  return {
    close: close,
    on: on
  }
}

module.exports = {
  resourceWatcher
}
