## Web configuration

All configurations refer to a variables places into `.env` in the root of the project.

### Application context (http://[IP]:[PORT]/[APPLICATION_CONTEXT])

Setup `WEBUPJS_APP_CONTEXT` to change the application context. Set the value without the final `/`. (Default is `/webup.js`)

```properties
WEBUPJS_APP_CONTEXT=[NAME_OF_CUSTOM_APPLICATION_CONTEXT]
```

Setup `PORT` to change the Next.js port listened. (Default is 3000)

```
PORT=[PORT_LISTENED_BY_NEXT_JS_SERVER]
```

Setup `WEBUPJS_HTTPS_REJECT_UNAUTHORIZED` to set policy when backend, server certificate is not valid.

```
WEBUPJS_HTTPS_REJECT_UNAUTHORIZED=false
```

Setup `WEBUPJS_PING_SECONDS_INTERVAL` to set ping to backend interval (measured in seconds). (Default is 60)

```
WEBUPJS_PING_SECONDS_INTERVAL=60
```

Setup `WEBUPJS_AXIOS_REQUEST_TIMEOUT` to set backend request timeout (measured in seconds). (Default is 60)

```
WEBUPJS_AXIOS_REQUEST_TIMEOUT=60
```

Setup `WEBUPJS_CONFIG_URL` to set url to configuration json file.

```
WEBUPJS_CONFIG_URL=
```

If not set, will be used a default json configuration file path:

```
file:/<user.home>/etc/[WEBUPJS_APP_CONTEXT]/config.json
```

If file not exists, it will be created with this payload:

```
{"backendUrl":"https://webuptest.smeup.com/openproxy","password64":"UGFzc3cwcmQ="}
```

`password64` is the password encoded in base64 used by API for the configuration reading and updating.
