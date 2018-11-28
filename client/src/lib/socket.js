const parseJSON = str => {
  let parsed = null
  try {
    parsed = JSON.parse(str)
  } catch (e) {
    return null
  }
  return parsed
}

export default (function socketHelper() {
  let _store = null
  let _socket = null
  let _uri = null

  const listener = message => {
    const data = parseJSON(message.data)
    if (!data || !data.type) return
    _store.dispatch(data)
  }

  const connect = uri => {
    _uri = uri
    _socket = new WebSocket(uri)

    _socket.onmessage = listener
    _socket.onopen = event => {
      console.log(`connecting to ${uri}`)
    }

    _socket.onclose = reconnect
  }

  const reconnect = () => {
    console.log('reconnecting...')
    setTimeout(() => connect(_uri), 30000);
  }

  return {
    initialize: (store, uri) => {
      _store = store
      connect(uri)
    }
  }
})()