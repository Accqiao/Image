import { useModel } from '@@/plugin-model/useModel';

import NotLogin from '@/pages/Layout/Empty/NotLogin';

export default () => {
  const { initialState } = useModel('@@initialState');

  return <>{initialState.result ? <div>首页推荐</div> : <NotLogin />}</>;
};
