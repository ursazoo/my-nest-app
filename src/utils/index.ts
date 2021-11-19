/**
 * 计算分页
 * @param total
 * @param pageSize
 * @param pageNo
 * @returns
 */
export const getPagination = (
  total: number,
  pageSize: number,
  pageNo: number,
) => {
  const pages = Math.ceil(total / pageSize);
  return {
    total,
    pageNo,
    pageSize,
    pages,
  };
};
