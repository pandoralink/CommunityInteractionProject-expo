export interface CommonResult {
  code: number;
  message: string;
  data: unknown;
}

export interface Userinfo {
  user_id: number,
  user_name: string,
  user_account: string,
  user_head: string,
}

export interface UserState {
  token: string,
  user: Userinfo,
}
