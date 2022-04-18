import React, { useState, useCallback } from 'react';
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
 */
function _Masonry(props) {
  // - Data
  const { breakpoints = defaultBreakpoints, children } = props;
  const [columnsHeights, setColumnsHeights] = useState([]);

  // - Functions
  const getNextBreakpoint = useCallback(() => {
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
  }, [breakpoints]);

  // - Attributes
  const columnCount = columnsHeights.length;
  const { gap = 0, outerGap = 0 } = getNextBreakpoint();
  const containerStyle = {
    padding: Array.isArray(outerGap) ? outerGap.map(g => `${g}px`).join(' ') : `${outerGap}px`
  }
  const layoutHeight = columnCount === 0 ? 0 : Math.max(...columnsHeights);
  const layoutStyle = {
    height: `${layoutHeight}px`,
    marginTop: `-${gap / 2}px`,
    marginLeft: `-${gap / 2}px`,
    marginRight: `-${gap / 2}px`,
  };

  // - Elements
  let childElements = null;
  if (!!children) {
    childElements = React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        key: `masonry_item_${index}`
      });
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
