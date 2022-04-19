import React from 'react';
import style from './css/masonry.module.scss';

/**
 * @typedef {object} breakpoint
 * @property {number} columns
 * @property {number} minWidth
 * @property {number} [gap]
 * @property {number|number[]} [outerGap]
 */

const defaultBreakpoints = [
  { columns: 1, minWidth: 0, gap: 0 },
  { columns: 2, minWidth: 600, gap: 24 },
  { columns: 3, minWidth: 960, gap: 24 },
];

/**
 * Masonry layout by grid, might have scroll restoration
 * @param {object} props
 * @param {breakpoint[]} props.breakpoints
 * @param {import('react').ReactElement[]} props.children
 */
function _Masonry(props) {
  // - Data
  const { breakpoints = defaultBreakpoints, children } = props;

  // - Functions
  function getNextBreakpoint() {
    let nextBreakpoint = breakpoints[0];

    // Get width
    if (typeof window === 'undefined') return nextBreakpoint;
    const docWidth = window.innerWidth;

    // Get columns
    breakpoints.forEach(breakpoint => {
      if (docWidth < breakpoint.minWidth) return;
      nextBreakpoint = breakpoint;
    });
    return nextBreakpoint;
  }

  // - Attributes
  const { columns, gap = 0, outerGap = 0 } = getNextBreakpoint();
  const containerStyle = {
    padding: Array.isArray(outerGap) ? outerGap.map(g => `${g}px`).join(' ') : `${outerGap}px`
  }
  const layoutStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    columnGap: `${gap}px`,
  };
  const itemStyle = {
    marginBottom: `${gap}px`
  };

  // - Elements
  const columnsChildren = new Array(columns).fill().map(_ => []);
  const columnsHeights = new Array(columns).fill().map(_ => 0);
  children.forEach(child => {
    const minHeightIndex = columnsHeights.indexOf(Math.min(...columnsHeights));
    columnsChildren[minHeightIndex].push(child);
    columnsHeights[minHeightIndex] += child.props.height ?? 0;
  });

  let childElements = null;
  if (!!children) {
    childElements = columnsChildren.map((columnChildren, index) => {
      const columnElements = columnChildren.map(child => {
        return React.cloneElement(child, {
          itemStyle
        });
      });
      return (
        <div key={`col-${index}`}>
          {columnElements}
        </div>
      );
    });
  }

  return (
    <div style={containerStyle}>
      <div className={style.layout} style={layoutStyle}>
        {childElements}
      </div>
    </div>
  );
}

export default _Masonry;
