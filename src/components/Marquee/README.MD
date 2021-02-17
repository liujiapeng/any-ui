
## 思路

```keywords``` :  ```padding``` | ```translate```

以水平滚动为例

首先需要初始化滚动元素的位置，让其处在基于父元素的最右端
```css
.content{
  /*用padding和margin都可以，都是基于父元素的宽度*/
  padding-left: 100%
}
```

keyframes: 从初始位置一直到把自己滚完即可
```js
const wrapWidth = wrapRef.current.clientWidth;
const rules = ` @keyframes horizontal-move{
  0% {
    transform: translateX(${wrapWidth}px);
  }
  100% {
    transform: translate(calc(-100%));
  }`;
```


