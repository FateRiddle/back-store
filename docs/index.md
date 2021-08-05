---
hero:
  title: back-store
  desc: Minimalist state management library based on React.js hooks
  actions:
    - text: Getting Started
      link: /guide
features:
  - icon: https://img.alicdn.com/imgextra/i4/O1CN010nDUFs1H7Dtj1okfR_!!6000000000710-2-tps-200-200.png
    title: Progressive Adoption
    desc: a few lines of code & it's set for any React project, co-exist with any state management libraries
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01JHEpmi1Zm8MTrZEDy_!!6000000003236-2-tps-200-200.png
    title: Minimalist Api
    desc: Zero boilerplate code, intuitive usage just like using native `setState`, but works for global states
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01C2CfOF1DsA1cGt0Vt_!!6000000000271-2-tps-200-200.png
    title: Extremely Reusable
    desc: reusing components powered by back-store in another project without deep refactoring
  - icon: https://img.alicdn.com/imgextra/i3/O1CN01kAaj9a1qV33PO0sXX_!!6000000005500-2-tps-200-200.png
    title: Async, No Problem
    desc: No react-saga/react-thunk etc., zero refactoring needed for async code
  - icon: https://img.alicdn.com/imgextra/i4/O1CN01jwPtbC1qg2YnOWkmB_!!6000000005524-2-tps-200-200.png
    title: Visual Development Tools
    desc: with `debug=true` props, a visual display of states on the fly
  - icon: https://img.alicdn.com/imgextra/i2/O1CN01r67qJr1uKkc0aZHSs_!!6000000006019-2-tps-200-200.png
    title: TypeScript Support
    desc: not a big fan of TypeScript, we support it nevertheless
---

```jsx
/**
 * transform: true
 * defaultShowCode: true
 */
import React from 'react';
import { Button } from 'antd';
import FormRender, { useForm } from 'form-render';
import logger from '@ali/fr-logger';

const schema = {
  displayType: 'row',
  labelWidth: 60,
  type: 'object',
  properties: {
    dateRange: {
      bind: ['startDate', 'endDate'],
      title: '日期',
      type: 'range',
      format: 'date',
    },
    siteUrl: {
      title: '网址',
      type: 'string',
      placeholder: '此处必填',
      required: true,
      props: {
        addonBefore: 'https://',
        addonAfter: '.com',
      },
    },
  },
};

const Demo = () => {
  const form = useForm(logger);
  const onFinish = (formData, errors) => {
    if (errors.length > 0) {
      alert('errors:' + JSON.stringify(errors));
    } else {
      alert('formData:' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div>
      <FormRender form={form} schema={schema} onFinish={onFinish} />
      <Button type="primary" onClick={form.submit}>
        提交
      </Button>
    </div>
  );
};

export default Demo;
```
