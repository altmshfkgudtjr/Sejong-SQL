// types
import type { Environment, MyEnvironment } from 'types/api/environment';

export const isTypeEnvironment = (value: any): value is Environment => {
  return value.owner !== undefined;
};

export const isTypeMyEnvironment = (value: any): value is MyEnvironment => {
  return value.owner === undefined;
};
