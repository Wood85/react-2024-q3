import images from './../data/images';

describe('images', () => {
  it('should contain the correct number of images', () => {
    expect(images).toHaveLength(83);
  });

  it('each object should have an id and src property', () => {
    images.forEach((image) => {
      expect(image).toHaveProperty('id');
      expect(image).toHaveProperty('src');
      expect(typeof image.id).toBe('string');
      expect(typeof image.src).toBe('string');
    });
  });
});
