export const BasicPagination = {
  args: {
    currentPage: 3,
    totalPages: 10,
    onPageChange: (pageNumber) => console.log(`페이지 이동 ${pageNumber}`),
  },
}
