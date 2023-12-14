import instance from './axios'; // 根据实际文件路径修改

const selectAll = async (type) => {
    try {
      const response = await instance.get('/voyageguide/city/selectAll', {
        params: { type }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
const listByParentId = async (parentId) => {
  try {
      const response = await instance.get('/voyageguide/city/listByParentId', {
          params: { parentId }
      });
      return response.data;
  } catch (error) {
      throw error;
  }
};

const listByNearCity = async (parentId) => {
    try {
        const response = await instance.get('/voyageguide/city/listByNearCity', {
            params: { parentId }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
  };
  export { selectAll, listByParentId, listByNearCity };