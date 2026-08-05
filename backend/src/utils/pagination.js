const getPagination = (page = 1, limit = 10) => {
  const currentPage = Math.max(Number(page) || 1, 1);
  const perPage = Math.max(Number(limit) || 10, 1);

  return {
    skip: (currentPage - 1) * perPage,
    take: perPage,
    page: currentPage,
    limit: perPage,
  };
};

export default getPagination;
