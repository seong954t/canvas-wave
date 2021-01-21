const random255 = () => (Math.floor(Math.random() * 255));

const randomOpacity = () => Math.min(Math.random() + 0.3, 1).toFixed(1);

const randomColor = () => {
    return `rgba(${random255()}, ${random255()}, ${random255()}, ${randomOpacity()})`;
};

export { random255, randomOpacity };
export default randomColor;
