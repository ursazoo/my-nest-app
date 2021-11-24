export interface ITag {
  label: string;
  value: number;
  status: ETagStatus;
  bindArticles: number;
}

export enum ETagStatus {
  '全部',
  '启用中',
  '禁用中',
}
