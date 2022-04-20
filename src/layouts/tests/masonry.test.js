import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Masonry, MasonryItem } from '..';

/**
 * @param {number} width
 */
function resizeWindowWidth(width) {
  // Object.defineProperty(window, 'innerWidth', {
  //   writable: true, configurable: true, value: width
  // });
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

test('No items', () => {
  render(<Masonry />);
  const columns = screen.queryAllByTestId('masonry-column');
  expect(columns.length).toBeFalsy();
  const items = screen.queryAllByTestId('masonry-item');
  expect(items.length).toBeFalsy();
});

test('One item', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
    </Masonry>
  );
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBe(1);
});

test('More than one items', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
      <MasonryItem key="item-2" height={150} />
      <MasonryItem key="item-3" height={200} />
    </Masonry>
  );
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBe(3);
});

test('Items without height', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" />
      <MasonryItem key="item-2" />
      <MasonryItem key="item-3" />
    </Masonry>
  );
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBe(3);
});

test('Wrong children type', () => {
  render(
    <Masonry>
      <span>Not masonry item</span>
    </Masonry>
  );
  const columns = screen.queryAllByTestId('masonry-column');
  expect(columns.length).toBeFalsy();
  const items = screen.queryAllByTestId('masonry-item');
  expect(items.length).toBeFalsy();
});

test('Resizing with default breakpoints', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
      <MasonryItem key="item-2" height={100} />
    </Masonry>
  );

  act(() => {
    resizeWindowWidth(600);
  });
  const columns = screen.getAllByTestId('masonry-column');
  expect(columns.length).toBe(2);
  const items = screen.getAllByTestId('masonry-item');
  expect(items.length).toBeTruthy();

  act(() => {
    resizeWindowWidth(380);
  });
  const columns2 = screen.getAllByTestId('masonry-column');
  expect(columns2.length).toBe(1);
  const items2 = screen.getAllByTestId('masonry-item');
  expect(items2.length).toBeTruthy();
});

// test('Resizing with defined breakpoints', () => {
//   render(
//     <Masonry>
//       <MasonryItem key="item-1" height={100} />
//       <MasonryItem key="item-2" height={100} />
//     </Masonry>
//   );

//   act(() => {
//     resizeWindowWidth(600);
//   });
//   const columns = screen.getAllByTestId('masonry-column');
//   expect(columns.length).toBe(2);
//   const items = screen.getAllByTestId('masonry-item');
//   expect(items.length).toBeTruthy();

//   act(() => {
//     resizeWindowWidth(380);
//   });
//   const columns2 = screen.getAllByTestId('masonry-column');
//   expect(columns2.length).toBe(1);
//   const items2 = screen.getAllByTestId('masonry-item');
//   expect(items2.length).toBeTruthy();
// });
