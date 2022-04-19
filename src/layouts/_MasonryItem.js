/**
 * @param {object} props
 * @param {number} props.height
 * @param {import("react").CSSProperties} props.itemStyle
 */
function _MasonryItem(props) {
  const { itemStyle, children } = props;
  return (
    <div style={itemStyle}>
      <div>{children}</div>
    </div>
  );
}

export default _MasonryItem;
