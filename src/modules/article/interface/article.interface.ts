export interface IArticle {
  id?: number; // id
  title: string; // 标题
  description: string; // 描述
  content: string; // content
  createTime?: string; // 创建时间
  updateTime?: string; // 更新时间
  status: EArticleStatus; // 文章状态
  isPublic: EArticleIsPublic; // 是否公开
  isDelete?: number; // 是否删除
}

export enum EArticleStatus {
  '创作中',
  '已发布',
}

export enum EArticleIsPublic {
  '私密',
  '公开',
}
