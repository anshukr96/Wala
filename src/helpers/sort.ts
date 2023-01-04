export const sortbyCreateDate = (data: any, type = 'asc') => {
  const sortedData = data?.sort((a: any, b: any) => {
    return type === 'asc'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return sortedData;
};
