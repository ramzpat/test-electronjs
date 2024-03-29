# test-electronjs

# Plan
- [ ] Check D3 for visualization 
- [ ] Check how to run CPP library 
https://github.com/akab/electron-cpp


## Note: for .devcontainer

MacOS needs `https://www.xquartz.org` to be installed to call 
`xhost +localhost`

This step is needed for running GUI application from the container.


# Visual Graph
https://github.com/anvaka/VivaGraphJS

## D3
D3.js: D3.js is a powerful library for creating data visualizations with a lot of flexibility. It has a steep learning curve but allows for highly customized visualizations.

```
// Include D3.js in your HTML file
<script src="https://d3js.org/d3.v5.min.js"></script>
```

vis.js
vis.js is a dynamic, browser-based visualization library. The library is designed to be easy to use, handle large amounts of dynamic data, and enable manipulation of the data.

```js
// Include vis.js in your HTML file
<script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
```

cytoscape.js: Cytoscape.js is a fully featured graph library. It allows for the analysis and visualisation of complex networks.
```js
// Include cytoscape.js in your HTML file
<script src="https://unpkg.com/cytoscape/dist/cytoscape.min.js"></script>
```

sigma.js: Sigma is a JavaScript library dedicated to graph drawing. It makes easy to publish networks on Web pages and allows developers to integrate network exploration in rich Web applications.
```js
// Include sigma.js in your HTML file
<script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/1.2.1/sigma.min.js"></script>
```


D3.js - BSD-3-Clause: Can be used commercially. Conditions include the preservation of the copyright notice and disclaimer.

vis.js - Apache-2.0: Can be used commercially. Conditions include the preservation of the copyright notice and disclaimer, and a copy of the license must be provided.

cytoscape.js - LGPL-3.0: Can be used commercially, but any modifications to the library itself must be open-sourced under the same license.

sigma.js - MIT: Can be used commercially. Conditions include the preservation of the copyright notice and disclaimer.