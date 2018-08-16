// import * as actions from '../../../popup/src/scripts/actions/bookmarks';
import * as promises from '../chrome-services/bookmarks';
import { clearSelection } from '../../../popup/src/scripts/actions/checkedTabs';

const createBookmarkAlias = (originalAction) => {
  return (dispatch) => {
    return promises.createBookmarkPromise(originalAction.title, originalAction.url)
      .then((bookmarkNode) => dispatch(clearSelection())
    );
  };
};

export default {
  'CREATE_BOOKMARK_REQUEST': createBookmarkAlias,
};