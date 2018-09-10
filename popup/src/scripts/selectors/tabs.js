import _ from 'lodash';

export default( tabs, { text }) => {
  const filteredTabs = tabs.filter(({ title }) => title.toLowerCase().includes(text.toLowerCase()));
  const groupedTabs = _(filteredTabs)
    .groupBy(tab => tab.windowId)
    .map((value, key) => ({windowId: parseInt(key, 10), tabs: value}))
    .value();

  const sortedTabs = groupedTabs.map(window => {
    const sortedWindowtabs = window.tabs.sort((tabOne, tabTwo) => tabOne.index > tabTwo.index ? 1 : -1);
    return { ...window, tabs: sortedWindowtabs }
  });
  return sortedTabs;
};