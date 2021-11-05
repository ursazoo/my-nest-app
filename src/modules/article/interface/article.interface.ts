export interface IArticle {
  id?: number; // id
  title: string; // 标题
  description: string; // 描述
  content: string; // content
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
  isDelete?: boolean; // 是否删除
}
