**引入**

```html
  <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

**react17及以前**
```js
  import ReactDOM from 'react-dom';

  ReactDOM.render(app_JSX, root_Node);
  ReactDOM.unmountComponentAtNode(root);
```

**react18新特性之Render API**

```react18``` 之后 ```render API``` 有了新的调整，引入了一个新的 ```root API``` 支持 ```new concurrent renderer```（并发模式的渲染），并允许进入```concurrent mode```（并发模式）。

```js
  import ReactDOM from 'react-dom';
  // import { createRoot } from 'react-dom/client';  

  ReactDOM.createRoot(root_Node).render(<App />);
  root.unmount();
```

**SSR**

如果项目使用了ssr服务端渲染，需要把hydration升级为hydrateRoot：

```js
// React 17
ReactDOM.hydrate(<App />, root_Node);

// React 18
ReactDOM.hydrateRoot(root_Node, <App />);
```