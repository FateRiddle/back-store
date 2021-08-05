# FR Logger

开箱即用的 FormRender 表单埋点配套方案

## 前提

使用 form-render 1.x 的项目

## 使用

```js
import FormRender, { useForm } from 'form-render'
import logger from '@ali/fr-logger'

const Demo = () => {
  const form = useForm(logger)
  return <FormRender
    id="my-test-form1" // 表单唯一标识，会作为埋点信息之一
    form={form}
    schema={{ ... }}
    onFinish={(data, errors) => { ... }}
  />
}
```

简单的说，在正常的使用 form-render 1.x 的同时，唯一的改动是将 logger 注入到 useForm 里。
