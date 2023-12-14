import instance from './axios'; // 根据实际文件路径修改

const selectAll = async (type) => {
    try {
      const response = await instance.get('/ghDayInfo/selectAll', {
        params: { type }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const detail = async (id) => {
    try {
      const response = await instance.get('/ghDayInfo/detail', {
        params: { id }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const tripAll = async (dayTab) => {
    try {
      const response = await instance.get('/ghTripDetails/selectAll', {
        params: { dayTab }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
 
  //添加
const addDetailsInfo = async (ghTripDetails) => {
  try {
    const response = await instance.post('/ghTripDetails/addDetailsInfo', ghTripDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadFile = async (ghTripDetails) => {
  try {
    const response = await instance.post('/api/upload', ghTripDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};


  export { selectAll, detail, tripAll, addDetailsInfo, uploadFile };