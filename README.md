# Query - tool 
URL:  https://q-tool.netlify.app/

  ## Overview
  Query tool is a lightweight yet powerful tool to run and view query results from your web browser.

 ![Tool screen shot](https://i.imgur.com/khfE1n3.png)

This tool empowers users with productivity-boosting features while maintaining a user-friendly and straightforward interface.
### Features:
  
This tool simplifies productivity with:
1.  Queries run in **different tabs** for quick context switching. 
2.  Automatic recording of query runs in the **history**.
3. **Download JSON/CSV** : incase you need the raw data.
4.  **Saving favourite queries** for quick access on a new tab or sidebar.
5.  **Locally saved history** and saved items, we wont forget your saved items.
6. **Keyboard shortcuts** for increased speed; 


| Key | Action  |
|--|--|
|Control + F  | Find |
|Tab + Right/Left Arrow  | Switch tabs |

### Framework and packages used
React with 
1. Antd: component library.
2. Redux and redux toolkit: State management. 
3. use-keyboard-shortcut: lightweight hook for capturing keyboard shortcuts.
4. node-sass: to compile scss
5. Webpack bundle analyser : to analyse bundle size.

### Performance and optimizations:
**Page load time**:  0.9s , measured using [uptrends speed test](https://www.uptrends.com/tools/website-speed-test) after deployment.

#### Optimisations: 
1. Used Webpack bundle analyzer to analyze webpack bundle size. And made sure that no unused code is present of the bundle
	![Bundle snapshot](https://i.imgur.com/V4XHa73.png)
2. Memoised large calculations using useMemo and reselect.
