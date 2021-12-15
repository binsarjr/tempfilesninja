# API Tempfiles.ninja

## Instalation 
using npm
```
npm i @binsarjr/tempfilesninja
```

using yarn
```
yarn add @binsarjr/tempfilesninja
```

## Example

```ts
import fs from 'fs'
import Tempninja from '@binsarjr/tempfilesninja'

// Upload file
Tempninja.upload(fs.readFileSync('path/to/file'), 'custom filename').then(async (resp) => {
    console.log(resp)
    console.log(Tempninja.view(resp.id, resp.password))
    console.log(await Tempninja.metadata(resp.id, resp.password))
    console.log(await Tempninja.remove(resp.id, resp.delete_password))
})

```