import { useState } from 'react';
import { ItemImage } from '../components';
import { samplePhotos } from '../helpers';
import { Main, Masonry, MasonryItem } from '../layouts';

const breakpoints = [
  { columns: 2, minWidth: 0, gap: 12, outerGap: 16 },
  { columns: 3, minWidth: 500, gap: 16, outerGap: 20 },
  { columns: 4, minWidth: 750, gap: 20, outerGap: [32, 20] },
  { columns: 5, minWidth: 1000, gap: 20, outerGap: [32, 20] },
];

function _ImageShuffle() {
  const [photos, setPhotos] = useState(getShufflePhotos());

  function getShufflePhotos() {
    const arr = [...samplePhotos];
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function shufflePhotos() {
    setPhotos(getShufflePhotos());
  }

  const masonryItems = photos.map(photo => (
    <MasonryItem key={photo.id} height={photo.height}>
      <ItemImage photo={photo} />
    </MasonryItem>
  ));
  return (
    <>
      <Main>
        <Masonry breakpoints={breakpoints}>{masonryItems}</Masonry>
      </Main>
      <button
        className="button is-primary"
        style={{ position: 'fixed', bottom: '12px', right: '12px', zIndex: 10000 }}
        onClick={shufflePhotos}
      >
        <b>Shuffle</b>
      </button>
    </>
  );
}

export default _ImageShuffle;
