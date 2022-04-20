import { useModel } from '@@/plugin-model/useModel';

import NotLogin from '@/pages/Layout/Empty/NotLogin';

export default () => {
  const { initialState } = useModel('@@initialState');

  return (
    <>
      {initialState && initialState.result ? <div>用户关注</div> : <NotLogin />}
    </>
  );
};
