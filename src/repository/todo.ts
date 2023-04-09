import BaseAxios from '@/utils/common/axios';

const service = BaseAxios('https://jsonplaceholder.typicode.com/', false);

export const getTodos = async (id: string | number): Promise<any> => {
  if (typeof id === 'undefined' || id === null || id === '')
    return await Promise.resolve(null);
  return await service.get(`/todos/${id}`);
};
