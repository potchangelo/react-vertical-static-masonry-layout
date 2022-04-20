import { render, screen } from "@testing-library/react";
import { Masonry, MasonryItem } from "..";

test('No items', () => {
  render(<Masonry />);
  const columns = screen.queryAllByTestId('ms-column');
  expect(columns.length).toBeFalsy();
  const items = screen.queryAllByTestId('ms-item');
  expect(items.length).toBeFalsy();
});

test('Has items', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" height={100} />
      <MasonryItem key="item-2" height={150} />
      <MasonryItem key="item-3" height={200} />
    </Masonry>
  );
  const columns = screen.getAllByTestId('ms-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('ms-item');
  expect(items.length).toBe(3);
});

test('Has items without height', () => {
  render(
    <Masonry>
      <MasonryItem key="item-1" />
      <MasonryItem key="item-2" />
      <MasonryItem key="item-3" />
    </Masonry>
  );
  const columns = screen.getAllByTestId('ms-column');
  expect(columns.length).toBeGreaterThanOrEqual(1);
  const items = screen.getAllByTestId('ms-item');
  expect(items.length).toBe(3);
});
