import instance from './axios'; // 根据实际文件路径修改

const dicList = async (cityId) => {
  try {
      const response = await instance.get('/dict/dicList', {
          params: { cityId }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};
  
  export { dicList };