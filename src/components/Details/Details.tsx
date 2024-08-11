'use client';
import styles from './Details.module.css';
import { IPeople } from './../../interfaces/interfaces.ts';
import images from './../../data/images';
import Image, { StaticImageData } from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Details({ info }: { info: IPeople }) {
  const { push } = useRouter();

  const search = useSearchParams();
  const searchQuery = search.get('search') ? search.get('search') : null;
  const pageQuery = search.get('page') ? search.get('page') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');

  function hideInfo() {
    push(`?search=${encodedSearchQuery}&page=${Number(pageQuery)}`);
  }

  const findImage = (id: string) => {
    const image = images.find((image) => image.id === id);
    if (image) {
      return image.src;
    }
  };
  let image: StaticImageData | undefined;

  if (info !== undefined) {
    image = findImage(info.name);
  }

  return (
    <div className={`${styles.info}`} data-testid="info" onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.name}>{info !== undefined ? info.name : ''}</h2>
      {info !== undefined ? (
        <Image
          src={image !== undefined ? image.src : ''}
          className={styles.img}
          width={190}
          height={160}
          alt={info.name}
        />
      ) : (
        ''
      )}
      <div className={`${styles.gender} ${styles.field}`}>gender: {info !== undefined ? info.gender : ''}</div>
      <div className={`${styles.birthYear} ${styles.field}`}>
        birth year: {info !== undefined ? info.birth_year : ''}
      </div>
      <div className={`${styles.height} ${styles.field}`}>height: {info !== undefined ? info.height : ''}</div>
      <div className={`${styles.mass} ${styles.field}`}>mass: {info !== undefined ? info.mass : ''}</div>
      <div className={`${styles.hairColor} ${styles.field}`}>
        hair color: {info !== undefined ? info.hair_color : ''}
      </div>
      <div className={`${styles.skinColor} ${styles.field}`}>
        skin color: {info !== undefined ? info.skin_color : ''}
      </div>
      <div className={`${styles.eyeColor} ${styles.field}`}>eye color: {info !== undefined ? info.eye_color : ''}</div>
      <button className={`${styles.buttonClose}`} onClick={hideInfo}>
        Close
      </button>
    </div>
  );
}
