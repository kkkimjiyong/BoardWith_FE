import { useState, useCallback } from "react";

const useInput = (initialState) => {
  //초기 밸류값 설정
  const [initialvalue, Setinitialvalue] = useState(initialState);

  //핸들러로직구현
  const onChangehandler = (e) => {
    const { name, value } = e.target;
    Setinitialvalue({ ...initialvalue, [name]: value });
    console.log(initialvalue);
  };

  return [initialvalue, Setinitialvalue, onChangehandler];
};

export default useInput;
