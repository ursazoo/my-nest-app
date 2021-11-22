export interface ITag {
  label: string;
  value: number;
  status: ETagStatus;
  bindArticles: number;
}

export enum ETagStatus {
  '禁用中',
  '启用中',
}
