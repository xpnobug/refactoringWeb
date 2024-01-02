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


  //查单个规划
const ghTripDetail = async (id) => {
  try {
    const response = await instance.get('/ghTripDetails/detail', {
      params: { id }
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
//修改
const updDetailsInfo = async (ghTripDetails) => {
  try {
    const response = await instance.post('/ghTripDetails/updDetailsInfo', ghTripDetails);
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
const delDetailsInfo = async (infoId) => {
  try {
    const response = await instance.get('/ghTripDetails/delDetailsInfo', {
      params: { infoId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOne = async (detailId,dayTab) => {
  try {
    const response = await instance.get('/ghTripDetails/getOne', {
      params: { detailId,dayTab }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

  export { selectAll, detail, tripAll, addDetailsInfo, uploadFile, ghTripDetail, updDetailsInfo, delDetailsInfo, getOne};