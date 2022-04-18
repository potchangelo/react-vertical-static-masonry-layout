import style from './css/masonry.module.scss';

function _MasonryItem(props) {
  const { children } = props;

  let itemClass = style.item;

  return (
    <div className={itemClass}>
      <div>{children}</div>
    </div>
  );
}

export default _MasonryItem;
