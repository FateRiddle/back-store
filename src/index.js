import qs from 'qs';

export const getBucUserId = () => {
  if (typeof document === undefined) {
    return '';
  }
  const { cookie } = document;
  // try to get emplId from cookie
  const emplId = (/emplid=([^;]+)/i.exec(cookie) || [])[1];
  // try to get workNo from cookie
  const workNo = (/work_?no=([^;]+)/i.exec(cookie) || [])[1];
  // try to get SSO_EMPID_HASH from cookie
  const hashId = (/SSO_EMPID_HASH=([^;]+)/.exec(cookie) ||
    /SSO_EMPID_HASH_V2=([^;]+)/.exec(cookie) ||
    [])[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return emplId || workNo || hashId || '';
};

export const getNick = () => {
  const cookie = document.cookie;
  const nk = (/_nk_=([^;]+)/i.exec(cookie) || [])[1];
  const trackNick = (/tracknick=([^;]+)/i.exec(cookie) || [])[1];
  const nick = nk || trackNick || '';
  return eval("'" + unescape(nick.replace(/\\u/g, '%u')) + "'");
};

export const getTaobaoId = () => {
  try {
    const params = document
      .getElementById('tb-beacon-aplus')
      .getAttribute('exparams');
    const obj = qs.parse(params);
    return obj.userid || '';
  } catch (error) {
    return '';
  }
};

const onSubmit = info => {
  const userId = getTaobaoId();
  const bucUserId = getBucUserId();
  const userNick = getNick();

  const result = {
    ...info,
    userId,
    bucUserId,
    userNick,
  };

  window.goldlog &&
    window.goldlog.record(
      '/x-render.form-render.submit',
      'OTHER',
      qs.stringify(result),
      'POST',
    );
};

const onMount = info => {
  const userId = getTaobaoId();
  const bucUserId = getBucUserId();
  const userNick = getNick();

  const result = {
    ...info,
    userId,
    bucUserId,
    userNick,
  };

  window.goldlog &&
    window.goldlog.record(
      '/x-render.form-render.mount',
      'OTHER',
      qs.stringify(result),
      'POST',
    );
};

export default {
  logOnMount: onMount,
  logOnSubmit: onSubmit,
};
