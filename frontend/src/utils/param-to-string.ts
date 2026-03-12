import { ParamValue } from 'next/dist/server/request/params';

export const paramToString = (param: ParamValue): string => {
  if (Array.isArray(param)) {
    return param[0];
  }
  return param ?? '';
};
