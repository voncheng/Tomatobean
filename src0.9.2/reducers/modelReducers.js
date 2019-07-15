import modelStore from '../paramsStore/modelStore';
import { STATE_ROLL_BACK } from '../constants/kitTypes';

export default function modelReducers() {
  const reducers = {};
  modelStore().forEach((model) => {
    reducers[model.namespace] = (state = model.state, action) => {
      if (model.reducers[action.type]) {
        return model.reducers[action.type](state, action);
      }
      // 添加一些基础功能
      switch (action.type) {
        // 回滚state
        case STATE_ROLL_BACK:
          if (action.namespace === model.namespace) {
            return model.state;
          }
          break;
        default:
          return state;
      }
    };
  });
  return reducers;
}
