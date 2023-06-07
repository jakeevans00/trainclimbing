## WebSocket Service Notes

Because a client server architecture is too slow for peer-to-peer communication, we needed a more elegant way to connect devices. (Instead of having the client constant ping the server or keeping connections open for a long time). Thus emerged Websocket.

1. Connection is initiated from client
2. Connection is upgraded to websocket connection
3. Fully duplexed connection enables peer-to-peer connection (no longer between server)

