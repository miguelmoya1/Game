class _Image {
  public async loadImage(url: string) {
    const imageElement = document.createElement('img') as HTMLImageElement;
    imageElement.src = url;
    return new Promise<HTMLImageElement>((re, r) => imageElement.onload = () => re(imageElement));
  }
}

export const Image = new _Image();