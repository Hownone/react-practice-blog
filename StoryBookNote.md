# StoryBook

## 准备工作

[官方文档](https://storybook.js.org/docs/react/get-started/install/)

[中文博客](https://www.bookstack.cn/read/learnstorybook-react-zh/6da1274cb7d081bc.md)

### 安装环境

我们现在将整个`React`抽象成一个组件，而不是一个应用程序，所以`creat-react-app filename`后，我们可以将与应用程序有关的东西全部删掉，使得组件更加轻量。

`React`应用程序的脚本命令存在于`dependencies`中的`react-scripts`

![storybook2.png](https://cdn.acwing.com/media/article/image/2023/04/13/118375_7bbb317bda-storybook2.png)

我们把这个删掉，让整个`React`彻底组件化，失去应用程序的功能。

接着我们再删掉`public`文件夹，因为这个文件夹也是与应用程序有关的，在组件化里没啥用

这样应用程序有关的命令就不起作用了。可以愉快地进行下面的步骤了~~

`npm uninstall --save react-scripts`

* Use the Storybook CLI to install it in a single command. Run this inside your *existing project’s* root directory:

  `npx storybook@latest init`

  或者 `npx sb init`

* 运行`storybook`:

  `npm run storybook`

* 安装`prop-types`:

  `npm install --save prop-types`

* 安装`storybook css modules`

  `npm install --save-dev storybook-css-modules-preset`(这个写法好像已经被弃用了？)

  或 `npm install -D storybook-css-modules`

  这允许我们在我们的`storybook`项目中使用`css`模块

* `npm install --save @storybook/addon-postcss`

  安装这个插件不会收到css弃用警告

* 修改脚本命令：

  常规情况下，我们使用官方推荐的`npm run storybook`命令来运行`storybook`，这个语句有点长，我们可以在`package.json`里面修改一下他的执行命令，使得通过`npm start`就可以打开`storybook`.

  > 这里的`react`概念已经不再是一个APP了，而是将它组件化，因此不需要用`npm start`打开一个APP网址了，我们将这个命令重新改写成打开`storybook`

  原本的脚本命令如下：

  ![storybook1.png](https://cdn.acwing.com/media/article/image/2023/04/13/118375_57dbc4fbda-storybook1.png) 

  改成后如下：

  ```js
    "scripts": {
      "start": "storybook dev -p 6006",
      "build": "react-scripts build"
    },
  ```

  然后就可以愉快地用`npm start`启动`storybook`了

### 简单Demo

当我们启动`storybook`的时候，系统会自动帮我们在`/src`文件夹下新生成了一个`stories`文件夹，里面存放着几个写好的组件以及样式，以`Button.stories.js`为例：

```js
import { Button } from './Button'; // 引入写好的Button组件

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'Example/Button', //层次结构
  component: Button,  //react组件
  tags: ['autodocs'],
  argTypes: { //我们指定参数类型的地方
    backgroundColor: { control: 'color' },//通过control控件属性来告诉storybook这里是选择颜色的，用户就不需要输入十六进制或者rba来表示颜色了。
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = { //这些都是Button这个组件下的样式
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary = { //这些都是Button这个组件下的样式
  args: {
    label: 'Button',
  },
};

export const Large = {//这些都是Button这个组件下的样式
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small = {//这些都是Button这个组件下的样式
  args: {
    size: 'small',
    label: 'Button',
  },
};

```

对应的`storybook`页面显示如下:

![storybook3.png](https://cdn.acwing.com/media/article/image/2023/04/14/118375_62c5bd69da-storybook3.png) 

### `prop-types`

使用`prop-types`来指定允许传递给这个特定组建的属性

`Botton.jsx`

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

```

`Button`函数组件中的`porps`参数，分别对应`sotrybook`组件页面下的各种参数，

如图所示(以`Primary`为例)：

```js
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
    
}
```



![storybook4.png](https://cdn.acwing.com/media/article/image/2023/04/14/118375_6d9c189bda-storybook4.png) 

而我们可以在不同组件的对应的参数下，分别用`args`添加新的属性：

还是以``Primary`为例

`Button.stories.js`

```js
export const Primary = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```

`Primary`的`args`属性中新添加了个`label`参数,对应的上图中就是那个带`*`号的`label`属性。

接着，我们看到这个`Button`的`size` 是通过一个单选按钮来选择对应的规格的，这个样式也是可以修改的，需要在`Button.stories.js`中的`argTypes`中像`backgroundColor`一样加上一个`controls`属性来修改他的样式,这里我们修改成`select`：

```js
export default {
 ...
  argTypes: { //我们指定参数类型的地方
    backgroundColor: { control: 'color' },
    size: {control: 'select'}
  },
};
```

更多`controls`属性样式可参考官方文档：[storybook controls](https://storybook.js.org/docs/react/essentials/controls)

这里可以定义组件的默认样式：

```jsx
Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: 'medium',
  onClick: undefined,
};

```

## 尝试创建自己的组件

上面说的都是安装好`storybook`的时候官方自动帮我们初始化好的文件，我们可以尝试自己写一个`story`文件。

### 添加依赖

为了自己创建组件，我们需要添加准备工作时安装的`addon-postcss`依赖，保证我们在自己写`css`文件的时候不会抛出弃用报错。还要添加`story-css-modules`。

在`addons:[]`中添加：

`.storybook/main.js`

```js
/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss", //添加
    "story-css-modules", // 添加
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;

```

### 编写组件

使用`useEffect`来处理一些关于`porps`错误处理的逻辑

```js
    useEffect(() => { //props传入错误参数情况下的处理逻辑
        if (headers.length < 1) {
            throw Error('Must have at least one header');
        } else if (!rows.every(r => r.length === headers.length)) { //flexbox将行视为列
            throw Error('Row length must equal header length');
        }
    }, [rows, headers]);
```

由于前面添加了`story-css-modules`依赖，因此我们可以直接通过`.类名`的方式，模块化地调用css中的样式：

`CSS`文件如下：

```css
.main {
    display: flex;
    font-family: sans-serif;
}

.column {
    display: flex;
    flex-direction: column;
    width: 150px;
}
.cell,
.header {
    margin: 2px;
}

.header {
    font-size: 22px;
    font-weight: bold;
}

```

在组件中的调用方法：

```js
    ...
    const cellPaddingMap = {
        small: '3px',
        medium: '8px',
        large: '15px',
    };
    const borderWidthMap = {
        thin: '1px',
        medium: '2px',
        thick: '3px',
    };

    return (
        <div className={styles.main}> 
            {headers.map((h, columnIndex) => (
                <div key={columnIndex} className={styles.column}>
                    <div
                        className={styles.header}
                        style={{
                            color: headerTextColor,
                            padding: cellPaddingMap[cellPadding],
                            backgroundColor: headerBackgroundColor,
                            border: `${borderWidthMap[borderWidth]} solid ${headerBorderColor}`,
                        }}
                    >
                        {h}
                    </div>

                    <div className={styles.rows}>
                        {rows.map((r, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={styles.cell}
                                style={{
                                    color: cellTextColor,
                                    backgroundColor: backgroundColor,
                                    padding: cellPaddingMap[cellPadding],
                                    border: `${borderWidthMap[borderWidth]} solid ${cellBorderColor}`,
                                }}
                            >
                                {r[columnIndex]}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
    ...
```

`stories/组件名.stories.js`:

给组件传入对应的`props`属性

```js
export default {
    title: 'UI/table',
    component: 组件名,
}

export const Default = {
    args: {
        rows: [
            ['This', 'is', 'just', 'a', 'test'],
            ['This', 'is', 'also', 'a', 'test'],
            ['Just', 'a', 'little', 'more', 'data'],
            ['Row', 'number', 'four', 'right', 'here'],
        ],
        headers: ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5'],
    },
};
```

给组件的属性规定一个`prop-types`:

```js
组件名.propTypes = {
    cellTextColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    cellBorderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    headerBorderColor: PropTypes.string,
    headerBackgroundColor: PropTypes.string,
    borderWidth: PropTypes.oneOf(['thin', 'medium', 'thick']),
    cellPadding: PropTypes.oneOf(['small', 'medium', 'large']),
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};
```

这样就实现了一个自己的`storybook`组件`Demo`了：

![storybook5.png](https://cdn.acwing.com/media/article/image/2023/04/14/118375_fb48f5afda-storybook5.png) 

