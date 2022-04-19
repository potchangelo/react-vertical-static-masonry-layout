import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ItemImage, SectionLoadMore } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 640, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 840, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1080, gap: 24, outerGap: [32, 24] },
];

function _ImageAppend() {
  const [photos, setPhotos] = useState(samplePhotos);
  const [isLoading, setIsLoading] = useState(false);

  function loadMore() {
    setPhotos(prevPhotos => {
      const clonedPhotos = samplePhotos.map(p => ({ ...p, id: uuidv4() }));
      return [...prevPhotos, ...clonedPhotos];
    });
    setIsLoading(false);
  }

  function onLoadMoreClick() {
    setIsLoading(true);
    loadMore();
  }

  const masonryItems = photos.map(photo => (
    <MasonryItem key={photo.id} height={photo.height}>
      <ItemImage photo={photo} />
    </MasonryItem>
  ));
  return (
    <Main>
      <Masonry breakpoints={breakpoints}>
        {masonryItems}
      </Masonry>
      <SectionLoadMore isShow={!isLoading} onLoadMoreClick={onLoadMoreClick} />
    </Main>
  );
}

export default _ImageAppend;
